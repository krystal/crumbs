import '../src/main.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log(window.Crumbs);
  const editCookies = document.querySelector('.edit-cookies');
  const CookieBanner = new Crumbs({
    editCookieButton: editCookies,
    days: 365,
    types: [
      {
        identifier: 'functional',
        required: true,
        summary:
          'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.',
        title: 'Functional',
      },
      {
        identifier: 'targeting',
        required: true,
        summary:
          'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.',
        title: 'Targeting',
      },
    ],
  });
  const acceptedCookies = document.querySelector('.accepted-cookies');
  CookieBanner.on('onSave', (preferences) => {
    acceptedCookies.innerHTML = '';
    preferences.forEach((cookie) => {
      const li = document.createElement('li');
      li.textContent = cookie;
      acceptedCookies.append(li);
    });
  });
});
