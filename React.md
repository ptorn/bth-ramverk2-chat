React
==================

## About React

React is a JavaScript library that is used for handling views and building user interfaces. React was created by Jordan Walk (Software engineer) at Facebook. It has a very big community around it self which has helped React growing and gaining popularity. Its maintained by Facebook, Instagram and the whole community around React. React is growing much faster than the other librarys and 2018 seems to be the year of React.

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

One of the biggest pros about React is that it uses something called a VirtualDOM (virtual Document Object Model). What that actually means is that React creates a virtual representation of the DOM tree in the memory. When changes are made to the Virtual DOM React analyses and add all the differences from the components and force a re-render of the new data to the DOM. This is done without reloading the entire DOM-tree for every little change. This feature makes React a great choice for a SPA (Single Page Application). This way saves a lot of time since a full reload of a DOM-tree takes a lot more time compared to how React does it with the Virtual DOM.

### Components

Another great feature of React is how it uses components. By using components React lets you reuse data in a very effective way. You could simply pass in a property to a component and the component would do the work and create elements to be rendered. An example would be a component for last 5 blog-posts. We create a component that takes a property. The component creates the elements and returns them or render if it has it's own render method.
Then every time we would need to output the last 5 blog-posts we could simply reuse the same component over and over. When ever the properties change and a re-render is called the component will be updated to the DOM automatically.

Here is a example of a small component that I used in my application for Gomoku. This is for one of the squares on the board. The component gets properties from the parent component that calls for this component. It receives from the parent component that has a state. When that state changes the properties it forces a re-render and that will cause this component to update itself and re-render in the DOM. That could be when a player places a token so the parent components state changes causing this component to update it self with new data placing the token as value.

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

Components that extends React.Componets comes with different life-cycle methods that help you run code at different times in the process of ur component.

A example would be `componentDidMount()` which by the name is fired up after the component have been mounted.

#### State

A component can have its own state. In the state property is used to store data that you are going to render. If the data doesn't render then it shouldn't be in the view. When state is updated React will trigger a re-render and update the view. A component doesn't have to have a state of its own. It could use its parent component state as props that are being passed into the component like the example above and be updated on a re-render.

### Open-source

The fact that it is open-source and has a very active community helps React gaining more and more popularity.

## Author

This article is written by Peder Tornberg

## Sources

[React (JavaScript library)](https://en.wikipedia.org/wiki/React_(JavaScript_library))
[Top JavaScript Libraries & Tech to Learn in 2018](https://medium.com/javascript-scene/top-javascript-libraries-tech-to-learn-in-2018-c38028e028e6)
[JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)
[React Component](https://reactjs.org/docs/react-component.html)