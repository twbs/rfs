<p align="center">
  <img src="https://raw.githubusercontent.com/twbs/rfs/master/rfs.svg?sanitize=true" alt="RFS logo" width="99" height="108.6">
</p>

RFS is a unit resizing engine which was initially developed to resize font sizes (hence its abbreviation for Responsive Font Sizes). Nowadays RFS is capable of rescaling basically every value for any css property with units, like `margin`, `padding`, `border-radius` or even `box-shadow`.

The mechanism **automatically calculates the appropriate values** based on the dimensions of the browser viewport. It's available in one of your favourite preprocessors or postprocessor: [Sass](https://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/) or [PostCSS](https://postcss.org/).

# RFS

[![npm][npm-image]][npm-url]
[![licence][licence-image]][license-url]
[![build][build-image]][build-url]
[![devDeps][devDeps-image]][devDeps-url]

- [Installation](#installation)
- [Usage](#usage)
- [Visualisation](#visualisation)
- [Configuration](#configuration)
- [Demos](#demos)
- [Versions](#versions)
- [Creator](#creator)
- [Copyright and license](#copyright-and-license)

## Installation

RFS can be installed using a package manager (recommended):

- npm: `npm install rfs`
- yarn: `yarn add rfs`

**Copy/paste (not recommended):**

The source files can also be downloaded manually and used in a project. This method is not recommended because you
lose the ability to easily and quickly manage and update RFS as a dependency.

## Usage

### Input

#### Sass (<code>.scss</code> syntax)

```scss
@import "node_modules/rfs/scss";

:root {
  --spacer-lg: rfs(2.5rem);
}

.title {
  margin-bottom: var(--spacer-lg);
  padding-top: rfs(.5rem) !important;
  font-size: rfs(4rem);
}
```

#### Sass (<code>.sass</code> syntax)

```sass
@import "node_modules/rfs/sass"

:root
  --spacer-lg: rfs(2.5rem)

.title
  margin-bottom: var(--spacer-lg)
  padding-top: rfs(.5rem) !important
  font-size: rfs(4rem)
```

#### PostCSS

Have a look at the [examples folder](https://github.com/twbs/rfs/tree/master/examples/postcss) to find examples on how your PostCSS setup can be configured.

```css
:root {
  --spacer-lg: rfs(2.5rem);
}

.title {
  margin-bottom: var(--spacer-lg);
  padding-top: rfs(.5rem) !important;
  font-size: rfs(4rem);
}
```

#### Less

Using [unnamed lookups](http://lesscss.org/features/#mixins-feature-unnamed-lookups).

```less
@import "node_modules/rfs/less";

:root {
  --spacer-lg: .rfs(2.5rem)[];
}

.title {
  margin-bottom: var(--spacer-lg);
  padding-top: rfs(.5rem)[] !important;
  font-size: rfs(4rem)[];
}
```

#### Stylus

```stylus
@import "node_modules/rfs/stylus";

:root {
  --spacer-lg: rfs(2.5rem);
}

.title {
  margin-bottom: var(--spacer-lg);
  padding-top: rfs(.5rem) !important;
  font-size: rfs(4rem);
}
```

### Generated css

```css
:root {
  --spacer-lg: min(2.5rem, calc(1.375rem + 1.5vw));
}

.title {
  margin-bottom: var(--spacer-lg);
  padding-top: .5rem !important;
  font-size: min(4rem, calc(1.525rem + 3.3vw));
}
```

## Fluid rescaling in action

The following example shows the effect of RFS on `padding`s, `box-shadow`s & `font-size`s:

![RFS](https://raw.githubusercontent.com/twbs/rfs/master/.github/rfs-rescale.gif)

## Visualisation

If you wonder how the values are rescaled, wonder no more and stare at this graph which might clarify things a bit:

![RFS visualisation](https://raw.githubusercontent.com/twbs/rfs/master/.github/rfs-graph.svg?sanitize=true)

Each color represents another value being rescaled. For example:

```scss
.title {
  font-size: rfs(40px);
}
```

This is the green line. A font size of `40px` stays `40px` in viewports with a size larger than `1200px`. Below `1200px`, the font size is rescaled and at viewport of `360px`, the font size is about `27px`. Note that every font size is generated in a combination of `rem` and `vw` units, but they are mapped  to `px` in the graph to make it easier to understand.

## Configuration

RFS works out of the box without any configuration tweaks, but if you feel the urge to go loco and fine tune the way values are rescaled, you can:

### Base value <sub><sup>(unit in `px` or `rem`)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-base-value`
- Less: `@rfs-base-value`
- PostCSS: `baseValue`

The option will prevent the value from becoming too small on smaller screens. If the font size which is passed to RFS is smaller than this value, no fluid rescaling will take place.

*Default value: `1.25rem`*

### Unit <sub><sup>(`px` or `rem`)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-unit`
- Less: `@rfs-unit`
- PostCSS: `unit`

The output value will be rendered in this unit. Keep in mind configuring this value to `px` will disable the ability for users to change the the font size in their browser.

*Default value: `rem`*

### Breakpoint <sub><sup>(in `px`, `em` or `rem`)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-breakpoint`
- Less: `@rfs-breakpoint`
- PostCSS: `breakpoint`

Above this breakpoint, the value will be equal to the value you passed to RFS; below the breakpoint, the value will dynamically scale.

*Default value: `1200px`*

### Factor <sub><sup>(number)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-factor`
- Less: `@rfs-factor`
- PostCSS: `factor`

This value determines the strength of font size resizing. The higher the factor, the less difference there is between values on small screens. The lower the factor, the less influence RFS has, which results in bigger values for small screens. The factor must be greater than 1.

*Default value: `10`*

### Rem value <sub><sup>(number)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-rem-value`
- Less: `@rfs-rem-value`
- PostCSS: `remValue`

The value of `1rem` in `px`. The value of `1rem` is typically `16px` but if the font size is changed for `html` the value of `1rem` changes. This variable can be used to change the default value but be careful with it because changing it could lead to unexpected behaviour, for example if additional CSS is loaded which expects `1rem` to be `16px`.

*Default value: `16`*

### Two dimensional <sub><sup>(boolean)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-two-dimensional`
- Less: `@rfs-two-dimensional`
- PostCSS: `twoDimensional`

Enabling the two dimensional option will determine the value based on the smallest side of the screen with `vmin`. This prevents values from changing if the device toggles between portrait and landscape mode.

*Default value: `false`*

## Best practices

- Don't set RFS on the `html` element, because this influences the value of `rem` and could lead to unexpected results.
- Always set your line-heights relative (in `em` or unitless) to prevent interline issues with font sizes.

## Browser support

RFS is supported by all browsers that support [CSS math functions](https://caniuse.com/#feat=css-math-functions). If you need support for legacy browsers, check out the [v9 version](https://github.com/twbs/rfs/tree/v9.0.3) which uses media queries.

## Demos

- [Card example (Sass)](https://codepen.io/MartijnCuppens/pen/NWxxWWz?editors=0100)
- [Card example (Sass, with custom properties)](https://codepen.io/MartijnCuppens/pen/wvMgGpN?editors=1100)
- [Card example (PostCSS)](https://codepen.io/MartijnCuppens/pen/OJMWNod?editors=0100)
- [Card example (PostCSS, with custom properties)](https://codepen.io/MartijnCuppens/pen/zYrNqLN?editors=0100)
- [RFS in Bootstrap demo](https://v5.getbootstrap.com/)

## Versions

### Current version (v10)

In v10, rfs is a function which outputs the css `min()` function.

### Version 9

In v9, rfs is a mixin in Sass, Less & Stylelint. This version uses a media query with `min-width` (mobile first approach). v9 is used in Bootstrap 5.

### Version 8

In v8, rfs only supported font sizes. This version uses a `max-width` media query. v8 is used in from Bootstrap 4.3.

## Creator

**Martijn Cuppens**

- <https://twitter.com/Martijn_Cuppens>
- <https://github.com/MartijnCuppens>

## Copyright and license

Code released under [the MIT license](https://github.com/twbs/rfs/blob/master/LICENSE).

[npm-image]: https://img.shields.io/npm/v/rfs.svg
[npm-url]: https://npmjs.org/package/rfs
[licence-image]: https://img.shields.io/npm/l/rfs.svg
[license-url]: https://github.com/twbs/rfs/blob/master/LICENSE
[build-image]: https://github.com/twbs/rfs/workflows/Tests/badge.svg
[build-url]: https://github.com/twbs/rfs/actions?workflow=Tests
[devDeps-image]: https://img.shields.io/david/dev/twbs/rfs.svg
[devDeps-url]: https://david-dm.org/twbs/rfs?type=dev
