/* eslint-disable no-unused-vars */
import { Container, ComponentInternals } from "@react-three/uikit";
import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";

interface BottomBarProps {
  environmentControls?: boolean; // Optional flag to show environment controls
  environmentValue?: number; // Optional numeric value representing the environment state
  setEnvironmentValue?: (value: number) => void; // Optional function to update the environment value
  debugColoring?: boolean; // Optional flag for debugging by coloring components
  handleReference: React.RefObject<ComponentInternals>; // Reference to the component's internals
  dragHandlers: {
    onPointerDown: (event: ThreeEvent<PointerEvent>) => void; // Handler for pointer down event
    onPointerUp: (event: ThreeEvent<PointerEvent>) => void; // Handler for pointer up event
    onPointerMove: (event: ThreeEvent<PointerEvent>) => void; // Handler for pointer move event
  };
}

// Sizes for the environment indicator dot
const indicatorSizes = {
  minDotSize: 4,
  maxDotSize: 20,
};

export default function BottomBar({
  environmentControls, environmentValue, setEnvironmentValue, debugColoring,
  handleReference, dragHandlers: { onPointerDown, onPointerUp, onPointerMove }
}: BottomBarProps) {

  // State to track if the environment control is active (hovered)
  const [envControlIsActive, setEnvControlIsActive] = useState(false);

  // Calculate the current dot size based on the environment value
  const currentDotSize = environmentValue ? indicatorSizes.minDotSize + (indicatorSizes.maxDotSize - indicatorSizes.minDotSize) * environmentValue : 0;

  // Function to handle dynamic environment control click
  const onEnvControlClickDynamic = () => {
    if (environmentValue === undefined || setEnvironmentValue === undefined) return;

    // Adjust the environment value in steps of 0.2
    if (environmentValue < 1 && (environmentValue + 0.2) >= 1) {
      setEnvironmentValue(1);
    } else if (environmentValue >= 1 && (environmentValue + 0.2) > 1) {
      setEnvironmentValue(0);
    } else {
      setEnvironmentValue((environmentValue + 0.2) % 1);
    }
  };

  // Function to handle environment control click
  const onEnvControlClick = () => {
    if (environmentValue === undefined || setEnvironmentValue === undefined) return;

    // Toggle the environment value between 0 and 0.6
    if (environmentValue < 0.5) {
      setEnvironmentValue(0.6);
    } else {
      setEnvironmentValue(0);
    }
  };

  return (
    <Container
      width={180} height={30} gap={6}
      alignItems={"center"} justifyContent={"space-around"}
      backgroundColor={debugColoring ? "blue" : undefined}
    >
      {/* Environment Indicator */}
      {environmentControls &&
        <Container
          width={26} height={26} alignItems={"center"} justifyContent={"center"} marginRight={-26}
          backgroundColor={debugColoring ? "orange" : undefined}
        >
          {!envControlIsActive && environmentValue !== undefined &&
            <Container
              width={7} height={7} borderRadius={4} backgroundColor="white"
              onHoverChange={(hovered) => setEnvControlIsActive(hovered)}
            />
          }
          {envControlIsActive && environmentValue !== undefined &&
            <Container
              height={indicatorSizes.maxDotSize} width={indicatorSizes.maxDotSize} borderRadius={indicatorSizes.maxDotSize / 2} backgroundColor="white" padding={0}
              onHoverChange={(hovered) => setEnvControlIsActive(hovered)}
              alignItems={"center"} justifyContent={"center"}
              onClick={onEnvControlClick}
            >
              <Container
                width={currentDotSize} height={currentDotSize}
                minHeight={4} minWidth={4}
                borderRadius={10} backgroundColor="red" />
            </Container>
          }
        </Container>
      }
      {/* Main Bar */}
      <Container
        ref={handleReference}
        width={130} height={7} borderRadius={32} backgroundColor="white" hover={{ backgroundOpacity: 1 }}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove}
      />
    </Container>
  );
}
