// load a PostCSS plugin
const plugin = require('..');

// update <style> after running its contents through a PostCSS plugin
const updateStyle = (style) => {
  plugin.process(style.textContent, {/* plugin options go here */}).then(
    (result) => {
      style.textContent = result.css;
    },
    console.error
  );
};

// update any pre-existing <style> in <head> using the PostCSS plugin
const styles = document.head.getElementsByTagName('style');

if (styles.length) {
  Array.prototype.forEach.call(styles, updateStyle);
}

// watch for and update any new <style> in <head> using the PostCSS plugin
(new MutationObserver(
  (mutations) => mutations.forEach(
    (mutation) => Array.prototype.filter.call(
      mutation.addedNodes || [],
      (node) => node.nodeName === 'STYLE'
    ).forEach(updateStyle)
  )
)).observe(
  document.head,
  {
    childList: true
  }
);
