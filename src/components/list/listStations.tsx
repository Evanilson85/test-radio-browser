import React from 'react';
import { Check } from 'lucide-react';

interface IPROPSLIST {
  title: string;
  checkFavorite: boolean;
}

export const listStations = ({ ...props }: IPROPSLIST) => {
  return (
    <div className="relative">
      <div className="h-full bg-[#4D4D56] blur-lg absolute w-full rounded-xl"></div>
      <div className="bg-[#4D4D56] min-h-16  flex flex-row items-center px-5 justify-between rounded-xl border-none relative z-20">
        <h2 className="text-white text-2xl">{props.title}</h2>
        <div>
          <Check
            color={props.checkFavorite ? '#1267FC' : '#46464975'}
            size={34}
          />
        </div>
      </div>
    </div>
  );
};
