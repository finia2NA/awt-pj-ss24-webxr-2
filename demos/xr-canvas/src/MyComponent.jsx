/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  return (
    <div style={{ width: '200px', height: '200px', backgroundColor: 'lightblue' }}>
      <h1>Hello, XR!</h1>
      <button ref={ref}>Click Me</button>
    </div>
  );
})

MyComponent.displayName = 'MyComponent';

export default MyComponent;