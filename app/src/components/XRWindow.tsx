import { ReactNode } from 'react';

/**
 * Props for the XRWindow component.
 */
export interface XRWindowProps {
  /**
   * The content of the XRWindow.
   */
  children: ReactNode;
}

const XRWindow = ({ children }: XRWindowProps) => {
  return (
    <div className="bg-mainBG dark:bg-dark-mainBG
    text-primary dark:text-dark-primary
    backdrop-blur-sm
    p-14 pt-8 pl-14
    rounded-lg
    ">
      {children}
    </div>
  );
}

export default XRWindow;