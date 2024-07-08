import { Container, ComponentInternals } from "@react-three/uikit";
import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";


interface BottomBarProps {
  environmentControls?: boolean;
  environmentValue?: number;
  // eslint-disable-next-line no-unused-vars
  setEnvironmentValue?: (value: number) => void;
  debugColoring?: boolean;
  handleReference: React.RefObject<ComponentInternals>;
  dragHandlers: {
    onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
    onPointerUp: (event: ThreeEvent<PointerEvent>) => void;
    onPointerMove: (event: ThreeEvent<PointerEvent>) => void;
  };
}

const indicatorSizes = {
  minDotSize: 4,
  maxDotSize: 20,
}

export default function BottomBar({
  environmentControls, environmentValue, setEnvironmentValue, debugColoring,
  handleReference, dragHandlers: { onPointerDown, onPointerUp, onPointerMove }
}: BottomBarProps) {

  const [envControlIsActive, setEnvControlIsActive] = useState(false);

  const currentDotSize = environmentValue ? indicatorSizes.minDotSize + (indicatorSizes.maxDotSize - indicatorSizes.minDotSize) * environmentValue : 0;

  const onEnvControlClick = () => {
    if (environmentValue === undefined || setEnvironmentValue === undefined) return;

    // we could do this with %1:
    // >>> setEnvironmentValue?.((environmentValue + 0.2) % 1); <<<
    //  but the problem with that is that, for example, if the value was initialized as 0.5,
    // it is impossible to ever get to 100% or 0%.

    // Instead, we are going to do the following:
    // We check if we are coming from <1 and going to >1. in that case, we are setting to 1.
    // If we are >=1 and going >1, we are setting to 0.
    // Otherwise, we are just adding 0.2.
    if (environmentValue < 1 && (environmentValue + 0.2) >= 1) {
      setEnvironmentValue(1);
    } else if (environmentValue >= 1 && (environmentValue + 0.2) > 1) {
      setEnvironmentValue(0);
    } else {
      setEnvironmentValue((environmentValue + 0.2) % 1);
    }
  }


  return (
    <Container width={180} height={30} gap={6}
      alignItems={"center"} justifyContent={"space-around"}
      backgroundColor={debugColoring ? "blue" : undefined}
    >
      {/* The env incicator */}
      {environmentControls &&
        <Container width={26} height={26} alignItems={"center"} justifyContent={"center"} marginRight={-26}
          backgroundColor={debugColoring ? "orange" : undefined}
        >
          {!envControlIsActive && environmentValue !== undefined &&
            <Container width={7} height={7} borderRadius={4} backgroundColor="white"
              onHoverChange={(hovered) => setEnvControlIsActive(hovered)}
            />
          }
          {envControlIsActive && environmentValue !== undefined &&
            <Container height={indicatorSizes.maxDotSize} width={indicatorSizes.maxDotSize} borderRadius={indicatorSizes.maxDotSize / 2} backgroundColor="white" padding={0}
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
      {/* The bar */}
      <Container
        ref={handleReference}
        width={130} height={7} borderRadius={32} backgroundColor="white" hover={{ backgroundOpacity: 1 }}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove}
      />
    </Container>
  )
}