import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useStickyContext } from "react-hook-sticky";

import { Cart } from "./components/cart";

import "./styles.css";

function App() {
  const [items, addItems] = useState([1]);
  const { registerAs } = useStickyContext("cart");

  return (
    <div className="App">
      <header className="header" ref={registerAs("boundaryTop")}>
        header
      </header>
      <main className="main">
        <div className="content">content</div>
        <aside className="aside">
          <Cart
            items={items}
            onAddItemClick={() => addItems([...items, items.length + 1])}
            onRemoveItemClick={() => addItems(items.slice(1))}
          />
        </aside>
      </main>
      <footer className="footer" ref={registerAs("boundaryBottom")}>
        footer
      </footer>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
