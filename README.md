# Crumbs

A small package that will determine which cookies a user is willing to accept.

## Prerequesites

You will need a version of node.js installed on your machine.

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

### Webpack Analyzer

Possibly a bit overkill for this sort of project however when running the environment locally
you will also get the webpack analyser spinning up locally at `http://127.0.0.1:8888/`
