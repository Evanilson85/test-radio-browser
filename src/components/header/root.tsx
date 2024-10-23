import React from 'react';

interface IPROPSHEADER {
  children: React.ReactNode;
}

export const Root = ({ children }: IPROPSHEADER) => {
  return <div>{children}</div>;
};
