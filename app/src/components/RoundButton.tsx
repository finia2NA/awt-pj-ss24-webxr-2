import { ReactNode } from 'react';

/**
 * Props for the RoundButton component.
 */
export interface RoundButtonProps {
  /**
   * The text that will be displayed on the button.
   */
  children: ReactNode;

  /**
   * Specifies whether the button is active or not.
   */
  active?: boolean;

  /**
   * Specifies whether the button is disabled or not.
   */
  disabled?: boolean;

  /**
   * Callback function that will be called when the button is clicked.
   */
  onClick?: () => void;
}

const RoundButton = (props: RoundButtonProps) => {
  const { active, disabled, onClick } = props;
  const children = props.children;

  return (
    // TODO: border should be 1 when inactive but hovered, this does not work for some reason
    <button className={`font-bold px-4 rounded-full  text-primary dark:text-dark-primary bg-buttonBG dark:bg-dark-buttonBG hover:border-primary hover:dark:border-dark-primary hover:scale-105 transition-transform
    focus:outline-none
    ${active ? 'border-4' : 'border-1 border-transparent hover:border-primary hover:dark:border-dark-primary'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}

    border-primary  dark:border-dark-primary
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RoundButton;