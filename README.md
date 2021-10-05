# Crumbs

Crumbs is a small JavaScript library which allows you to declare what types of cookies your site/application
uses and provides a list of the accepted categories.

## Table of Contents

1. [Installation and developing locally](#installation-and-developing-locally)
2. [Production Build](#build)
3. [Usage](#usage)
4. [Options](#options)
5. [Example](#example)

   i. [Google Tag Manager](#google-tag-manager)

6. [Styling](#styling)

## Installation and developing locally

1. Clone the repo via `git clone git@github.com:krystal/crumbs.git`
2. `npm install`
3. `npm run dev` to start the deveopment server.
4. Visit [http://localhost:3000](http://localhost:3000)

## Build

`npm run build` will create the minified bundle in the `dist` folder

## Usage

The easiest way to get up and running with Crumbs is to install the package via [npm](https://www.npmjs.com/package/krystal-crumbs).

After installation you can then import Crumbs:

`import Crumbs from 'krystal-crumbs'`

This will give you access to the Crumbs constructor and allow you to set up your instance and pass in your
configuration options:

```
const cookies = new Crumbs({
  // options go here
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
| title      | A capitalised version of the `identifier` that is used as the heading as part of the edit dialog           | string  | 'Functional'                                                  |

Crumbs returns a stringed array of the type cookies that are to be set which are defined by passing in objects to the `types` array.

Behind the scenes Crumbs then sets cookies based on the action of the user. For example, if 'Accept all Cookies' is clicked then Crumbs will set all of the `types` passed to `true`. This will results in the following cookie being set in the browser.

Note: This assumes that you have passed an array of length 3 to the types options.

| Name           | Value                  |
| -------------- | ---------------------- |
| cookie_consent | v1\|true\|true\|true\| |

After acceptance the `onSave` event is fired which will provide you with a list of the cookie types that
have been accepted.

```
cookies.on('onSave', (preferences) => {
  // Do something with the preferences
  // The 'preferences' here will look like this:
  // ['functional', 'analytics']
});
```

### Example

Following on from the above, let's walk through an example and stitch all the pieces together.

The code below combines all that has been discussed so far and will get you up and running with Crumbs.

```
document.addEventListener('DOMContentLoaded', () => {

  const editButton = document.querySelector('.edit-cookies');

  const cookies = new Crumbs({
    cookieName: 'cookie_name',
    domain: 'domain.com',
    editCookieButtons: editButton,
    days: 365,
    types: [
      {
        identifier: 'functional',
        required: true,
        summary:
          'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. These cannot be disabled.',
        title: 'Functional',
      },
      {
        identifier: "analytics",
        required: false,
        summary:
          "We use Google Analytics to measure the performance of our website. We do not store any personal data and your IP address is anonymised. Analytics is disabled in the application itself.",
        title: "Analytics",
      },
      {
        identifier: "live_chat",
        required: false,
        summary:
          "We use a live chat service called Crisp so we can privide support to you where available. Various cookies are stored so chats remain active when you change page.",
        title: "Live Chat",
      },
    ]
  });

});
```

This is a good start however, we can take this further and use Crumbs in conjunction with Google Tag Manager in order to call certain scripts based on what the user is willing to accept.

### Google Tag Manager

As previously mentioned you can listen for the `onSave` event to determine when the cookie preferences have been accepted and in here is where we want to access the `dataLayer` provided by Google Tag Manager (GTM).

```
cookies.on('onSave', () => {
	window.dataLayer &&
    window.dataLayer.push({
	    event: "your-custom-event-name-here"
    });
});
```

When the cookie preferences are saved our custom GTM event triggers a check of what cookies have been set via a Regex table check against the different types that were provided to Crumbs.

If we follow through with our above example and say that we accept the 'functional' and 'analytical' cookie types but reject the 'live chat' option then the cookie value will be:

| Name        | Value                 |
| ----------- | --------------------- |
| cookie_name | v1\|true\|true\|false |

And our check for the analytics cookie type in GTM will be:

`^v1\|(true|false)\|true\|(true|false)$`

Given this information we can then go ahead and start to call any sort of analytics scripts that required this sort of consent.

One important note is that the order of the regex table matters as the second item of our `types` array matches up with the second boolean value.

### Styling

The majority of the styling is left up to yourself and there is also the option of not importing the Crumbs
stylesheet at all for full control.

If you do go down the route of importing the Crumbs stylesheet then there are various CSS custom properties that you can use to customise the main areas of Crumbs.

These are as follows:

```
:root {
  --crumbs-edit-bg: #f4f4f4;
  --crumbs-edit-overlay: rgba(0, 0, 0, 0.4);
  --crumbs-edit-cta-bg: #dcdcdc;
  --crumbs-toggle-bg-color: #ffffff;
  --crumbs-toggle-switch-bg: #858585;
  --crumbs-toggle-checked-bg: #e0e0e0;
  --crumbs-toggle-border-color: #dddddd;
  --crumbs-toggle-switch-focus-border-color: #a8a8a8;
}
```

You can import the minified Crumbs stylesheet with the following snippet:

`import "krystal-crumbs/dist/main.css"`
