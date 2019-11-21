import React from "react";

import { useSticky, stickyUpdateMethods } from "../sticky";

import "./cart-style.scss";

const Item = () => (
  <div role="listitem" className="cart-listitem">
    lorem ipsum
  </div>
);

const stickyCartConfig = {
  context: "cart",
  onUpdate: stickyUpdateMethods.fillBetween
};

const Cart = props => {
  const { registerAs } = useSticky(stickyCartConfig);
  const { items, onAddItem } = props;

  return (
    <div className="cart">
      <div className="cart-wrapper" ref={registerAs("sticky")}>
        <div className="cart-header">cart</div>
        <button className="button" onClick={onAddItem}>
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
          <button className="button">button</button>
        </div>
      </div>
    </div>
  );
};

export { Cart };
