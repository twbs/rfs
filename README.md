# RFS [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/rfs.svg
[npm-url]: https://npmjs.org/package/rfs
RFS stands for Responsive Font-Size and is an easy to use **SCSS-mixin** which **automatically calculates the 
appropriate font-size** based on the dimensions of the monitor or device.


## Advantages
- Font sizes will **rescale for every screen width**, this prevents long words from being chopped off the screen on 
mobile devices.
- The minimum font size will prevent the font-size from becoming too small so readability can be assured.
- **Super easy** to use, no need to define complex configurations for each font-size.
- Font sizes of all text elements will always remain in relation with each other.


![RFS](http://i.imgur.com/gJH6m6g.gif)

## Instalation
You can use RFS in your project by installing it using a package manager (recommended):

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

You can download the RFS SCSS-file and save it in your `scss/` directory. This method is not recommended because you 
lose the ability to easily and quickly manage and update RFS as a dependency.


## Usage
This input (SCSS):
```scss
.title {
  @include font-size(62);
}
```

Will generate this (CSS):
```css
.title {
  font-size: 62px;
}

@media (max-width: 1200px) {
  .title {
    font-size: calc(23.6px + 3.2vw);
  }
}
```
In this case a value without unit was passed to the mixin (`62`), which is interpreted as `62px`. It's also possible to 
pass font-sizes in rem-units. Since v5.0.0 `font-size()` is added as an alias for `rfs()`.


## Configuration

![RFS visualisation](https://i.imgur.com/9t4gAzE.png)

There are configuration variables which influence the calculation of the font size. In the graph above the default 
configuration is used.

**$rfs-minimum-font-size:** (in `px` or `rem`)  
Font sizes which are calculated by RFS will never be lower than this size. However, you can still pass a smaller font 
size to RFS, but then RFS won't dynamically scale this font size. For example (see graph above): `font-size(19)` will 
trigger dynamic rescaling, with `font-size(10)` it will just stay `10px` all the time.  
*Default value: `14px`*

**$rfs-minimum-font-size-unit:** (string)  
The font size will be rendered in this unit. Possible units are `px` and `rem`.   
*Default value: `px`*

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

## Best practices
- Remember to set RFS on your font-size of your `html` or `body`, otherwise some text may not dynamically rescale. Note
that setting RFS on `html` will influence the value of `rem`.
- Always set your line-heights relative (in `em` or unitless).
- More tips and tricks with examples can be found
[on this article](https://medium.com/@martijn.cuppens/magic-font-resizing-with-rfs-b5d781296dd6).

##  Demos
- [Simple Codepen Demo](http://codepen.io/MartijnCuppens/pen/ZBjdMy)
- [RFS in bootstrap demo](http://martijncuppens.github.io/rfs)
