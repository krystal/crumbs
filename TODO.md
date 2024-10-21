# TODO

## Improvements

- Add documentation for new features
- Migrate to TypeScript
- Find a way to retrieve the expiry date for a cookie
- Extract the `Banner` and `Modal` into separate components
- Make a React library for Crumbs
- Allow custom components to be rendered in response
- JSON encode the cookies rather than storing them in a weird format
- Add some kind of automated testing to verify it works

## Migration Functions

Migration functions should use the following type signature:

```ts
type Migration = (string: value) => <string[] | null>
```

## Banner

```js
class Component {
  constructor() {
    this.bind();
  }

  bind() {}

  destroy() {}

  render() {}

  unbind() {}
}

class Banner extends Component {}
```
