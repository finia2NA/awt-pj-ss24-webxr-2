import { ReactNode } from 'react';

export interface UIElementProps {
  /**
   * The content of the UIElement.
   */
  children: ReactNode;
  /**
   * Whether to round the top of the UIElement.
   */
  roundTop?: boolean;
  /**
   * Whether to round the bottom of the UIElement.
   */
  roundBottom?: boolean;
}

const UIElement = ({ children, roundTop, roundBottom }: UIElementProps) => {
  return (
    <div className={`bg-uiElem dark:bg-dark-uiElem
    text-primary dark:text-dark-primary
    p-4 pl-8 pr-8
    rounded-md
    ${roundTop ? 'rounded-t-2xl' : ''}
    ${roundBottom ? 'rounded-b-2xl' : ''}
    `}>
      {children}
    </div>
  );
}

export default UIElement;