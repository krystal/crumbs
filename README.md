# Crumbs

A small package that will determine which cookies a user is willing to accept.

## Prerequesites

Node > 10.13

## Installation and developing locally.

1. Clone the repo via `git clone git@github.com:krystal/crumbs.git`
2. `npm install`
3. `npm run dev` to start the deveopment server.
4. Visit [http://localhost:4000](http://localhost:4000)

## Build

`npm run build` will create the minified bundle in the `dist` folder

## Usage

Crumbs returns a stringed array of the type cookies that are to be set.

These types are:

- functional
- targeting
- performance

These are accessed by calling the `onSave` method after instantiation.

```
document.addEventListener('DOMContentLoaded', () => {

  const cookies = new Crumbs();
  cookies.on('onSave', (preferences) => {
    if (preferences.includes('functional')) {
      // Set some functional cookies
    }
    if (preferences.includes('targeting')) {
      // Set some targeting cookies
    }
    if (preferences.includes('performance')) {
      // Set some performance cookies
    }
  });
});
```

## Options

There are a number of options that are required for the Crumbs constructor

`cookieName`: Give the cookie your own name. If not specified then the default is `cookie_consent`

`editSettingsButton`: This is an HTMLElement that you want to attach an event listener too in order for the user to change the cookie settings

`days`: The duration of the cookie that is set on acceptance

You can also specify the types of cookies your site can set by specifying an Array of objects as part of the `types` property. Each object must contain the following properties:

`identifier: 'functional'` The unique name of the type of cookie.

`required: true` A boolean on whether or not this type of cookie is required.

`summary: 'A summary about the type of cookie'` An explanation about the type of cookie you are allowing the user to set and why these are used.

`title: 'Functional'` A capitalised version of the `identifier` that is used as the heading on the edit dialog popup.

**Example**

```
document.addEventListener('DOMContentLoaded', () => {

  const cookies = new Crumbs({
    cookieName: 'cookie_name',
    editSettingsButtons: document.querySelector('.edit-cookies'),
    days: 365,
    types: [
      {
        identifier: 'functional',
        required: true,
        summary:
          'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.',
        title: 'Functional',
      }
    ]
  });

});
```

### Styling

Most of the styling is left to the project you are using Crumbs in expect a the main positioning of elements. For example, the banner being stuck to the bottom of the page and the edit preferences dialog being in the middle of the screen.

There are however some colours that you can override with some CSS custom properties. These are as follows:

```
:root {
  --crumbs-edit--bg: #f4f4f4;
  --crumbs-edit-overlay: rgba(0, 0, 0, 0.4);
  --crumbs-edit-cta-bg: gainsboro;
  --crumbs-toggle-switch-bg: #858585;
  --crumbs-toggle-checked-bg: #e0e0e0;
  --crumbs-toggle-border-color: #dddddd;
  --crumbs-toggle-switch-border-color: #a8a8a8;
}
```

What you see above is all the defaults that are provided by Crumbs.
