import { EventEmitter } from "./components/eventEmitter";
import { editScreen } from "./components/editScreen";
import { cookieBanner } from "./components/cookieBanner";

export default class Crumbs extends EventEmitter {
  constructor({
    banner,
    cookieName,
    domain,
    days,
    editBanner,
    editCookieButton,
    types,
  }) {
    super();
    this.accepted = [];
    this.banner = banner;
    this.cookieName = cookieName || "cookie_consent";
    this.domain = domain;
    this.days = days;
    this.editBanner = editBanner;
    this.editCookieButton = editCookieButton;
    this.types = types;
    this.render();
  }

  /**
   * Render the cookie banner and attach various elements
   */
  render() {
    // Render the Cookie banner if the cookie_consent cookie isn't true
    if (!this.getCookie(this.cookieName)) {
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
        // As we are accepting all, we can send back everything that the
        // consumer provided via the 'types' property
        this.accepted = this.getCookieTypes(this.types);

        this.setAcceptanceCookie();
        this.removeBanner(this.cookieBanner);
        document.removeEventListener("keydown", this.bannerTrapFocus);
        this.emit("onSave", this.accepted);
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
      this.accepted = [];
      this.addPreferences();
      document.body.insertAdjacentElement("beforeend", this.editScreen);
      this.setFocus(this.editScreen);
      this.editAccept();
      this.closeEditScreen();
      this.prepareFocusableElements(this.editScreen);
      this.disableScroll();
      this.setCloseOnEscape();
      this.setCloseOutside();
      this.editTrapFocus = this.trapFocus.bind(this);
      document.addEventListener("keydown", this.editTrapFocus);
    });
  }

  /**
   * Add the editScreen component when the 'Edit Settings' button is clicked
   */
  editSettings(editHandler) {
    // Add the edit cookies modal to the DOM when selected
    editHandler.addEventListener("click", this.showSettings.bind(this));
  }

  /**
   *
   * @param {Array} types An array containing a number of objects that define the types of cookie categories we wish to potentially set
   * @returns {String[]} An array of string identifiers
   */
  getCookieTypes(types) {
    return types.map((type) => type.identifier);
  }

  /**
   * Set the current focus on a particular element
   * @param  {HTMLElement} element The element that we want to set focus on
   */
  setFocus(element) {
    element.focus();
  }

  /**
   * Creates the necessary HTML for the creation of the edit screen
   * @param {String} title The title of the cookie section
   * @param {String} summary The summary of the cookie category that is being set
   * @param {String} identifier An identifier which is used to assign a unique name to the checkbox
   * @returns {HTMLElement}
   */
  createTemplate(title, summary, identifier, required) {
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
          ${
            required || this.accepted.includes(identifier)
              ? 'checked="checked"'
              : ""
          }
          ${required ? 'disabled="disabled"' : ""}
        />
        <label for=${identifier} class="crumbs-toggle__checkbox ${
      required ? "crumbs-toggle__checkbox--required" : ""
    }">
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
      if (this.editSettingsButton) {
        this.setFocus(this.editSettingsButton);
      }
      this.editScreen.remove();
      this.enableScroll();
      this.editAcceptButton.removeEventListener("click", this.acceptance);
    });
  }

  /**
  Opens the edit cookie modal and performs various actions
  */
  showSettings() {
    document.body.insertAdjacentElement("beforeend", this.editScreen);
    this.setFocus(this.editScreen);
    this.addPreferences();
    this.prepareFocusableElements(this.editScreen);
    this.editAccept();
    this.closeEditScreen();
    this.disableScroll();
    this.setCloseOnEscape();
    this.setCloseOutside();
  }

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
   * @param {The event object} evt
   */
  trapFocus(evt) {
    let isTabPressed = evt.key === "Tab";

    if (!isTabPressed) {
      return;
    }

    if (evt.shiftKey) {
      if (document.activeElement === this.firstFocusableEl) {
        this.setFocus(this.lastFocusableEl);
        evt.preventDefault();
      }
    } else {
      if (document.activeElement === this.lastFocusableEl) {
        this.setFocus(this.firstFocusableEl);
        evt.preventDefault();
      }
    }
  }

  /**
   * This method will attach the relevant components to the edit screen depending on what was provided via
   * the 'types' property
   */
  addPreferences() {
    const cookieTypeWrapper =
      this.editScreen.querySelector("#cookie-categories");
    if (!this.types) {
      return;
    }
    cookieTypeWrapper.innerHTML = "";
    const sliced = this.getCookie(this.cookieName).split("|").slice(1);

    for (let i = 0; i < this.types.length; i++) {
      if (sliced[i] == "true") {
        this.accepted.push(this.types[i].identifier);
      }
    }

    this.types.map((type) => {
      const { title, summary, identifier, required } = type;
      const el = this.createTemplate(title, summary, identifier, required);
      cookieTypeWrapper.insertAdjacentHTML("beforeend", el);
    });
  }

  /**
   * Emits the onSave event when preferences are set and provides a stringed array back to the
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
  closeOnEscape(event) {
    if (event.key === "Escape") {
      if (this.editSettingsButton) {
        this.setFocus(this.editSettingsButton);
      }
      this.editScreenCleanUp();
      this.removeEventListeners();
    }
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.closeOnEscapeFn);
    document.removeEventListener("click", this.closeOnOutsideClickFn);
    document.removeEventListener("keydown", this.editTrapFocus);
  }

  /**
   * The function that closes the edit cookie settings screen when clicking on the backdrop
   * @param  {Event Object} event The event object
   */
  closeOnOutsideClick(event) {
    if (this.editScreen.contains(event.target)) return;
    if (event.target === this.editSettingsButton) return;
    if (event.target === this.editCookieButton) return;

    this.editScreenCleanUp();
    this.removeEventListeners();
  }

  /**
   * Add event listener to close the edit settings screen when using the 'Escape' key
   */
  setCloseOnEscape() {
    this.closeOnEscapeFn = this.closeOnEscape.bind(this);
    document.addEventListener("keydown", this.closeOnEscapeFn);
  }

  editScreenCleanUp() {
    this.enableScroll();
    this.editScreen.remove();
    this.editAcceptButton.removeEventListener("click", this.acceptance);
  }

  /**
   * Add event listener to close the edit settings screen when clicking on the backdrop
   */
  setCloseOutside() {
    this.closeOnOutsideClickFn = this.closeOnOutsideClick.bind(this);
    document.addEventListener("click", this.closeOnOutsideClickFn);
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
      .filter((checkbox) => checkbox.checked)
      .map((c) => c.name);

    this.accepted = accepted;

    this.editAcceptButton.removeEventListener("click", this.acceptance);
    document.removeEventListener("keydown", this.bannerTrapFocus);

    this.removeBanner(this.editScreen);
    if (this.cookieBanner) {
      this.removeBanner(this.cookieBanner);
    }
    this.emit("onSave", this.accepted);
    this.setAcceptanceCookie();

    this.enableScroll();
    this.removeEventListeners();
  }

  /**
   * Find out if the cookie_consent cookie is set
   * @param  {String} cookieName The name of the cookie we are checking
   * @returns {String} true | false
   */
  getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }

  /**
   * Set the cookie_consent cookie that determines whether the banner is shown or not
   */
  setAcceptanceCookie() {
    this.setCookie(this.cookieName, this.days);
  }

  /**
   * Remove an element from the view
   * @param  {HTMLElement} banner The banner we wish to remove
   */
  removeBanner(banner) {
    banner.remove();
  }

  /**
   * Set a cookie for a certain amount of time
   * @param  {String} name The name of the cookie
   * @param  {Number} days The number of days the cookie should be set for before expiring (max-age)
   */
  setCookie(name, days) {
    let maxAge = "";
    if (days) {
      const time = 86400 * days;
      maxAge = `; max-age=${time}`;
    }

    const setCookieBoolean = this.types.map((cookie) => {
      return this.accepted.includes(cookie.identifier);
    });

    const value = ["v1", ...setCookieBoolean].join("|");
    document.cookie = `${name}=${value || ""};domain=${
      this.domain
    }${maxAge}; path=/;SameSite=None; Secure`;
  }
}
