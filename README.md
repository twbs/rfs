# RFS [![npm][npm-image]][npm-url]

RFS (abbreviation for responsive font size) is an algorithm which **automatically calculates the appropriate font size** based on the dimensions of the browser viewport. It's available in 5 languages:

- [SCSS](https://sass-lang.com/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [Less](http://lesscss.org/)
- [Stylus](http://stylus-lang.com/)

## Advantages

- Font sizes will **rescale for every screen or device**, this prevents long words from being chopped off the viewport on small devices.
- The minimum font size (configuration variable) will prevent the font size from becoming too small so readability can be assured.
- **Super easy** to use, no need to define complex configurations for each font size.
- Font sizes of all text elements will always remain in relation with each other.


![RFS](http://i.imgur.com/gJH6m6g.gif)

## Installation

RFS can be installed using a package manager (recommended):

**npm:**

```sh
$ npm install rfs --save
```

**yarn:**

```sh
$ yarn add rfs
```

**Bower:**

```sh
$ bower install rfs --save
```

**Copy/paste (not recommended):**

The source files can also be downloaded manually and used in a project. This method is not recommended because you
lose the ability to easily and quickly manage and update RFS as a dependency.


## Usage

### SCSS

```scss
.title {
  @include responsive-font-size(4rem); // OR @include responsive-font-size(64px); OR @include rfs(64);
}
```

### Sass

```sass
.title
  +responsive-font-size(4rem) // OR +responsive-font-size(64px) OR +rfs(64)
```

### PostCSS

```postcss
.title {
  responsive-font-size: 4rem; // OR responsive-font-size: 64px; OR rfs: 64;
}
```

### Less

```less
.title {
  .responsive-font-size(4rem); // OR .responsive-font-size(64px); OR .rfs(64);
}
```

### Stylus

```stylus
.title
  responsive-font-size(4rem) // OR responsive-font-size(64px) OR rfs(64)
```

### Generated css

```css
.title {
  font-size: 4rem;
}

@media (max-width: 1200px) {
  .title {
    font-size: calc(1.6rem + 3.2vw);
  }
}
```

## Configuration

![RFS visualisation](https://i.imgur.com/yaOonFe.png)

### Minimum font size <sub><sup>(unit in `px` or `rem`)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-minimum-font-size`
* Less: `@rfs-minimum-font-size`
* PostCSS: `minimumFontSize`

The option will prevent the font size from becoming too small on smaller screens. If the font size which is passed to RFS is smaller than this minimum font size, no fluid font rescaling will take place.

* Default value: `1rem`

### Font size unit <sub><sup>(`px` or `rem`)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-font-size-unit`
* Less: `@rfs-font-size-unit`
* PostCSS: `fontSizeUnit`

The output font size will be rendered in this unit.

* Default value: `rem`

### Breakpoint <sub><sup>(in `px`, `em` or `rem`)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-breakpoint`
* Less: `@rfs-breakpoint`
* PostCSS: `breakpoint`

Above this breakpoint, the font size will be equal to the font size you passed to RFS; below the breakpoint, the font size will dynamically scale.

* Default value: `1200px`


### Breakpoint unit <sub><sup>(`px`, `em` or `rem`)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-breakpoint-unit`
* Less: `@rfs-breakpoint-unit`
* PostCSS: `breakpointUnit`

The width of the max width in the media query will be rendered in this unit.

* Default value: `px`


### Factor <sub><sup>(number)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-factor`
* Less: `@rfs-factor`
* PostCSS: `factor`

This value determines the strength of font size resizing. The higher the factor, the less difference there is between font sizes on small screens. The lower the factor, the less influence RFS has, which results in bigger font sizes for small screens. The factor must me greater than 1, setting it to 1 will disable dynamic rescaling.

* Default value: `5`


### Two dimensional <sub><sup>(boolean)</sup></sub>

> **SCSS, Sass & Stylus:** `$rfs-two-dimensional`
> **Less:** `@rfs-two-dimensional`
> **PostCSS:** `twoDimensional`

Enabling the two dimensional media queries will determine the font size based on the smallest side of the screen with `vmin`. This prevents the font size from changing if the device toggles between portrait and landscape mode.
*Default value: `false`*


### Class <sub><sup>(boolean)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-class`
* Less: `@rfs-class`
* PostCSS: `class`

RFS can be enabled or disabled with a class. There are 3 options:

- `disable`
  When the the disable classes are generated you can add the `.disable-responsive-font-size` class to an element to disable responsive font sizes for the element and its child elements.
- `enable`
  RFS is disabled by default in this case. The `.enable-responsive-font-size` class can be added to an element to enable responsive font sizes for the element and its child elements.
- `false`
  No extra classes are generated.

* Default value: `false`


### Safari iframe resize bug fix <sub><sup>(boolean)</sup></sub>

* SCSS, Sass & Stylus: `$rfs-safari-iframe-resize-bug-fix`
* Less: `@rfs-safari-iframe-resize-bug-fix`
* PostCSS: `safariIframeResizeBugFix`

Safari doesn't resize its font size in an iframe if the iframe is resized. To fix this `min-width: 0vw` can be added and that's what happens if this option is enabled. See [#14](https://github.com/twbs/rfs/issues/14).

* Default value: `false`


## !important

By setting a second parameter to true, `!important` is added after the font-size value. (Example is in `scss`)

```scss
.label {
  @include responsive-font-size(2.5rem, true);
}
```

CSS:

```css
.label {
  font-size: 2.5rem !important;
}

@media (max-width: 1200px) {
  .label {
    font-size: calc(1.3rem + 1.6vw) !important;
  }
}
```

## Best practices

- Remember to set RFS on your font size of your `html` or `body` (especially if the minimum font size is lowered), otherwise some text may not dynamically rescale. Note that setting RFS on `html` can influence the value of `rem`.
- Always set your line-heights relative (in `em` or unitless).
- More tips and tricks with examples can be found [here](https://medium.com/@martijn.cuppens/magic-font-resizing-with-rfs-b5d781296dd6) (written when only the SCSS version was made).

## Demos

- [Simple Codepen Demo](https://codepen.io/MartijnCuppens/pen/ZBjdMy)
- [RFS in bootstrap demo](https://martijncuppens.github.io/rfs)

## Creator

**Martijn Cuppens**

* <https://twitter.com/Martijn_Cuppens>
* <https://github.com/MartijnCuppens>

## Copyright and license

Code released under [the MIT license](https://github.com/twbs/rfs/blob/master/LICENSE).


[npm-image]: https://img.shields.io/npm/v/rfs.svg
[npm-url]: https://npmjs.org/package/rfs
