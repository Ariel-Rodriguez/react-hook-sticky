import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Cart } from "./components/cart";
import { useStickyContext } from "./components/sticky";

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
            onAddItem={() => addItems([...items, items.length + 1])}
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
