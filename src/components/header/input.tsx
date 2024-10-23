import { InputHTMLAttributes } from 'react';

export const HeaderInput = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="bg-input h-9 rounded-[10px] w-full p-5 text-white outline-none"
      {...props}
    />
  );
};
