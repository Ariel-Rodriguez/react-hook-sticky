<div >
    <div align="left">
      <img src="https://img.shields.io/bundlephobia/minzip/react-hook-sticky?style=for-the-badge">
    </div>
    </br>
  <div align="left">
    <img src="https://img.shields.io/npm/v/react-hook-sticky?style=for-the-badge">
  </div>
    <p>
  <img src="https://img.shields.io/github/last-commit/Ariel-Rodriguez/react-hook-sticky?style=flat-square">
  <img src="https://img.shields.io/librariesio/dependent-repos/npm/react-hook-sticky?color=lightgreen&style=flat-square">
  <img src="https://img.shields.io/snyk/vulnerabilities/github/Ariel-Rodriguez/react-hook-sticky?style=flat-square">
</p>
</div>

<span><img src="https://image.flaticon.com/icons/svg/888/888914.svg" alt="ie 10" width="32"></span>
<span><img src="https://image.flaticon.com/icons/svg/888/888899.svg" alt="edge" width="32"></span>
<span><img src="https://image.flaticon.com/icons/svg/1177/1177512.svg" alt="firefox" width="32"></span>
<span><img src="https://image.flaticon.com/icons/svg/220/220603.svg" alt="chrome" width="32"></span>
<span><img src="https://image.flaticon.com/icons/svg/179/179337.svg" alt="safari" width="32"></span>

# React-Hook-Sticky

A lightweight modular starter hook for easy development of sticky behavior.
Start to collaborate and share all kind of sticky strategies, single hook and quick development.

## Demo

https://codesandbox.io/s/react-hook-sticky-ts0rb

## Install

\$ yarn add react-hook-sticky

## Quickstart

```jsx
// sticky-component.js
import React from 'react';
import { useSticky, fillBetween } from 'react-hook-sticky';

const stickyConfig = {
  context: 'my-sticky-1',
  onUpdate: throttle(fillBetween, 10),
};

export const StickyComponent = props => {
  const { registerAs } = useSticky(stickyConfig);

  return (
    <div className="sticky">
      <div className="sticky-wrapper" ref={registerAs('sticky')}>
        <StickyContent />
      </div>
    </div>
  );
};
```

```jsx
// other file
import React from 'react';
import { useStickyContext } from 'react-hook-sticky';

import { StickyComponent } from '@components/sticky-component';

export const App = props => {
  const { registerAs } = useStickyContext('my-sticky-1');

  return (
    <div className="content">
      <header ref={registerAs('boundaryTop')} />
      <Cart />
      <footer ref={registerAs('boundaryBottom')} />
    </div>
  );
};
```
