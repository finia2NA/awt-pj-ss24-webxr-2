import { Container, Text } from "@react-three/uikit";
import { Button } from "./apfel/button";
import useColors from "../hooks/useColors";
import Backdrop from "./Backdrop";

export interface OnBGClickProps {
  index: number;
  option: string;
}

// Title, options, roundTop, roundBottom, selected: int, onClick
interface ButtonGroupProps {
  title: string;
  options: string[];
  roundTop?: boolean;
  roundBottom?: boolean;
  selected: number | string;
  // eslint-disable-next-line no-unused-vars
  onClick: ({ index, option }: OnBGClickProps) => void;
}


const ButtonGroup = ({ title, options, roundTop, roundBottom, selected, onClick }: ButtonGroupProps) => {

  const colors = useColors();

  return (
    <Backdrop borderTopRadius={roundTop ? 20 : undefined} borderBottomRadius={roundBottom ? 20 : undefined}>
      <Text
        color={colors.primary}
        fontSize={20}
        fontWeight={'normal'}
        width={100}
      >{title}</Text>
      <Container
        gap={10}
      >
        {options.map((option, key) => (
          <Container
            width={84}
            key={key}>
            <Button
              key={option}
              variant="pill"
              platter
              backgroundColor={colors.background}
              selected={
                typeof selected === 'number' ? options.indexOf(option) === selected : option.toLowerCase() === selected.toLowerCase()
              }
              onClick={() => onClick({ index: options.indexOf(option), option: option })}
            >
              <Text fontWeight={"medium"} fontSize={15} color={colors.primary} >{option}</Text>
            </Button>
          </Container>
        ))}
      </Container>
    </Backdrop>
  );
}

export default ButtonGroup;
