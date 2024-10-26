import { X, Square } from 'lucide-react';
import { Header } from '../header';
import { ListFavorite } from '../list/listFavorite';
import { Blur } from '../blur';

import { IPROPSMENU } from '@/interfaces';
import { useStations } from '@/context';
import { useState } from 'react';

export const Screen = ({ ...props }: IPROPSMENU) => {
  const { stations, currentStationData, stopStation } = useStations();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations.filter(
    station =>
      station.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.countrycode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`h-svh overflow-y-auto bg-main w-full p-6 fixed z-50 ease-linear duration-200 ${props.open ? 'right-0' : '-right-[100%]'} md:right-[0%] md:w-spacing-right md:absolute`}
    >
      <div>
        <Header.root>
          <div className="flex justify-between md:hidden">
            <button onClick={props.onClose}>
              <X color="#f87171 " />
            </button>
            <button>
              <Header.icon iconName="Search" size={34} />
            </button>
          </div>
          <div className="flex items-center justify-center md:w-full">
            <Header.text title="Radio Browser" />
          </div>
        </Header.root>
        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-white">FAVORITE RADIOS</h3>
          <button className="hidden md:flex items-center gap-5">
            <Header.icon iconName="Search" size={34} />
            <input
              type="text"
              placeholder="Search stations"
              className="text-white bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </button>
        </div>
      </div>
      <div className="bg-[#4D4D56] min-h-dvh rounded-[10px] relative mt-5">
        <Blur>
          <div className="border-b-[1px] border-b-[#605C5C]">
            {stations.length > 0 && (
              <div className="flex gap-5 items-center h-[75px] px-10 relative">
                <button className="bg-black rounded-md" onClick={stopStation}>
                  <Square />
                </button>
                <h2 className="text-[24px] font-semibold">
                  {currentStationData?.name ?? 'select station'}
                </h2>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5 md:p-5">
            {filteredStations.length > 0 ? (
              filteredStations.map(station => (
                <ListFavorite
                  key={station.stationuuid}
                  title={station.name}
                  url={station.url ? station.url : station.url_resolved}
                  id={station.stationuuid}
                  country={station.country}
                  countrycode={station.countrycode}
                />
              ))
            ) : (
              <div className="h-[200px] max-h-full relative z-50 flex items-center justify-center">
                <p className="text-white font-semibold text-[24px]">
                  No favorite stations found
                </p>
              </div>
            )}
          </div>
        </Blur>
      </div>
    </div>
  );
};
