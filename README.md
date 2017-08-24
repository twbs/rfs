# RFS [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/rfs.svg
[npm-url]: https://npmjs.org/package/rfs

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


## About
RFS stands for Responsive Font-Size, easy to remember, easy to use. This approach **automatically calculates the correct font-size** for every screen width. You just have got to define your font-size for big screens and the font-size will automatically decrease for smaller screens. RFS is a **SCSS-mixin** which generates the responsive css for you.

## The main advantages of using RFS
- Font-sizes will rescale for every screen width, this prevents long words from being chopped off the screen
- Super easy to use, no need to define complex configurations for each font-size
- Font-sizes of all text-elements will always remain in relation with each other
- Rem-based font-sizes will allow the user to change his default font-size in his browser. People with limited vision can therefore set their font-size bigger to increase readability.

## How does it work?
The algorithm splits the calculation of the font-size in 2:

- 1 Static font-size for bigger screens
- 1 adaptive font-size which decreases when the screen-width of your browser decreases. This font-size is calculated in a media-query with css’ calc-function.
There are some configuration variables which can influence the font-size decreasing.

## The code
This input (SCSS):
```scss
.title {
  @include rfs(60);
}
```

Will generate this (CSS):
```css
.title {
  font-size: 3.75rem;
}

@media (max-width: 1200px) {
  .title {
    font-size: calc(1.35rem + 3.2vw); 
  }
}
```
## Live demo
http://codepen.io/MartijnCuppens/pen/ZBjdMy

## Bootstrap demo
https://www.intracto.com/bootstrap-with-rfs

## RFS explained in detail
https://blog.intracto.com/rfs-automated-scss-responsive-font-sizing
