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

  // Conflicts with fullRound
  // TODO: unify all the round props
  noRound?: boolean;

  /**
   * Additional CSS class name for the UIElement.
   */
  className?: string;

  customColors?: string;

  onClick?: () => void;
}

const UIElement = ({ children, roundTop, roundBottom, fullRound, noRound, className, onClick, customColors }: UIElementProps) => {
  const roundingClasses = noRound
    ? ''
    : `${roundTop ? (fullRound ? 'rounded-t-full' : 'rounded-t-2xl') : ''}
       ${roundBottom ? (fullRound ? 'rounded-b-full' : 'rounded-b-2xl') : ''}
       ${!roundTop && !roundBottom && !fullRound ? 'rounded-md' : ''}`;

  return (
    <div className={`${customColors ? customColors : 'bg-uiElem dark:bg-dark-uiElem'}
    text-primary dark:text-dark-primary
    p-4 pl-8 pr-8
    ${roundingClasses}
    ` + (className ? className : '')}
      onClick={onClick}>
      {children}
    </div>
  );
}

export default UIElement;