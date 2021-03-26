import { EventEmitter } from 'events';
import { pubsub } from './components/pubsub';
import { editScreen } from './components/editScreen';
import { cookieBanner } from './components/cookieBanner';
import './main.css';

class Crumbs extends EventEmitter {
  constructor() {
    super();
    this.accepted = ['analytics', 'functional', 'targeting'];
    this.banner = null;
    this.editScreen = null;
    this.render();
  }

  /**
   * Render the cookie banner if cookie_consent !== true
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

      this.editSettings();
      pubsub.subscribe('cookiesUpdated');
    }
  }

  /**
   * Add the editScreen component when the 'Edit Settings' button is clicked
   */
  editSettings() {
    // Build the edit modal
    const editSettingsButtons = document.querySelector('.crumbs-edit-settings');

    // Add the edit cookies modal to the DOM when selected
    editSettingsButtons.addEventListener('click', () => {
      document.body.insertAdjacentHTML('beforeend', editScreen);
      this.editAccept();
      this.closeEditScreen();

      // Set the editScreen property so we have access to hide it later on.
      this.editScreen = document.querySelector('.crumbs-edit');
      this.setFocus(this.editScreen);
    });
  }

  setFocus(element) {
    element.focus();
  }

  /**
   * Close the edit screen (not destroy)
   */
  closeEditScreen() {
    const editClose = document.querySelector('.crumbs-edit-close');
    editClose.addEventListener('click', () => {
      this.editScreen.remove();
      this.setFocus(document.querySelector('.crumbs-edit-settings'));
    });
  }

  /**
   * Emits the onSave event when preferences are set and provides a stringed array back to the
   * consumer to determine which cookies have been selected
   */
  editAccept() {
    const editAccept = document.querySelector('.crumbs-edit-accept');
    editAccept.addEventListener('click', () => {
      const checkboxes = Array.from(
        document.querySelectorAll('input[type="checkbox"]')
      );
      const accepted = checkboxes
        .filter((checkbox) => {
          if (checkbox.checked === true) {
            return checkbox;
          }
        })
        .map((c) => {
          return c.id;
        });

      this.removeBanner(this.editScreen);
      this.removeBanner(this.banner);

      // Based on the selected checkboxes we will add the relevant cookies
      this.emit('onSave', accepted);
      pubsub.publish('cookiesUpdated', accepted);
      this.setAcceptanceCookie();
    });
  }

  /**
   * Find out if the cookie_consent cookie is set
   * @param  {String} cookieName The name of the cookie we are checking
   * @returns {Boolean}
   */
  getCookie(cookieName) {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      const c = ca[i];

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
    this.setCookie('cookie_consent', true, 365);
  }

  /**
   * Remove an element from the view
   * @param  {Node} banner The banner we wish to remove
   */
  removeBanner(banner) {
    banner.remove();
    pubsub.unsubscribe('cookiesUpdated');
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

//
// This is us consuming the library in a project
//

document.addEventListener('DOMContentLoaded', () => {
  const c = new Crumbs();
  const acceptedCookies = document.querySelector('.accepted-cookies');

  c.on('onSave', (preferences) => {
    // Add the preferences to a fake list on the page
    preferences.forEach((preference) => {
      const li = document.createElement('li');
      li.textContent = preference;
      acceptedCookies.append(li);
    });
  });
});
