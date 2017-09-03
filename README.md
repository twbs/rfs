# RFS [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/rfs.svg
[npm-url]: https://npmjs.org/package/rfs
RFS stands for Responsive Font-Size, easy to remember, easy to use. This approach **automatically calculates the correct font-size** for every screen width. You just have got to define your font-size for big screens and the font-size will automatically decrease for smaller screens. RFS is a **SCSS-mixin** which generates the responsive css for you.

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

You can download the RFS SCSS-file and save it in your `scss/` directory. This
method is not recommended because you lose the ability to easily and quickly
manage and update RFS as a dependency.


## Usage
This input (SCSS):
```scss
.title {
  @include rfs(62);
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

## Advantages
- Font sizes will **rescale for every screen width**, this prevents long words from being chopped off the screen
- **Super easy** to use, no need to define complex configurations for each font-size
- Font sizes of all text elements will always remain in relation with each other
- Rem-based font sizes will allow the user to change his default font size in his browser. People with limited vision can therefore increase their font size to increase readability.

## Configuration
![RFS visualisation](http://i.imgur.com/KpcsXUk.png)

There are configuration variables which influence the calculation of the font size. If no unit is used, `px`-units will be assumed as unit. In the graph above, `$rfs-minimum-font-size` is set to `12`, `$rfs-breakpoint` is set to `1200`, and `$rfs-factor` is set to `5`.

**$rfs-minimum-font-size:** (in `px` or `rem`)  
Font sizes which are calculated by RFS will never be lower than this size.
However, you can still pass a smaller font size to RFS, but then RFS won't dynamically scale this font size. For example (see graph above): `rfs(17)` will trigger dynamic rescaling, with `rfs(10)` it will just stay `10px` all the time.  
*Default value: `14px`*

**$rfs-minimum-font-size-unit:** (string)  
The font size will be rendered in this unit. Possible units are `px` and `rem`.   
*Default value: `px`*

**$rfs-breakpoint:** (in `px`, `em` or `rem`)  
This is the point where dynamic rescaling begins. Above this breakpoint, the font size will be equal to the font size you passed to the mixin.    
*Default value: `1200px`*

**$rfs-breakpoint-unit:** (string)  
The width of `$rfs-breakpoint` will be rendered in this unit. Possible units are `px`, `em` and `rem`.  
*Default value: `px`*

**$rfs-factor:** (number)  
This is the more complex part. If the font sizes would all resize to the same value when the screen width would be 0, there wouldn’t be a lot of difference between the font sizes on small screens. To prevent this, we brought the `$rfs-factor` to life.  
Let’s take an example from the graph above: The font size `rfs(47)` at a screen of `0px` is `19px` and not `16px` because of this factor. This minimum font size is calculated like this:

Calculate the difference between the font-size (47) and `$rfs-minimum-font-size` (12)  
`47 - 12 = 35`  

Divide this number by the `$rfs-factor` (5)  
`35 / 5 = 7`   

Add this number to $rfs-minimum-font-size (12)  
`7 + 12 = 19`  

The higher `$rfs-factor`, the less difference there is between font sizes on small screens. The lower `$rfs-factor`, the less influence RFS has, which results in bigger font sizes for small screens. If `$rfs-factor` is set to 1, there wouldn’t be any difference at all. 1 is the lowest possible value.  
*Default value: `5`*

##  Demos
- [Simple Codepen Demo](http://codepen.io/MartijnCuppens/pen/ZBjdMy)
- [RFS in bootstrap demo](http://martijncuppens.github.io/rfs)
