React
==================

## About React

React is a JavaScript library that is used for handling views and building user interfaces. React was created by Jordan Walk (Software engineer) at Facebook. It has a very big community around itself which has helped React grow and gain popularity. It's maintained by Facebook, Instagram and the whole community surrounding React. React is growing much faster than the other libraries. It seems like 2018 will be the year of React.

React uses JSX as a syntax layer for creating elements. It makes writing the views much more easier and looks a bit like HTML. The JSX code gets compiled to JavaScript. Ex:

```JavaScript
<SendButton color="blue" shadowSize={2}>
    Send
</SendButton>

// Compiles to

React.createElement(
    SendButton,
    {color: 'blue', shadowSize: 2},
    'Send'
)
```

## Why React?

### VirtualDOM

One of the biggest pros about React is that it uses something called a VirtualDOM (Virtual Document Object Model). What this actually means is that React creates a virtual representation of the DOM-tree in the memory. When changes are made to the VirtualDOM, React analyses and adds all the differences from the components and also forces a re-render of the new data to the DOM. This is done without reloading the entire DOM-tree for every minor change. This feature makes React a great choice for a SPA (Single-Page-Application). This way saves a lot of time since a full reload of a DOM-tree takes a lot more time compared to how React does it with the Virtual DOM.

### Components

Another great feature of React is how it uses components. By using components React lets you reuse data in a very effective way. You could simply pass a property to a component. Then the component would do the work and create the elements to be rendered.

An example would be a component for the last 5 blog-posts. We create a component that takes a property. The component creates the elements and returns or render them if it has it's own render method. Then every time we would need to output the last 5 blog-posts we could simply reuse the same component repeatedly. Whenever the properties change and a re-render is called, the component will be updated to the DOM automatically.

Here is an example of a small component that I used in my application for Gomoku. This is for one of the squares on the board. The component gets properties from the parent component when called upon. When the parent component state changes the properties it forces a re-render and that will cause this component to update itself and re-render in the DOM. That could be when a player places a token causing the parent components state to change eventually causing this component to update itself with new data placing the token as value.

```JSX
import React from "react";
const Square = (props) => {
    return (
        <td id={props.id} className="marker-square" onClick={() => props.callback(props.id)}>
            {props.value}
        </td>
    );
};
```

Components that extend React.Componets comes with different life-cycle methods that help you run code at different times in the process of ur component.

A example would be `componentDidMount()` which by the name is fired up after the component has been mounted.

#### State

A component can have its own state. The state property is used to store data that you are going to render. If the data doesn't render then it shouldn't be in the state. When the state is updated React will trigger a re-render and update the view. A component doesn't have to have a state of its own. It could use its parent component state as props that are being passed into the component, like the example above, and be updated on a re-render.

### Open-source

The fact that React is open-source and has a very active community helps it gain more and more popularity.

## Author

This article is written by Peder Tornberg.

## Sources

[React (JavaScript library)](https://en.wikipedia.org/wiki/React_(JavaScript_library))
[Top JavaScript Libraries & Tech to Learn in 2018](https://medium.com/javascript-scene/top-javascript-libraries-tech-to-learn-in-2018-c38028e028e6)
[JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
[React Component](https://reactjs.org/docs/react-component.html)