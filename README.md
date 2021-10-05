# Crumbs

A small package that will determine which cookies a user is willing to accept.

## Prerequesites

Node > 10.13

## Installation and developing locally

1. Clone the repo via `git clone git@github.com:krystal/crumbs.git`
2. `npm install`
3. `npm run dev` to start the deveopment server.
4. Visit [http://localhost:3000](http://localhost:3000)

## Build

`npm run build` will create the minified bundle in the `dist` folder

## Usage

Crumbs returns a stringed array of the type cookies that are to be set which are defined by passing in objects to the `types` array.

These are accessed by calling the `onSave` method after instantiation.

```
document.addEventListener('DOMContentLoaded', () => {

  const cookies = new Crumbs();
  cookies.on('onSave', (preferences) => {
    // Do some stuff
  });
});
```

## Options

There are a number of options that are required for the Crumbs constructor.

| Option           | Description                                                                                                              | Type        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| cookieName       | The name you would like the give the cookie                                                                              | string      |
| days             | The duration of the cookie that is set on acceptance                                                                     | number      |
| domain           | The domain you wish to set the cookie on                                                                                 | string      |
| editCookieButton | This is an HTMLElement that you want to attach an event listener too in order for the user to change the cookie settings | HTMLElement |
| types            | An array of objects with each one containing a `identifier`, `summary`, `required` and a `title`                         | object[]    |

A `type` itself is made up of the following items

| Option     | Description                                                                                                | Type    | Example                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------- |
| identifier | The unique name of the type of cookie                                                                      | string  | 'functional'                                                  |
| required   | A boolean on whether or not this type of cookie is 100% needed for your site/application to be operational | boolean | true                                                          |
| summary    | An explanation about the type of cookie you are allowing the user to set and why these are being used      | string  | 'A summary of what this type of cookie provides functionally' |
| title      | A capitalised version of the `identifier` that is used as the heading on the edit dialog popup             | string  | 'Functional'                                                  |

**Example**

```
document.addEventListener('DOMContentLoaded', () => {

  const cookies = new Crumbs({
    cookieName: 'cookie_name',
    domain: '.domain.com',
    editCookieButtons: document.querySelector('.edit-cookies'),
    days: 365,
    types: [
      {
        identifier: 'functional',
        required: true,
        summary:
          'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.',
        title: 'Functional',
      },

      // More types here

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
  --crumbs-toggle-switch-focus-border-color: #a8a8a8;
}
```

What you see above is all the defaults that are provided by Crumbs.
