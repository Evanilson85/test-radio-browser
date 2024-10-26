import { Check } from 'lucide-react';
import React from 'react';

interface IPROPSLIST extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  checkFavorite: boolean;
}

export const listStations = ({
  checkFavorite,
  title,
  ...props
}: IPROPSLIST) => {
  return (
    <div className="relative">
      <div className="h-full bg-[#4D4D56] blur-lg absolute w-full rounded-xl"></div>
      <div className="bg-[#4D4D56] min-h-16  flex flex-row items-center px-5 justify-between rounded-xl border-none relative z-20">
        <h2
          className="text-white text-2xl overflow-hidden truncate"
          title={title}
        >
          {title}
        </h2>
        <button className={`${checkFavorite ? '' : 'opacity-50'}`} {...props}>
          <Check color={checkFavorite ? '#1267FC' : '#ccc '} size={34} />
        </button>
      </div>
    </div>
  );
};
