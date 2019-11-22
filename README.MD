# React-Hook-Sticky

A modular starter hook for easy access development of sticky behavior.
Start to collaborate and share all kind of sticky strategies into single place, single hook and quick development.


## Demo

https://codesandbox.io/s/react-hook-sticky-ts0rb

## Install

    $ yarn add react-hook-sticky

## Quickstart

```jsx
// cart.js
import React from "react";
import { useSticky, fillBetween } from "react-hook-sticky";


const stickyConfig = {
  context: "my-sticky",
  onUpdate: throttle(fillBetween, 10)
};

export const Cart = props => {
  const { registerAs } = useSticky(stickyConfig);

  return (
    <div className="cart">
      <div className="cart-wrapper" ref={registerAs("sticky")}>
        <CartItems />
      </div>
    </div>
  );
};
```

```jsx
// other file
import React from "react";
import { useStickyContext } from "react-hook-sticky";

import { Cart } from '@components/cart';

export const Content = props => {
  const { registerAs } = useStickyContext('my-sticky');

  return (
    <div className="content">
      <header ref={registerAs('boundaryTop')}/>
      <Cart />
      <footer ref={registerAs('boundaryBottom')} />
    </div>
  );
};
```
