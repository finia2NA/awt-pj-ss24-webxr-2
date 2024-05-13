import { ReactNode } from 'react';

export interface RoundButtonProps {
  /**
   * The text that will be displayed on the button
   */
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const RoundButton = (props: RoundButtonProps) => {
  const { active, disabled, onClick } = props;
  const children = props.children;

  return (
    <button className={`font-bold px-4 rounded-full border-primary dark:border-dark-primary text-primary dark:text-dark-primary bg-buttonBG dark:bg-dark-buttonBG hover:border-primary hover:dark:border-dark-primary hover:scale-105 transition-transform
    ${active ? 'border-4' : 'border-1'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RoundButton;