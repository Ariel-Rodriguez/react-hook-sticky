import React from 'react';

import { Lorem } from '../lorem';
import './footer-style.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="column">
        <Lorem />
      </div>
      <div className="column">
        <Lorem />
      </div>
    </footer>
  );
};

export { Footer };
