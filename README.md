# postcss-tags-without-class

Applies tag selectors only if no class is present on the tag.

## Only Style Pure Tags

```css
button {
    color: red;
}
```

```html
<button>I'm red.</button>
<button class="opt-out">I'm still black.</button>
```

## Installation and Usage

```
npm i postcss postcss-tags-without-class
```

```js
const postcss = require('postcss')
const tagsWithoutClass = require('postcss-tags-without-class')

postcss([tagsWithoutClass]).process('button {color: red;}').then(result => {
    const transformedCSS = result.css

    transformedCSS === 'button:not([class]){color: red;}' // true
})
```

## How?

This plugin will add `:not([class])` to each tag. Multiple tags `button, a`, chained tags `ul li` and tags with pseudo classes `button:focus` are supported as well.

```css
button {}

button,
a {}

button:focus {}

a span {}
```

will become

```css
button:not([class]) {}

button:not([class]),
a:not([class]) {}

button:not([class]):focus {}

a:not([class]) span:not([class]) {}
```

## License

MIT
