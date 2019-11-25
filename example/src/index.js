import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useStickyContext } from 'react-hook-sticky';

import { Nav } from './components/nav';
import { Footer } from './components/footer';

import './styles.css';

function App() {
  const [items, addItems] = useState([1]);
  const { createBoundary: createNavBoundary } = useStickyContext('nav');

  return (
    <div className="App">
      <header className="header">header</header>
      <main className="main">
        <div className="content">content</div>
        <aside className="aside" ref={createNavBoundary('outer')}>
          <Nav
            items={items}
            onAddItemClick={() => addItems([...items, items.length + 1])}
            onRemoveItemClick={() => addItems(items.slice(1))}
          />
        </aside>
      </main>
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
