/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import React, { useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Canvas, useFrame } from '@react-three/fiber';
import { VRButton, XR } from '@react-three/xr';
import * as THREE from 'three';
import MyComponent from './MyComponent';

// Helper function to render the component to HTML and then to a canvas
const renderComponentToCanvas = async (componentHTML) => {
  const container = document.createElement('div');
  container.innerHTML = componentHTML;
  document.body.appendChild(container);

  const canvas = await html2canvas(container);
  document.body.removeChild(container);

  return canvas;
};

// Main component to render the React component in XR
const XRComponent = () => {
  const buttonRef = useRef(null);
  const meshRef = useRef();
  const textureRef = useRef();

  useEffect(() => {
    const renderComponent = async () => {
      const componentHTML = ReactDOMServer.renderToString(<MyComponent ref={buttonRef} />);

      // Temporarily render the component to find the button's position
      const container = document.createElement('div');
      container.innerHTML = componentHTML;
      document.body.appendChild(container);

      const button = buttonRef.current;
      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const buttonPosition = {
        x: buttonRect.left - containerRect.left,
        y: buttonRect.top - containerRect.top,
        width: buttonRect.width,
        height: buttonRect.height,
      };

      document.body.removeChild(container);

      // Render the component to a canvas
      const canvas = await renderComponentToCanvas(componentHTML);
      const texture = new THREE.CanvasTexture(canvas);

      if (textureRef.current) {
        textureRef.current.dispose();
      }

      textureRef.current = texture;

      if (meshRef.current) {
        meshRef.current.material.map = texture;
        meshRef.current.material.needsUpdate = true;
      }

      console.log('Button Position:', buttonPosition);
    };

    renderComponent();
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 1, -1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={textureRef.current} />
    </mesh>
  );
};

// Main XR App Component
const App = () => {
  return (<>
    <Canvas>
      <XR>
        <XRComponent />
      </XR>
    </Canvas>
    <VRButton />
  </>
  );
};

export default App;
