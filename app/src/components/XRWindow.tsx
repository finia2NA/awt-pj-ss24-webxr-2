import { ReactNode } from 'react';

export interface XRWindowProps {
  children: ReactNode;
}

const XRWindow = ({ children }: XRWindowProps) => {
  return (
    <div className="bg-mainBG
    dark:bg-dark-mainBG
    p-16
    pt-12
    pl-14
    rounded-lg
    text-primary
    dark:text-dark-primary
    ">
      {children}
    </div>
  );
}

export default XRWindow;