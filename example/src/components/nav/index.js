import React from 'react';
import PropTypes from 'prop-types';
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
  onUpdate: throttle(boundaries.fillBetween, 1),
};

const Nav = props => {
  const { items, onAddItemClick, onRemoveItemClick } = props;
  const { createBoundary } = useSticky(stickyNavConfig);

  return (
    <div className="nav">
      <div
        className="nav-wrapper"
        ref={createBoundary('sticky', { minHeight: 180 })}
      >
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

Nav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  onAddItemClick: PropTypes.func.isRequired,
  onRemoveItemClick: PropTypes.func.isRequired,
};

export { Nav };
