import { ReactNode } from 'react';

/**
 * Props for the XRWindow component.
 */
export interface XRWindowProps {
  /**
   * The content of the XRWindow.
   */
  children: ReactNode;
  small?: boolean;
  tight?: boolean;
  className?: string;
}

const XRWindow = ({ children, small: isSmall, tight: isTight, className }: XRWindowProps) => {
  return (
    <div className={`bg-mainBG dark:bg-dark-mainBG
    text-primary dark:text-dark-primary
    backdrop-blur-sm
    ${isSmall ? "px-2 py-4 rounded-full" : (isTight ? "p-2 pt-2 pl-2 rounded-lg" : "p-14 pt-8 pl-14 rounded-lg")}
    ` + className}>
      {children}
    </div>
  );
}

export default XRWindow;