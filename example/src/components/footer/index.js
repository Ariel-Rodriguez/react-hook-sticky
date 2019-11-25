import React from 'react';
import { throttle } from 'lodash-es';
import { useSticky, boundaries } from 'react-hook-sticky';

import { Lorem } from '../lorem';
import './footer-style.scss';

const stickyFooterConfig = {
  context: 'footer',
  onUpdate: throttle(boundaries.bunnyJump, 16),
};

const Footer = () => {
  const { createBoundary: createFooterBoundary } = useSticky(
    stickyFooterConfig
  );

  return (
    <footer className="footer" ref={createFooterBoundary('outer')}>
      <div className="column">
        {/* <div ref={createFooterBoundary('sticky')}>Sticky</div> */}
        <Lorem />
      </div>
      <div className="column">
        {/* <div ref={createFooterBoundary('sticky')}>Sticky</div> */}
        <Lorem />
      </div>
    </footer>
  );
};

export { Footer };
