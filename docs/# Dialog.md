# Dialog

## Basic markup

```html
<dialog id="my-dialog" open>Hello, dialog</dialog>
```

## Opening programmatically

Lite modeless version, opens absolutely positioned in place(?)

```js
const dialog = document.querySelector("#my-dialog")

dialog.show()
```

Full modal version, opens fixed centered in viewport, highest z-index, manages inert, traps focus, listens to ESC, supports ::backdrop, but does **_not_** lock scroll

```js
const dialog = document.querySelector("#my-dialog")

dialog.showModal()
```

Detecting support

```js
if (typeof dialog.showModal === "function") {
  dialog.showModal()
} else {
  console.log("The <dialog> API is not supported by this browser")
}
```

## Scroll locking

```js
const dialog = document.querySelector("#my-diaslog")

dialog.showModal()

document.querySelector("html").classList.add("modal-is-open")
```

```css
html.modal-is-open {
  overflow: hidden;
}
```

## Styling

Varies across browsers, some `!important` might be needed too

```css
dialog {
  display: block !important;
  position: fixed !important;
  border: solid 1px #aaa !important;
  min-width: 80vw !important;
  width: 60ch;
  min-height: 80vh;
}
```

### Animating

The &lt;dialog **open**&gt; attribute is useful for styling open vs closed states.

May break other things, like accessibility tree, or restoring focus

```css
dialog {
  transition: all 0.4s !important;
}

dialog:not([open]) {
  bottom: 100vh !important;
}

dialog[open] {
  top: 0 !important;
}
```

### ::backdrop

```css
dialog::backdrop {
  background: #cccccccc;
}
```

## Embedded form and autofocus

Implicit behavior: buttons dismiss the modal and their `value` becomes the `returnValue` (?)

```html
<dialog id="my-dialog">
  <form method="dialog">
    <input id="data" name="data" placeholder="Enter data" />

    <!-- initial focus on least destructive element -->
    <button type="submit" (?) value="cancel" autofocus>Cancel</button>

    <button type="submit" (?) value="confirm">Confirm</button>
  </form>
</dialog>
```

Using dialog's `close` event

```js
dialog.addEventListener("close", function () {
  alert(dialog.returnValue)
})
```

Can also access fields like so

```js
dialog.addEventListener("close", function () {
  let data = document.getElementById("data").value
  alert(data)
})
```

## Dismiss on backdrop click

Not built in

```js
dialog.addEventListener("click", (event) => {
  const { clientX: x, clientY: y } = event
  const { top, right, bottom, left } = dialog.getBoundingClientRect()

  if (x < left || x > right || y < top || y > bottom) {
    dialog.close()
  }
})
```

## Further reading

https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog

https://webkit.org/blog/12209/introducing-the-dialog-element/

https://blog.logrocket.com/using-the-dialog-element/

https://web.dev/building-a-dialog-component/

https://markdotto.com/2022/03/16/dialog-element/

https://css-tricks.com/almanac/selectors/b/backdrop/
