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

A lightweight modular starter hook for easy development and enrich component with stickiness.
Start to collaborate and share your sticky strategy as performant as possible.

:warning: Currently in beta development and API may change soon.

Provide your ideas for better development experience or what would you like to improve.

## Demo

https://codesandbox.io/s/react-hook-sticky-ts0rb

## Roadmap

Would you like to contribute? Here are some nice to have ideas:

- [ ] Add sticky boundaries strategies and examples.
- [ ] Add development runtime invalidations for warning and error check.
- [ ] Create Wiki Page.
- [ ] Add unit test.
- [ ] Add E2E tests for IE and Chrome. (Probably Puppeter)
- [ ] Add E2E perfomance painting tests
- [ ] Configure CI (Probably Travis)
- [ ] Add code coverage and bundle size check.
- [ ] Add support for Horizontal scrolling / resizing

## Install

```bash
yarn add react-hook-sticky --exact
```

## Quickstart

```jsx
// sticky-component.js
import React from 'react';
// 1 - Import
import { useSticky, boundaries } from 'react-hook-sticky';

const stickyConfig = {
  // Define the context for this sticky, you may have many sticky elements.
  context: 'my-sticky-1',
  // 2 - Select the plugin to use (you may combine with throttling or wrap as your needs)
  onUpdate: throttle(boundaries.fillBetween, 10),
};

export const StickyComponent = props => {
  const { registerBoundary } = useSticky(stickyConfig);

  return (
    <div className="sticky">
      {/* 3 - Register the target to become sticky */}
      <div className="sticky-wrapper" ref={registerBoundary('sticky')}>
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
  // 4 - Add the target boundaries to your sticky context.
  const { registerBoundary } = useStickyContext('my-sticky-1');

  return (
    <div className="content">
      <header ref={registerBoundary('top')} />
      <StickyComponent />
      <footer ref={registerBoundary('bottom')} />
    </div>
  );
};
```

## Development

Contribute and create your own plug-in right away.

### Quick

- Fork demo https://codesandbox.io/s/react-hook-sticky-ts0rb
- Create your sticky logic

```jsx
// You may reuse common code and tools
import {
  fixBetween,
  useMomentum,
  getBoundingClientRect,
  setStyle,
} from 'react-hook-sticky/commons';

// Explode your creativity, create your new module sticky to later being integrated
export const stickyJumpDraft = (context, event) => {
  // Define the expected boundaries to find and check for actions
  const { sticky, top, bottom, jumpMe } = context.boundaries;
  const { isGoingDown } = useMomentum(event);
  const stickyEl = sticky.element;

  if (!sticky || !top || !bottom) {
    return;
  }
  const [topRect, bottomRect, stickyRect] = getBoundingClientRect([
    top.element,
    bottom.element,
    sticky.el,
  ]);

  // Sample logic. Here i just expect to find "jumpMe" registered boundaries, and check whenever the target has to jump these.
  let nextPosition = {};
  const touchingTo = jumpMe.find((candidate, idx) => {
    const touchingRect = candidate.getBoundingClientRect();

    if (isGoingDown) {
      if (stickyRect.bottom > touchingRect.top) {
        nextPosition = fixBetween(
          stickyRect,
          touchingRect || topRect,
          jumpMe[idx + 1] || bottomRect
        );
        return true;
      }
    } else {
      if (stickyRect.top < touchingRect.bottom) {
        nextPosition = fixBetween(
          stickyRect,
          jumpMe[idx - 1] || bottomRect,
          candidate || topRect
        );
        return true;
      }
    }
    return false;
  });

  setStyle(sticky, nextPosition);
};
```

- Implement in real time in your sandbox

```jsx
// 1 - Import your snippet
import { stickyJumpDraft } from './sticky-jump-draft';

import { useSticky } from 'react-hook-sticky';

const stickyConfig = {
  context: 'stickyJump',

  // 2 - Register it!
  onUpdate: stickyJumpDraft,
};

export const StickyComponent = props => {
  const { registerBoundary } = useSticky(stickyConfig);

  return (
    <section ref={registerBoundary('top')}>
      <div className="ad" ref={registerBoundary('sticky')} />
      {/* Registering boundaries all in one collection under stickyJump context */}
      <div className="block" ref={registerBoundary(['jumpMe'])} />
      <div className="block" ref={registerBoundary(['jumpMe'])} />
      <div className="block" ref={registerBoundary('bottom')} />
    </section>
  );
};
```

## How to develop local

### Setup

```bash
  git clone git@github.com:Ariel-Rodriguez/react-hook-sticky.git
  yarn
  # Link library
  yarn link
  # install and link library into example
  # any change done in library will be hor reloaded in example page.
  cd example && yarn && yarn link react-hook-sticky
```

### Run examples

```bash
  yarn start
```

## Share or contribute!
