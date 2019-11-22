import React from 'react';
import { throttle } from 'lodash-es';
import { useSticky, boundaries } from 'react-hook-sticky';

import './nav-style.scss';

const Item = () => (
  <div role="listitem" className="nav-listitem">
    lorem ipsum
  </div>
);

const stickyNavConfig = {
  context: 'nav',
  onUpdate: throttle(boundaries.fillBetween, 10),
};

const Nav = props => {
  const { items, onAddItemClick, onRemoveItemClick } = props;
  const { registerAs } = useSticky(stickyNavConfig);

  return (
    <div className="nav">
      <div className="nav-wrapper" ref={registerAs('sticky')}>
        <div className="nav-header">nav</div>
        <button className="button" onClick={onAddItemClick}>
          Add item
        </button>
        <div className="nav-body">
          <div role="list" className="nav-list">
            {items.map(itm => (
              <Item key={itm} />
            ))}
          </div>
        </div>
        <div className="nav-footer">
          <button className="button" onClick={onRemoveItemClick}>
            button
          </button>
        </div>
      </div>
    </div>
  );
};

export { Nav };
