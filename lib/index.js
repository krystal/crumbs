import { EventEmitter } from "./components/eventEmitter";
import { editScreen } from "./components/editScreen";
import { cookieBanner } from "./components/cookieBanner";
import { TYPES } from "./constants";

window.dataLayer = window.dataLayer || [];

window.gtag =
  window.gtag ||
  function () {
    dataLayer.push(arguments);
  };

/**
 * Formats an array of types by adding a summary to each type.
 * If a type does not have a summary, it uses the corresponding default consent type summary.
 *
 * @param {Array} types - The array of types to format. Each type should have an `identifier` and optionally a `summary`.
 * @returns {Array} The formatted array of types with summaries.
 */
const activeTypes = (types) =>
  types.reduce(
    (collection, { identifier, ...type }) => [
      ...collection,
      {
        identifier,
        ...TYPES[identifier],
        ...type,
      },
    ],
    []
  );

/**
 * Generates a collection of default types by iterating over the keys of the TYPES object.
 *
 * @returns {Array<Object>} An array of objects, each containing an identifier and the corresponding properties from TYPES.
 */
const defaultTypes = () =>
  Object.keys(TYPES).reduce(
    (collection, key) => [...collection, { identifier: key, ...TYPES[key] }],
    []
  );

const formatVersion = (version) => `v${version}`;

const parseAccepted = (value) => {
  const parts = value.split("|");

  return parts.length === 1 ? [] : parts.slice(1);
};

export { TYPES, defaultTypes, parseAccepted };

export default class Crumbs extends EventEmitter {
  constructor({
    banner,
    callbacks = {},
    days,
    domain,
    editBanner,
    editCookieButton,
    migrations = {},
    name,
    types,
    version = 1,
  }) {
    super();

    // Configurable Options
    this.banner = banner;
    this.days = days;
    this.domain = domain;
    this.editBanner = editBanner;
    this.editCookieButton = editCookieButton;
    this.migrations = migrations;
    this.name = name || "crumbs";
    this.types = types ? activeTypes(types) : defaultTypes();
    this.version = version;

    this.cookie = this.load();
    this.populateAccepted();

    // Broadcast consent state to Google Tag Manager
    this.broadcast();

    callbacks.load && this.on("load", callbacks.load);
    callbacks.save && this.on("save", callbacks.save);

    this.emit("load", this.payload());

    this.render();
  }

  outdated() {
    return this.cookie.version < this.version;
  }

  populateAccepted = () => {
    if (!this.cookie) {
      this.accepted = [];
      return;
    }

    this.accepted = this.outdated()
      ? this.migrate()
      : parseAccepted(this.cookie.value);
  };

  /**
   * Migrates the current cookie to a new version using a user-provided migration function.
   *
   * This function looks up the migration function based on the current cookie version.
   * If a migration function is found, it runs the migration and saves the new cookie
   * without extending its expiry date. If no migration function is found, it clears the cookie.
   *
   * @param {String} value - The value to be migrated.
   */
  migrate() {
    // Look up the user provided migration function
    const migration = this.migrations[this.cookie.version];

    if (!migration) {
      // There is no known migration path for the old cookie value
      // Let's clear it
      this.clear();
    } else {
      // There is a know migration path
      // Run the migration function and return the result
      return migration.call(this.cookie.value);
    }
  }

  payload = () => {
    return this.types.reduce(
      (object, { identifier }) => ({
        ...object,
        [identifier]: this.accepted.includes(identifier),
      }),
      {}
    );
  };

  broadcast(type = "default") {
    window.gtag(
      "consent",
      type,
      this.types.reduce(
        (object, key) => ({
          ...object,
          [key]: this.accepted.includes(key) ? "granted" : "denied",
        }),
        {}
      )
    );
  }

  /**
   * Render the cookie banner and attach various elements
   */
  render() {
    if (!this.cookie) {
      // Render the Cookie banner if the cookie_consent cookie isn't true

      // Create the banner itself as a template literal and add it
      // to the DOM, at the end of the body
      const banner = cookieBanner(this.banner);

      document.body.insertAdjacentHTML("beforeend", banner);

      // As we have created this we can have access to it now for removing later
      this.cookieBanner = document.querySelector(".crumbs-banner");
      this.chooseCookiesButton = document.querySelector(
        ".crumbs-edit-settings"
      );
      this.chooseCookiesButton.focus();
      this.prepareFocusableElements(this.cookieBanner);
      this.bannerTrapFocus = this.trapFocus.bind(this);
      document.addEventListener("keydown", this.bannerTrapFocus);
      // Clicking on accept all sets all the cookies and hides the banner
      const acceptCookies = document.querySelector(".crumbs-accept-all");

      acceptCookies.addEventListener("click", () => {
        this.accepted = this.types.map(({ identifier }) => identifier);
        this.save();
        this.removeBanner(this.cookieBanner);

        document.removeEventListener("keydown", this.bannerTrapFocus);

        this.broadcast("update");

        this.emit("save", this.payload());
      });

      // Select our edit button, assign it to the constructor and pass
      // it to our editSettings method
      this.editSettingsButton = document.querySelector(".crumbs-edit-settings");
      this.editSettings(this.editSettingsButton);
    }

    // This sets up the editScreen component and adds it to memory for later use
    const editElement = editScreen(this.editBanner);
    const fragment = document
      .createRange()
      .createContextualFragment(editElement);
    const elementToAdd = fragment.firstElementChild;
    this.editScreen = elementToAdd;

    // Add the relevant preferences that have been specified by the types Array

    this.editCookieButton.addEventListener("click", () => {
      this.addPreferences();
      document.body.insertAdjacentElement("beforeend", this.editScreen);
      this.editScreen.focus();
      this.editAccept();
      this.closeEditScreen();
      this.prepareFocusableElements(this.editScreen);
      this.disableScroll();
      this.setCloseOnEscape();
      this.setCloseOutside();
      document.addEventListener("keydown", this.trapFocus);
    });
  }

  /**
   * Add the editScreen component when the 'Edit Settings' button is clicked
   */
  editSettings(editHandler) {
    // Add the edit cookies modal to the DOM when selected
    editHandler.addEventListener("click", this.showSettings);
  }

  /**
   * Creates an HTML template for a section with a toggleable checkbox.
   *
   * @param {Object} options - The options for creating the template.
   * @param {string} options.identifier - The unique identifier for the checkbox input.
   * @param {string} options.summary - The summary text to be displayed in the section.
   * @param {boolean} options.required - Indicates if the checkbox is required and should be disabled.
   * @param {string} options.title - The title to be displayed in the section.
   * @returns {string} The generated HTML template string.
   */
  createTemplate({ identifier, summary, required, title }) {
    return `<div class="crumbs-edit__section">
      <div class="crumbs-edit__block">
        <h4>${title}</h4>
        <p class="crumbs-edit__text">
          ${summary}
        </p>
      </div>
      <div class="crumbs-toggle">
        <input
          type="checkbox"
          name=${identifier}
          id=${identifier}
          class="crumbs-checkbox"
          ${required || this.accepted.includes(identifier) ? "checked" : ""}
          ${required ? "disabled" : ""}
        />
        <label
          for=${identifier}
          class="crumbs-toggle__checkbox"
          ${required ? "crumbs-toggle__checkbox--required" : ""}
        >
          <span class="crumbs__sr">${title}</span>
        </label>
      </div>
    </div>`;
  }

  /**
   * Prevent scrolling when the edit cookie settings component is open
   */
  disableScroll() {
    document.body.style.overflow = "hidden";
    document.body.classList.add("crumbs-overlay");
  }

  /**
   * Re-enable scrolling when the edit cookie settings component is closed
   */
  enableScroll() {
    document.body.style.overflow = "";
    document.body.classList.remove("crumbs-overlay");
  }

  /**
   * Close the edit screen (not destroy), set the focus back to the edit settings button
   * and enable scrolling of the viewport again
   */
  closeEditScreen() {
    const editClose = this.editScreen.querySelector(".crumbs-edit-close");

    editClose.addEventListener("click", () => {
      this.editSettingsButton?.focus();
      this.editScreen.remove();
      this.enableScroll();
      this.editAcceptButton.removeEventListener("click", this.acceptance);
    });
  }

  /**
  Opens the edit cookie modal and performs various actions
  */
  showSettings = () => {
    document.body.insertAdjacentElement("beforeend", this.editScreen);
    this.editScreen.focus();
    this.addPreferences();
    this.prepareFocusableElements(this.editScreen);
    this.editAccept();
    this.closeEditScreen();
    this.disableScroll();
    this.setCloseOnEscape();
    this.setCloseOutside();
  };

  /**
   * This method will trap the focus within the edit cookies modal
   */
  prepareFocusableElements(el) {
    // We know in advance that we only need to focus on buttons and input elements hence the explicit declaration
    // We also filter out disabled elements as these are not focusable by keyboard
    const focusableElements = [...el.querySelectorAll("input, button")].filter(
      (el) => !el.hasAttribute("disabled")
    );
    this.focusable = focusableElements;
    this.firstFocusableEl = this.focusable[0];
    this.lastFocusableEl = this.focusable[this.focusable.length - 1];
  }

  /**
   *
   * @param {Event} event
   */
  trapFocus = (event) => {
    let isTabPressed = event.key === "Tab";

    if (!isTabPressed) return;

    if (event.shiftKey && document.activeElement === this.firstFocusableEl) {
      this.lastFocusableEl.focus();
      event.preventDefault();
    } else if (document.activeElement === this.lastFocusableEl) {
      this.firstFocusableEl.focus();
      event.preventDefault();
    }
  };

  /**
   * This method will attach the relevant components to the edit screen depending on what was provided via
   * the 'types' property
   */
  addPreferences() {
    const wrapper = this.editScreen.querySelector("#cookie-categories");

    if (!this.types.length) return;

    wrapper.innerHTML = "";

    this.types.forEach((type) =>
      wrapper.insertAdjacentHTML("beforeend", this.createTemplate(type))
    );
  }

  /**
   * Emits the save event when preferences are set and provides a stringed array back to the
   * consumer to determine which cookies have been selected
   */
  editAccept() {
    const editAccept = this.editScreen.querySelector(".crumbs-edit-accept");
    this.editAcceptButton = editAccept;
    this.acceptance = this.acceptCookies.bind(this);
    this.editAcceptButton.addEventListener("click", this.acceptance);
  }

  /**
   * The function that closes the edit cookie settings screen with the "Escape" key
   * @param  {Event Object} event The event object
   */
  closeOnEscape = (event) => {
    if (event.key !== "Escape") return;

    this.editSettingsButton?.focus();
    this.editScreenCleanUp();
    this.removeEventListeners();
  };

  removeEventListeners() {
    document.removeEventListener("click", this.closeOnOutsideClick);
    document.removeEventListener("keydown", this.closeOnEscape);
    document.removeEventListener("keydown", this.trapFocus);
  }

  /**
   * The function that closes the edit cookie settings screen when clicking on the backdrop
   * @param  {Event Object} event The event object
   */
  closeOnOutsideClick = (event) => {
    if (this.editScreen.contains(event.target)) return;
    if (event.target === this.editSettingsButton) return;
    if (event.target === this.editCookieButton) return;

    this.editScreenCleanUp();
    this.removeEventListeners();
  };

  /**
   * Add event listener to close the edit settings screen when using the 'Escape' key
   */
  setCloseOnEscape() {
    document.addEventListener("keydown", this.closeOnEscape);
  }

  editScreenCleanUp = () => {
    this.enableScroll();
    this.editScreen.remove();
    this.editAcceptButton.removeEventListener("click", this.acceptance);
  };

  /**
   * Add event listener to close the edit settings screen when clicking on the backdrop
   */
  setCloseOutside() {
    document.addEventListener("click", this.closeOnOutsideClick);
  }

  /**
   * If the user decides to edit their cookie settings, this will determine which categories
   * need to be set by checking which checkboxes were activated.
   */
  acceptCookies() {
    const checkboxes = [
      ...this.editScreen.querySelectorAll('input[type="checkbox"]'),
    ];

    const accepted = checkboxes
      .filter(({ checked }) => checked)
      .map(({ name }) => name);

    this.accepted = accepted;

    this.editAcceptButton.removeEventListener("click", this.acceptance);

    document.removeEventListener("keydown", this.bannerTrapFocus);

    this.removeBanner(this.editScreen);

    if (this.cookieBanner) {
      this.removeBanner(this.cookieBanner);
    }

    this.broadcast("update");
    this.emit("save", this.payload());
    this.save();

    this.enableScroll();
    this.removeEventListeners();
  }

  clear() {
    document.cookie = `${this.name}="";domain=${this.domain};path=/;SameSite=None;Secure;expires=Thu, 01 Jan 1970 00:00:01 GMT`;

    this.cookie = null;
  }

  /**
   * Find out if the consent cookie is set
   * @returns {String} true | false
   */
  getCookie() {
    const name = this.name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const ca = decoded.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return null;
  }

  load() {
    const value = this.getCookie();

    if (!value) return null;

    return {
      value,
      version: this.getVersion(value),
    };
  }

  getVersion(value) {
    if (!value || typeof value !== "string") return null;

    return this.getVersionNumber(value.split("|")[0]);
  }

  getVersionNumber(value) {
    const match = value.match(/v(\d+)/);

    return match ? parseInt(match[1]) : null;
  }

  save(value) {
    const expiry = this.days ? `; max-age=${86400 * this.days}` : "";

    document.cookie = `${this.name}=${[
      `${formatVersion(this.version)}`,
      ...this.accepted,
    ].join("|")};domain=${this.domain}${expiry}; path=/;SameSite=None; Secure`;

    this.cookie = value;
  }

  /**
   * Remove an element from the view
   * @param  {HTMLElement} banner The banner we wish to remove
   */
  removeBanner(banner) {
    banner.remove();
  }
}
