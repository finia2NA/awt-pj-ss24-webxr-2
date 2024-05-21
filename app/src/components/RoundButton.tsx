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

  /**
   * Adds a custom class to the button.
   */
  className?: string;
}

const RoundButton = (props: RoundButtonProps) => {
  const { active, disabled, onClick, className } = props;
  const children = props.children;
  console.log(className)

  return (
    <button className={`font-semibold px-4 rounded-full  text-primary dark:text-dark-primary bg-buttonBG dark:bg-dark-buttonBG hover:border-primary hover:dark:border-dark-primary hover:scale-105 transition-transform
    focus:outline-none
    ${active ? 'border-2 border-primary dark:border-dark-primary' : 'border-transparent hover:border-primary hover:dark:border-dark-primary'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ` + className}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
}

export default RoundButton;

// Always have border:
/*
return (
    <button className={`font-semibold px-4 rounded-full  text-primary dark:text-dark-primary bg-buttonBG dark:bg-dark-buttonBG hover:border-primary hover:dark:border-dark-primary hover:scale-105 transition-transform
    focus:outline-none
    ${active ? 'border-2' : 'border-transparent hover:border-primary hover:dark:border-dark-primary'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    border-primary  dark:border-dark-primary
    ` + className}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </button>
  );
  */