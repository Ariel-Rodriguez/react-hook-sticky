# React-Hook-Sticky

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
