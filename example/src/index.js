import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useSticky, useStickyContext, plugins } from 'react-hook-sticky';

import { Nav } from './components/nav';
import { Footer } from './components/footer';

import './styles.css';

const stickyContentConfig = {
  context: 'content',
  plugin: plugins.fillBetween,
};

function App() {
  const [items, addItems] = useState([1]);
  const [showNav, setShowNav] = useState(true);
  const { createBoundary } = useSticky(stickyContentConfig);
  const { createBoundary: createNavBoundary } = useStickyContext('nav');

  const handleShowNavClick = useCallback(() => {
    setShowNav(!showNav);
  }, [showNav]);

  return (
    <div className="App">
      <header className="header">header</header>
      <main className="main">
        <div className="content" ref={createBoundary('outer')}>
          content{' '}
          <button
            className="button"
            onClick={handleShowNavClick}
            ref={createBoundary('sticky')}
          >
            {showNav ? 'Hide nav' : 'show nav'}
          </button>
        </div>
        <aside className="aside" ref={createNavBoundary('outer')}>
          {showNav && (
            <Nav
              items={items}
              onAddItemClick={() => addItems([...items, items.length + 1])}
              onRemoveItemClick={() => addItems(items.slice(1))}
            />
          )}
        </aside>
      </main>
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
