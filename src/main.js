import { EventEmitter } from 'events';
import { functional } from './components/functional';
import { performance } from './components/performance';
import { targeting } from './components/targeting';
import { editScreen } from './components/editScreen';
import { cookieBanner } from './components/cookieBanner';
import './main.css';

export default class Crumbs extends EventEmitter {
  constructor({
    editCookieButton,
    days,
    types = ['functional', 'performance', 'targeting'],
  }) {
    super();
    this.acceptance = null;
    this.accepted = ['functional', 'performance', 'targeting'].filter(
      (cookie) => {
        return types.includes(cookie);
      }
    );
    this.banner = null;
    this.days = days;
    this.editAcceptButton = null;
    this.editCookieButton = editCookieButton;
    this.editScreen = null;
    this.editSettingsButton = null;
    this.render();
  }

  /**
   * Render the cookie banner and attach various elements
   */
  render() {
    // Render the Cookie banner if the cookie_consent cookie isn't true
    if (!this.getCookie('cookie_consent')) {
      // Create the banner itself as a template literal and add it
      // to the DOM, at the end of the body
      document.body.insertAdjacentHTML('beforeend', cookieBanner);

      // As we have created this we can have access to it now for removing later
      this.banner = document.querySelector('.crumbs-banner');

      // Clicking on accept all sets all the cookies and hides the banner
      const acceptCookies = document.querySelector('.crumbs-accept-all');
      acceptCookies.addEventListener('click', () => {
        // As we are accepting all, we can send back everything
        this.setAcceptanceCookie();
        this.removeBanner(this.banner);
        this.emit('onSave', this.accepted);
      });

      // Select our edit button, assign it to the constructor and pass
      // it to our editSettings method
      this.editSettingsButton = document.querySelector('.crumbs-edit-settings');
      this.editSettings(this.editSettingsButton);
    }

    // This sets up the editScreen component and adds it to memory for later use
    const fragment = document
      .createRange()
      .createContextualFragment(editScreen);
    const elementToAdd = fragment.firstElementChild;
    this.editScreen = elementToAdd;

    // Add the relevant preferences that have been specified by the types Array
    this.addPreferences();

    this.editCookieButton.addEventListener('click', () => {
      this.buildEditScreen();
      document.body.insertAdjacentElement('beforeend', this.editScreen);

      this.editAccept();
      this.closeEditScreen();

      this.setFocus(this.editScreen);
      this.disableScroll();
      this.setCloseOnEscape();
    });
  }

  /**
   * Here we take the accepted array and automatically check these options when
   * rebuilding the edit preferences dialog.
   */
  buildEditScreen() {
    // Getting all radio buttons and resetting them to false
    const radios = Array.from(
      this.editScreen.querySelectorAll('input[type="radio"]')
    );
    radios.forEach((radio) => {
      radio.checked = false;
    });

    // Filtering out the 'on' radios that are in the accepted array
    radios
      .filter((radio) => {
        if (this.accepted.includes(radio.name) && radio.id === 'on')
          return radio;
      })
      .map((r) => {
        const radioToCheck = this.editScreen.querySelector(
          `#${r.id}[name=${r.name}]`
        );
        radioToCheck.checked = true;
      });
  }

  /**
   * Add the editScreen component when the 'Edit Settings' button is clicked
   */
  editSettings(editHandler) {
    // Add the edit cookies modal to the DOM when selected
    editHandler.addEventListener('click', this.showSettings.bind(this));
  }

  /**
   * Set the current focus on a particular element
   * @param  {HTMLElement} element The element that we want to set focus on
   */
  setFocus(element) {
    element.focus();
  }

  /**
   * The function that closes the edit cookie settings screen
   * @param  {Event Object} event The element that we want to set focus on
   */
  closeOnEscape(event) {
    if (event.key === 'Escape') {
      if (this.editSettingsButton) {
        this.setFocus(this.editSettingsButton);
      }
      this.editScreen.remove();
      this.enableScroll();
      this.editAcceptButton.removeEventListener('click', this.acceptance);
    }
  }

  /**
   * Add event listener to close the edit settings screen
   */
  setCloseOnEscape() {
    document.addEventListener('keydown', this.closeOnEscape.bind(this));
  }

  /**
   * Prevent scrolling when the edit cookie settings component is open
   */
  disableScroll() {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('crumbs-overlay');
  }

  /**
   * Re-enable scrolling when the edit cookie settings component is closed
   */
  enableScroll() {
    document.body.style.overflow = '';
    document.body.classList.remove('crumbs-overlay');
  }

  /**
   * Close the edit screen (not destroy), set the focus back to the edit settings button
   * and enable scrolling of the viewport again
   */
  closeEditScreen() {
    const editClose = this.editScreen.querySelector('.crumbs-edit-close');
    editClose.addEventListener('click', () => {
      if (this.editSettingsButton) {
        this.setFocus(this.editSettingsButton);
      }
      this.editScreen.remove();
      this.enableScroll();
      this.editAcceptButton.removeEventListener('click', this.acceptance);
    });
  }

  showSettings() {
    document.body.insertAdjacentElement('beforeend', this.editScreen);
    this.editAccept();
    this.closeEditScreen();
    this.setFocus(this.editScreen);
    this.disableScroll();
    this.setCloseOnEscape();
  }

  addPreferences() {
    const cookieTypeWrapper = this.editScreen.querySelector(
      '#cookie-categories'
    );
    if (this.accepted.includes('functional')) {
      cookieTypeWrapper.insertAdjacentHTML('beforeend', functional);
    }
    if (this.accepted.includes('performance')) {
      cookieTypeWrapper.insertAdjacentHTML('beforeend', performance);
    }
    if (this.accepted.includes('targeting')) {
      cookieTypeWrapper.insertAdjacentHTML('beforeend', targeting);
    }
  }

  /**
   * Emits the onSave event when preferences are set and provides a stringed array back to the
   * consumer to determine which cookies have been selected
   */
  editAccept() {
    const editAccept = this.editScreen.querySelector('.crumbs-edit-accept');
    this.editAcceptButton = editAccept;
    this.acceptance = this.acceptCookies.bind(this);
    this.editAcceptButton.addEventListener('click', this.acceptance);
  }

  acceptCookies() {
    const radioButtons = Array.from(
      document.querySelectorAll('input[type="radio"]')
    );
    const accepted = radioButtons
      .filter((radio) => {
        if (radio.id === 'on' && radio.checked === true) {
          return radio;
        }
      })
      .map((r) => {
        return r.name;
      });
    this.accepted = accepted;

    this.editAcceptButton.removeEventListener('click', this.acceptance);
    this.removeBanner(this.editScreen);
    if (this.banner) {
      this.removeBanner(this.banner);
    }
    this.emit('onSave', this.accepted);
    console.log(this.accepted);
    if (this.accepted.length !== 0) {
      this.setAcceptanceCookie();
    } else {
      this.setRejectionCookie();
    }

    this.enableScroll();
  }

  /**
   * Find out if the cookie_consent cookie is set
   * @param  {String} cookieName The name of the cookie we are checking
   * @returns {String} true | false
   */
  getCookie(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  /**
   * Set the cookie_consent cookie that determines whether the banner is shown or not
   */
  setAcceptanceCookie() {
    this.setCookie('cookie_consent', 'true', this.days);
  }

  /**
   * Set the cookie_consent cookie to false
   */
  setRejectionCookie() {
    this.setCookie('cookie_consent', 'false', this.days);
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
   * @param  {String} value The value to assign the cookie
   * @param  {Number} days The number of days the cookie should be set for before expiring (max-age)
   */
  setCookie(name, value, days) {
    let maxAge = '';
    if (days) {
      const time = 86400 * days;
      maxAge = `; max-age=${time}`;
    }
    document.cookie = `${name}=${value || ''}${maxAge}; path=/`;
  }
}
