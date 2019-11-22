import React from "react";
import { throttle } from "lodash-es";
import { useSticky, fillBetween } from "react-hook-sticky";

import "./cart-style.scss";

const Item = () => (
  <div role="listitem" className="cart-listitem">
    lorem ipsum
  </div>
);

const stickyCartConfig = {
  context: "cart",
  onUpdate: throttle(fillBetween, 10)
};

const Cart = props => {
  const { items, onAddItemClick, onRemoveItemClick } = props;
  const { registerAs } = useSticky(stickyCartConfig);

  return (
    <div className="cart">
      <div className="cart-wrapper" ref={registerAs("sticky")}>
        <div className="cart-header">cart</div>
        <button className="button" onClick={onAddItemClick}>
          Add item
        </button>
        <div className="cart-body">
          <div role="list" className="cart-list">
            {items.map(itm => (
              <Item key={itm} />
            ))}
          </div>
        </div>
        <div className="cart-footer">
          <button className="button" onClick={onRemoveItemClick}>button</button>
        </div>
      </div>
    </div>
  );
};

export { Cart };
