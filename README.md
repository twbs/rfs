<p align="center">
  <img src="https://raw.githubusercontent.com/twbs/rfs/main/rfs.svg?sanitize=true" alt="RFS logo" width="99" height="108.6">
</p>

RFS is a unit resizing engine which was initially developed to resize font sizes (hence its abbreviation for Responsive Font Sizes). Nowadays RFS is capable of rescaling basically every value for any css property with units, like `margin`, `padding`, `border-radius` or even `box-shadow`.

The mechanism **automatically calculates the appropriate values** based on the dimensions of the browser viewport. It's available in one of your favourite preprocessors or postprocessor: [Sass](https://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/) or [PostCSS](https://postcss.org/).

# RFS

[![npm][npm-image]][npm-url]
[![licence][licence-image]][license-url]
[![build][build-image]][build-url]

- [Demos](#demos)
- [Advantages](#advantages)
- [Installation](#installation)
- [Usage](#usage)
- [Visualisation](#visualisation)
- [Configuration](#configuration)
- [Creator](#creator)
- [Copyright and license](#copyright-and-license)

## Demos

- [Card example (Sass)](https://codepen.io/MartijnCuppens/pen/vqaEBG?editors=0100)
- [Card example (Sass, with custom properties)](https://codepen.io/MartijnCuppens/pen/voXLGL?editors=1100)
- [Card example (PostCSS)](https://codepen.io/MartijnCuppens/pen/aeojgG?editors=0100)
- [Card example (PostCSS, with custom properties)](https://codepen.io/MartijnCuppens/pen/JgRYaw?editors=0100)
- [Simple font rescaling Codepen Demo](https://codepen.io/MartijnCuppens/pen/ZBjdMy?editors=0100)
- [RFS in Bootstrap demo](https://project-rfs.github.io/)

## Advantages

- No need to rescale paddings or margins anymore.
- Text won't be chopped off in smaller viewports when RFS is applied to font sizes.
- RFS will prevent the font size from rescaling too small, so readability can be assured.
- The font sizes of all text elements will always remain in relation with each other.

## Fluid rescaling in action

The following example shows the effect of RFS on font sizes:

![RFS](https://raw.githubusercontent.com/twbs/rfs/main/.github/rfs-rescale.gif)

## Installation

RFS can be installed using a package manager (recommended):

- npm: `npm install rfs`
- yarn: `yarn add rfs`
- bower (deprecated): `bower install rfs --save`

**Copy/paste (not recommended):**

The source files can also be downloaded manually and used in a project. This method is not recommended because you
lose the ability to easily and quickly manage and update RFS as a dependency.

## Usage

### Sass (<code>.scss</code> syntax)

```text
project/
├── node_modules/
│   └── rfs
│        └── ...
└── scss/
    └── main.scss
```

#### Input

```scss
// scss/main.scss

@import "../node_modules/rfs/scss";

.title {
  @include font-size(4rem);

  // The font-size mixin is a shorthand which calls
  // @include rfs(4rem, font-size);

  // Other shorthand mixins that are available are:
  // @include padding(4rem);
  // @include padding-top(4rem);
  // @include padding-right(4rem);
  // @include padding-bottom(4rem);
  // @include padding-left(4rem);
  // @include margin(4rem);
  // @include margin-top(4rem);
  // @include margin-right(4rem);
  // @include margin-bottom(4rem);
  // @include margin-left(4rem);

  // For properties which do not have a shorthand, the property can be passed:
  // @include rfs(4rem, border-radius);

  // Whenever a value contains a comma, it should be escaped with `#{}`:
  // @include rfs(0 0 4rem red #{","} 0 0 5rem blue, box-shadow);

  // Custom properties (css variables):
  // @include rfs(4rem, --border-radius);
}
```

If you're using Webpack, you can simplify the `@import` using the `~` prefix:

```scss
@import "~rfs/scss";
```

#### Generated css

```css
.title {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;
  }
}
```

#### !important usage

##### Input

```scss
.label {
  @include font-size(2.5rem !important);
}
```

##### Output

```css
.label {
  font-size: calc(1.375rem + 1.5vw) !important;
}

@media (min-width: 1200px) {
  .label {
    font-size: 2.5rem !important;
  }
}
```

### Sass (`.sass` syntax)

```text
project/
├── node_modules/
│   └── rfs
│        └── ...
└── sass/
    └── main.sass
```

#### Input

```sass
// sass/main.sass

@import "../node_modules/rfs/sass"

.title
  +font-size(4rem)

  // The font-size mixin is a shorthand which calls
  // +rfs(4rem, font-size)

  // Other shorthand mixins that are available are:
  // +padding(4rem)
  // +padding-top(4rem)
  // +padding-right(4rem)
  // +padding-bottom(4rem)
  // +padding-left(4rem)
  // +margin(4rem)
  // +margin-top(4rem)
  // +margin-right(4rem)
  // +margin-bottom(4rem)
  // +margin-left(4rem)

  // For properties which do not have a shorthand, the property can be passed:
  // +rfs(4rem, border-radius)

  // Whenever a value contains a comma, it should be escaped with `#{}`:
  // +rfs(0 0 4rem red #{","} 0 0 5rem blue, box-shadow)

  // Custom properties (css variables):
  // +rfs(4rem, --border-radius)
```

If you're using Webpack, you can simplify the `@import` using the `~` prefix:

```sass
@import "~rfs/scss"
```

#### Generated css

```css
.title {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;
  }
}
```

#### !important usage

##### Input

```sass
.label
  +font-size(2.5rem !important)
```

#### output

```css
.label {
  font-size: calc(1.375rem + 1.5vw) !important;
}

@media (min-width: 1200px) {
  .label {
    font-size: 2.5rem !important;
  }
}
```

### PostCSS

```text
project/
├── postcss/
│   └── main.css
└── node_modules/
    └── rfs
         └── ...
```

Have a look at the [examples folder](https://github.com/twbs/rfs/tree/main/examples/postcss) to find examples on how your PostCSS setup can be configured.

```postcss
// postcss/main.css

.title {
  font-size: rfs(4rem);

  // Or use it with any other property, for example
  // padding: rfs(4rem);

  // It's also possible to pass multiple values
  // padding: rfs(3rem 4rem);

  // or even
  // box-shadow: rfs(0 3px 4rem red);

  // or even comma seperated values
  // box-shadow: rfs(0 3px 4rem red, 3px 0 4rem blue);

  // To combine it with !important, use
  // box-shadow: rfs(0 3px 4rem red) !important;

  // Custom properties (css variables):
  // --border-radius: rfs(4rem);
}
```

#### Generated css

```css
.title {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;
  }
}
```

### Less

```text
project/
├── less/
│   └── main.less
└── node_modules/
    └── rfs
         └── ...
```

```less
// less/main.less

@import "../node_modules/rfs/less";

.title {
  .font-size(4rem);

  // The font-size mixin is a shorthand which calls
  // .rfs(4rem, font-size);

  // Other shorthand mixins that are available are:
  // .padding(4rem);
  // .padding-top(4rem);
  // .padding-right(4rem);
  // 'padding-bottom(4rem);
  // .padding-left(4rem);
  // .margin(4rem);
  // .margin-top(4rem);
  // .margin-right(4rem);
  // .margin-bottom(4rem);
  // .margin-left(4rem);

  // For properties which do not have a shorthand, the property can be passed as:
  // .rfs(4rem, border-radius);

  // Whenever a value contains a comma, it should be escaped with a tilde(~):
  // .rfs(0 0 4rem red ~"," 0 0 5rem blue, box-shadow)

  // Custom properties (css variables):
  // .rfs(4rem, --border-radius)
}
```

If you're using Webpack, you can simplify the `@import` using the `~` prefix:

```less
@import "~rfs/less"
```

#### Generated css

```css
.title {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;
  }
}
```

#### !important usage

Less still has [a bug](https://github.com/less/less.js/issues/2917) for [native `!important` support](http://lesscss.org/features/#mixins-feature-the-important-keyword), and `!important` can not be accepted as a parameter, so you 'll need to pass `important` as a flag:

##### Input

```less
.label {
  .font-size(2.5rem important);
}
```

#### output

```css
.label {
  font-size: calc(1.375rem + 1.5vw) !important;
}

@media (min-width: 1200px) {
  .label {
    font-size: 2.5rem !important;
  }
}
```

### Stylus

```text
project/
├── node_modules/
│   └── rfs
│        └── ...
└── stylus/
    └── main.styl
```

```stylus
// stylus/main.styl

@import "../node_modules/rfs/stylus";

.title
  rfs-font-size(64px)

  // The font-size mixin is a shorthand which calls
  // rfs(4rem, font-size)

  // Other shorthand mixins that are available are:
  // rfs-padding(4rem)
  // rfs-padding-top(4rem)
  // rfs-padding-right(4rem)
  // rfs-padding-bottom(4rem)
  // rfs-padding-left(4rem)
  // rfs-margin(4rem)
  // rfs-margin-top(4rem)
  // rfs-margin-right(4rem)
  // rfs-margin-bottom(4rem)
  // rfs-margin-left(4rem)

  // For properties which do not have a shorthand, the property can be passed as:
  // rfs(4rem, border-radius)

  // Whenever a value contains a comma, it should be escaped with a backslash:
  // rfs(0 0 4rem red \, 0 0 5rem blue, box-shadow)

  // Custom properties (css variables):
  // rfs(4rem, --border-radius)
```

Note the `font-size` mixin can not be used to set the font size. That is because a `font-size()` mixin would override the `font-size` property. See [129#issuecomment-477926416](https://github.com/twbs/rfs/pull/129#issuecomment-477926416) for more info.

If you're using Webpack, you can simplify the `@import` using the `~` prefix:

```stylus
@import "~rfs/stylus"
```

#### Generated css

```css
.title {
  font-size: calc(1.525rem + 3.3vw);
}

@media (min-width: 1200px) {
  .title {
    font-size: 4rem;
  }
}
```

#### !important usage

##### Input

```less
.label
  rfs-font-size(2.5rem important)
```

#### output

```css
.label {
  font-size: calc(1.375rem + 1.5vw) !important;
}

@media (min-width: 1200px) {
  .label {
    font-size: 2.5rem !important;
  }
}
```

## Visualisation

If you wonder how the values are rescaled, wonder no more and stare at this graph which might clarify things a bit:

![RFS visualisation](https://raw.githubusercontent.com/twbs/rfs/main/.github/rfs-graph.svg?sanitize=true)

Each color represents another value being rescaled. For example:

```scss
.title {
  @include font-size(40px);
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

### Breakpoint unit <sub><sup>(`px`, `em` or `rem`)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-breakpoint-unit`
- Less: `@rfs-breakpoint-unit`
- PostCSS: `breakpointUnit`

The width of the max width in the media query will be rendered in this unit.

*Default value: `px`*

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

Enabling the two dimensional media queries will determine the value based on the smallest side of the screen with `vmin`. This prevents values from changing if the device toggles between portrait and landscape mode.

*Default value: `false`*

### Class <sub><sup>(boolean)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-class`
- Less: `@rfs-class`
- PostCSS: `class`

RFS can be enabled or disabled with a class. There are 3 options:

- `false`
  No extra classes are generated.
- `disable`
  When the the disable classes are generated you can add the `.disable-rfs` class to an element to disable responsive value rescaling for the element and its child elements.
- `enable`
  RFS is disabled by default in this case. The `.enable-rfs` class can be added to an element to enable responsive value rescaling for the element and its child elements.

*Default value: `false`*

### Safari iframe resize bug fix <sub><sup>(boolean)</sup></sub>

- SCSS, Sass & Stylus: `$rfs-safari-iframe-resize-bug-fix`
- Less: `@rfs-safari-iframe-resize-bug-fix`
- PostCSS: `safariIframeResizeBugFix`

Safari doesn't resize its values in an iframe if the iframe is resized. To fix this `min-width: 0vw` can be added and that's what happens if this option is enabled. See [#14](https://github.com/twbs/rfs/issues/14).

*Default value: `false`*

## Best practices

- Don't set RFS on the `html` element, because this influences the value of `rem` and could lead to unexpected results.
- Always set your line-heights relative (in `em` or unitless) to prevent interline issues with font sizes.

## Browser support

RFS is supported by all browsers that support [media queries](https://caniuse.com/#feat=css-mediaqueries) and [viewport units](https://caniuse.com/#feat=viewport-units).

## Creator

**Martijn Cuppens**

- <https://twitter.com/Martijn_Cuppens>
- <https://github.com/MartijnCuppens>

## Copyright and license

Code released under [the MIT license](https://github.com/twbs/rfs/blob/main/LICENSE).

[npm-image]: https://img.shields.io/npm/v/rfs?logo=npm&logoColor=fff
[npm-url]: https://www.npmjs.com/package/rfs
[licence-image]: https://img.shields.io/npm/l/rfs
[license-url]: https://github.com/twbs/rfs/blob/main/LICENSE
[build-image]: https://img.shields.io/github/actions/workflow/status/twbs/rfs/test.yml?branch=main&label=Tests&logo=github
[build-url]: https://github.com/twbs/rfs/actions?query=workflow%3ATests+branch%3Amain
