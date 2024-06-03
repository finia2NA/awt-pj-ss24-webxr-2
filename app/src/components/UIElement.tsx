import { ReactNode } from 'react';

/**
 * Props for the UIElement component.
 */
export interface UIElementProps {
  /**
   * The content of the UIElement.
   */
  children?: ReactNode;
  /**
   * Whether to round the top of the UIElement.
   */
  roundTop?: boolean;
  /**
   * Whether to round the bottom of the UIElement.
   */
  roundBottom?: boolean;

  /**
   * Whether to round the UIElement fully.
   */
  fullRound?: boolean;

  /**
   * Additional CSS class name for the UIElement.
   */
  className?: string;

  customColors?: string;

  onClick?: () => void;
}

const UIElement = ({ children, roundTop, roundBottom, fullRound, className, onClick, customColors }: UIElementProps) => {
  return (
    <div className={`${customColors ? customColors : 'bg-uiElem dark:bg-dark-uiElem'}
    text-primary dark:text-dark-primary
    p-4 pl-8 pr-8
    rounded-md
    ${roundTop ? (fullRound ? 'rounded-t-full' : 'rounded-t-2xl') : ''}
    ${roundBottom ? (fullRound ? 'rounded-b-full' : 'rounded-b-2xl') : ''}
    ` + className}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default UIElement;