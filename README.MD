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

# React hook sticky

Top performant lightweight solution for sticky components.
Start to collaborate and share your sticky plugin.

:warning: Beta version - creating an stable release soon.

Provide your ideas, feel free to contribute.

## Demo

https://codesandbox.io/s/react-hook-sticky-ts0rb

## Roadmap

Would you like to contribute? Here are some nice to have ideas:

- [ ] Add plugins.
- [ ] Storybook and examples.
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

#### Basic

```jsx
// sticky-component.js
import React from 'react';
// 1 - Import
import { useSticky, plugins } from 'react-hook-sticky';

const stickyConfig = {
  // Define the context for this sticky, you may have many sticky elements.
  context: 'my-sticky-1',
  // 2 - Select the plugin to use (you may combine with throttling or wrap as your needs)
  onUpdate: throttle(plugins.fillBetween, 10),
};

export const StickyComponent = props => {
  const { registerBoundary } = useSticky(stickyConfig);

  return (
    <div className="sticky-outer" ref={registerBoundary('outer')}>
      {/* 3 - Register the target to become sticky */}
      <div className="sticky" ref={registerBoundary('sticky')}>
        I am sticky between outer height or screen height
      </div>
    </div>
  );
};
```

#### Optional define specific boundaries

```jsx
export const StickyComponent = props => {
  const { registerBoundary } = useSticky(stickyConfig);

  return (
    <div className="sticky-outer">
      <h1 ref={registerBoundary('top')}>Top boundary</h1>
      {/* 3 - Register the target to become sticky */}
      <div className="sticky" ref={registerBoundary('sticky')}>
        I am sticky between top and bottom boundaries or screen height
      </div>
      <div ref={registerBoundary('bottom')}>Bottom boundary</div>
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
  useMomentum,
  getClampArea,
  createStyle,
  setInlineStyle,
} from '../commons';

// Explode your creativity, create your new module sticky to later being integrated
export const bunnyJump = (context, event) => {
  const { id: cacheKey, boundaries } = context;
  const stickyBoundary = boundaries.sticky;
  const clampArea = getClampArea(boundaries);

  if (!stickyBoundary || !clampArea.height) {
    return;
  }

  const nextPosition = {
    position: 'absolute',
    maxHeight: clampArea.height,
  };
  const { isGoingDown } = useMomentum(event);

  if (isGoingDown) {
    nextPosition.top = clampArea.top;
  } else {
    nextPosition.bottom = clampArea.bottom;
  }

  setInlineStyle(stickyBoundary, createStyle(nextPosition), cacheKey);
};
```

- Implement in real time in your sandbox

```jsx
// 1 - Import your snippet
import { bunnyJump } from './sticky-jump-draft';

import { useSticky } from 'react-hook-sticky';

const stickyConfig = {
  context: 'stickyJump',

  // 2 - Register it!
  onUpdate: bunnyJump,
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
