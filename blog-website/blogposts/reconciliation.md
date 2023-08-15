---
title: "What is Reconciliation? How to create our own Reconciler?"
seoTitle: "Explaining Reconciliation process and creating a reconciler of our own"
seoDescription: "In the blog: What is Document Object Model? What is Virtual DOM? What is diffing? What is Reconciliation? How to create our own Reconciler?"
datePublished: Tue Jun 27 2023 17:31:27 GMT+0000 (Coordinated Universal Time)
cuid: cljeke3p8000009l7fkbdf4nn
slug: what-is-reconciliation-how-to-create-our-own-reconciler
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1688361325042/3bb81d78-fefd-4ba3-b2b3-026fc5e47943.png
tags: javascript, vuejs, reactjs, reconcilliation

---

The reconciliation process is used in various modern frontend JavaScript libraries and frameworks like React, Vue, Angular, Svelte etc. in some form or the other. We will learn about reconciliation and reconcilers in this article.

## Reconciliation

If you search for the dictionary meaning of the word reconciliation, you will get something like the following result:

> the action of making one view or belief compatible with another.

This is very similar to what happens in the frameworks mentioned above.

---

The web pages rendered on the browsers are represented using a hierarchal tree structure called **Document Object Model** (DOM). The DOM represents HTML/XML documents as nodes and objects so that, they can be accessed by any programming or scripting language(e.g. Javascript, Python) and necessary changes in the style, content and structure can be made easily.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1687852613604/0934fb32-cb54-4401-b0ea-33f78ce89477.png align="center")

Whenever we make some changes in the structure, style or content of the existing DOM, the DOM tree gets updated. To display this updated DOM in the browser, all the components are re-rendered, even the ones where there was no change. This updation process is very costly as even for a small change made in the span component in the above image, the entire DOM will re-render.

To tackle this issue, virtual DOMs were introduced. **Virtual DOM** is an exact copy of the real DOM but it cannot make any changes on the browser directly.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1687855228589/f6c19b08-4756-4cdf-8915-e76d08efe978.png align="center")

Now, if any changes are made, a snapshot of the virtual DOM is taken and a new virtual DOM with changes is created. Then, a comparison is made between the elements of the new virtual DOM and the snapshot all the while keeping track of the differences between the two. This comparison is done using diffing algorithm and the process is called **diffing**. Once it is determined, which part exactly has changed, only those objects are updated in the real DOM.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1687861597207/4c6d5ea0-fd19-43a8-9d4f-314ed3fabe96.png align="center")

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text"><strong>Reconciliation</strong> is the process of comparing the current and previous virtual DOMs and applying the necessary updates on the real DOM with a minimal set of required changes.</div>
</div>

---

## Reconciler

Now let's create a reconciler of our own using just HTML, CSS and JavaScript. Although creating a full-fledged reconciler is a complex task but we can create a reconciler for an app with a very specific use case.

The app we are going to create will populate a section of the browser with random coloured square blocks. We can add blocks, update the colour of the block and remove the block from the section.

First, let's create this app without keeping reconciliation in mind.

HTML: withoutReconciliation.html

```xml
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h2>App without Reconciliation</h2>
    <div id="main">
      <div id="app"></div>
    </div>
    <div id="buttonsSection">
      <button class="button" onclick="addBlock()">Add Block</button>
      <button class="button" onclick="updateBlock()">Update Block</button>
      <button class="button" onclick="removeBlock()">Remove Block</button>
      <a href="index.html"
        ><button id="linkButton">With Reconciliation &#x2197;</button></a
      >
    </div>

    <script src="withoutReconciliation.js"></script>
  </body>
</html>
```

JS: withoutReconciliation.js

```javascript
const appElement = document.getElementById("app");

function render() {
  appElement.innerHTML = "";
  blocks.forEach((block) => {
    const square = document.createElement("div");
    square.className = "square";
    square.id = block.id;
    square.style.backgroundColor = block.color;
    setTimeout(() => {
      appElement.appendChild(square);
    }, 500);
  });
}

function addBlock() {
  counter++;
  const id = `block${counter}`;
  const color = getRandomColor();
  blocks.push({ id, color });
  render();
}

function removeBlock() {
  const id = prompt("Enter the ID of the block to remove:");
  blocks = blocks.filter((block) => block.id !== id);
  render();
}

function updateBlock() {
  const id = prompt("Enter the ID of the block to update:");
  const color = prompt("Enter the new color for the block:");
  const block = blocks.find((block) => block.id === id);
  if (block) {
    block.color = color;
    render();
  } else {
    alert("Block not found!");
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let blocks = [];
let counter = 0;
render();
```

CSS: styles.css

```css
#main {
  display: flex;
  height: 60vh;
  width: 75vw;
  margin: 1vh auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 2rem;
  overflow-y: scroll;
}

#app {
  height: inherit;
  width: inherit;
  padding: auto;
}

.square {
  width: 6rem;
  height: 6rem;
  margin: 1rem;
  border-radius: 20px;
  display: inline-block;
}

.button {
  align-items: center;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(0.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
  margin-right: 3rem;
}

.button:hover,
.button:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

.button:hover {
  transform: translateY(-1px);
}

.button:active {
  background-color: #f0f0f1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}

#buttonsSection {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5vh;
  width: 75vw;
  margin: 20px auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  padding: 2rem;
}

h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  line-height: 1em;
  font-size: 50px;
  color: rgb(45, 45, 45);
  text-align: center;
  margin-bottom: 1rem;
}

#linkButton {
  font-family: "Montserrat", sans-serif;
  color: rgb(45, 45, 45);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.25rem;
  display: inline-flex;
  font-size: 16px;
  max-width: 20vw;
}
```

This app is deployed [here](https://reconciler.netlify.app/withoutreconciliation) and if you reproduce it on your system it should look like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1687880471157/9d96feee-2cba-4de7-9b7f-c863bd93d7ad.png align="center")

But how can you be sure that if you are adding a new block, all the blocks are re-rendering? There is something called `Paint Flashing` in Chrome dev tools which marks an area with green colour if it is re-rendered. To switch it on, open dev tools -&gt; options -&gt; More tools -&gt; Rendering -&gt; Check Paint Flashing option.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1687881032435/d7ded0cb-d746-4e7a-9609-c5cda1e3ba09.png align="center")

Now if you make any changes, you can notice the part which is re-rendering. And in the case of the app made above all the blocks re-render when any change is made because `render` function clears the `appElement` by setting its `innerHTML` to an empty string and then rebuilds the UI by iterating over the `blocks` array and creating `div` elements for each block.

---

We can improve the performance by avoiding unnecessary rendering of unchanged elements. To do this, we will store the state of the UI in an array, representing our virtual DOM. Function `renderBlock` will generate a new block and append it at the end of current state, instead of removing the state completely and re-rendering it. This function also handles the updation of the block's colour based on the 'id' provided.

This app is deployed [here](https://reconciler.netlify.app/) with the following JS:

```javascript
const appElement = document.getElementById("app");
let blocks = [];
let counter = 0;

function renderBlock(block) {
  const { id, color } = block;
  const existingBlock = document.getElementById(id);

  if (existingBlock) {
    existingBlock.style.backgroundColor = color;
  } else {
    const square = document.createElement("div");
    square.className = "square";
    square.id = id;
    square.style.backgroundColor = color;
    setTimeout(() => {
      appElement.appendChild(square);
    }, 500);
  }
}

function render() {
  blocks.forEach(renderBlock);
}

function addBlock() {
  counter++;
  const id = `block${counter}`;
  const color = getRandomColor();
  blocks.push({ id, color });
  renderBlock(blocks[blocks.length - 1]);
}

function removeBlock() {
  const id = prompt("Enter the ID of the block to remove:");
  blocks = blocks.filter((block) => block.id !== id);
  const blockElement = document.getElementById(id);
  if (blockElement) {
    blockElement.remove();
  } else {
    alert("Block not found!");
  }
}

function updateBlock() {
  const id = prompt("Enter the ID of the block to update (E.g. block1):");
  const color = prompt(
    "Enter the new color for the block (E.g. red, #FF5733):"
  );
  const block = blocks.find((block) => block.id === id);
  if (block) {
    block.color = color;
    renderBlock(block);
  } else {
    alert("Block not found!");
  }
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

render();
```

In this app, if you add a new block or update an existing one, only that will be highlighted by `Paint Flashing`. If you remove the block from the end, only that block part will flash, but if you remove the element from the front or somewhere in the middle, all the blocks after that will be re-rendered because the layout and position of the sibling nodes in the DOM tree have changed.

What makes this app better than the previous one:

* In each of the functions `addBlock()`, `removeBlock()` and `updateBlock()` we are focusing only on a single block and not the complete `appElement` .
    
* Although we generated unique ids for each block but we didn't use them actively to update or remove the block in the previous app.
    

Therefore, our updated app follows the reconciliation principles and performs better.

---

## Conclusion

**Reconciliation** is the process of comparing the current and previous virtual DOMs and applying the necessary updates on the real DOM with a minimal set of required changes. This process is used in various web frameworks and libraries to efficiently render UI components.

The reconciliation algorithm aims to optimize performance by minimizing the number of actual DOM manipulations required. Instead of re-rendering the entire component or subtree, our app only updates the specific elements that have changed. This approach helps in avoiding unnecessary computations and improving the overall efficiency of the rendering process.

The reconciler app made for this article can be accessed [here](https://reconciler.netlify.app/).

---