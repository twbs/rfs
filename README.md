# RFS [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/rfs.svg
[npm-url]: https://npmjs.org/package/rfs

> RFS (abbreviation for responsive font size) is an algorithm which which **automatically calculates the appropriate font size** based on the dimensions of the monitor or device. It's available in 5 languages: [SCSS](http://sass-lang.com/), [Sass](http://sass-lang.com/), [PostCSS](http://postcss.org/), [Less](http://lesscss.org/) & [Stylus](http://stylus-lang.com/)

## Advantages
- Font sizes will **rescale for every screen or device**, this prevents long words from being chopped off the screen on mobile devices.
- The minimum font size (configuration variable) will prevent the font size from becoming too small so readability can
be assured.
- **Super easy** to use, no need to define complex configurations for each font size.
- Font sizes of all text elements will always remain in relation with each other.


![RFS](http://i.imgur.com/gJH6m6g.gif)

## Installation
RFS can be installed using a package manager (recommended):

**npm:**

```
$ npm install rfs --save
```

**yarn:**

```
$ yarn add rfs
```

**Bower:**

```
$ bower install rfs --save
```

**Copy/paste (not recommended):**

The source files can also be downloaded manually and used in a project. This method is not recommended because you
lose the ability to easily and quickly manage and update RFS as a dependency.


## Usage
This input:
```scss
.title {
  @include responsive-font-size(4rem);
  // OR:
  // @include responsive-font-size(64px);
  // OR:
  // @include responsive-font-size(64);
}
```

Will generate this (CSS):
```css
.title,
.disable-responsive-font-size .title,
.title.disable-responsive-font-size  {
  font-size: 4rem;
}

@media (max-width: 1200px) {
  .title {
    font-size: calc(1.6rem + 3.2vw);
  }
}
```
The `rfs()` can also be used alias instead of `responsive-font-size()`.


## Configuration

![RFS visualisation](https://i.imgur.com/9YciUbb.png)

**Minimum font size:** (in `px` or `rem`)  
> SCSS, Sass & Stylus: $rfs-minimum-font-size  
> Less: @rfs-minimum-font-size  
> PostCSS: minimumFontSize  

Font sizes which are calculated by RFS will never be lower than this size. However, you can still pass a smaller font
size to RFS, but then RFS won't dynamically scale this font size. For example: `responsive-font-size(19)` will trigger
dynamic rescaling, with `responsive-font-size(10)` it will just stay `10px` all the time.  
*Default value: `1rem`*

**$rfs-font-size-unit:** (string)  
The font size will be rendered in this unit. Possible units are `px` and `rem`.  
*Default value: `rem`*

**$rfs-breakpoint:** (in `px`, `em` or `rem`)  
Above this breakpoint, the font size will be equal to the font size you passed to the mixin; below the breakpoint, the
font size will dynamically scale.  
*Default value: `1200px`*

**$rfs-breakpoint-unit:** (string)  
The width of `$rfs-breakpoint` will be rendered in this unit. Possible units are `px`, `em` and `rem`.  
*Default value: `px`*

**$rfs-factor:** (number)  
This value determines the strength of font size resizing. The higher `$rfs-factor`, the less difference there is between
font sizes on small screens. The lower `$rfs-factor`, the less influence RFS has, which results in bigger font sizes for
small screens. `$rfs-factor` must me greater than 1, setting it to 1 will disable dynamic rescaling.  
*Default value: `5`*

**$rfs-two-dimensional** (Boolean)  
Enabling the two dimensional media queries will determine the font size based on the smallest side of the screen with
`vmin`. This prevents the font size from changing if the device toggles between portrait and landscape mode.  
*Default value: `false`*

**$rfs-generate-disable-classes** (Boolean)  
When the the disable classes are generated you can add the `.disable-responsive-font-size` class to an element to
disable responsive font sizes for the element and its child elements. If you don't use this, it's better to set this to
`false` to prevent the generation of unused css. This doesn't apply on font-sizes which are inherited from parents.  
*Default value: `true`*

## !important
By setting a second parameter to true, `!important` is added after the font-size value.

```scss
.label {
  @include responsive-font-size(2.5rem, true);
}
```

CSS:
```css
.label,
.disable-responsive-font-size .label,
.label.disable-responsive-font-size {
  font-size: 2.5rem !important;
}

@media (max-width: 1200px) {
  .label {
    font-size: calc(1.3rem + 1.6vw) !important;
  }
}
```

## But this generates a lot of css?
True. But with gzip or other compression enabled, the difference in file size is barely noticeable due the high amount
of repetitive strings. If you really want to minimize the amount of generated css, setting
`$rfs-generate-disable-classes` to `false` can make a difference (and lowers the global specificity).

## Known issues
Safari doesn't recalculate the value of vw in a calc()-function for font-sizes in iframes if the min-width, max-width or
width is not set in vw after the iframe is resized (edge case, but this is the case for Codepen demo's). Adding this
line will solve this (dirty fix):
```css
_::-webkit-full-page-media, _:future, :root * {min-width: 0vw;}
```

## Best practices
- Remember to set RFS on your font size of your `html` or `body`, otherwise some text may not dynamically rescale (if
`$rfs-minimum-font-size` is decreased). Note that setting RFS on `html` can influence the value of `rem`.
- Always set your line-heights relative (in `em` or unitless).
- More tips and tricks with examples can be found
[on this article](https://medium.com/@martijn.cuppens/magic-font-resizing-with-rfs-b5d781296dd6).

## Sass syntax
`.sass` file available in `sass/_rfs.sass`. Mixin can be used like this:
```sass
.title
+responsive-font-size($fs, $important)
```

##  Demos
- [Simple Codepen Demo](http://codepen.io/MartijnCuppens/pen/ZBjdMy)
- [RFS in bootstrap demo](http://martijncuppens.github.io/rfs)

# Creator
**Martijn Cuppens**
* <https://twitter.com/Martijn_Cuppens>
* <https://github.com/MartijnCuppens>

## Copyright and license
Code released under [the MIT license](https://github.com/twbs/bootstrap/blob/master/LICENSE). Docs released under [Creative Commons](https://github.com/twbs/bootstrap/blob/master/docs/LICENSE).
