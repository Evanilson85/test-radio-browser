import { Play, Trash2, Pause } from 'lucide-react';
import { Blur } from '../blur';
import { Modal } from '../modal';
import { useStations } from '@/context';

interface IPROPSLISTFAVORITE {
  title: string;
  url: string;
  id: string;
  country: string;
  countrycode: string;
}

export const ListFavorite = ({
  title,
  url,
  id,
  country,
  countrycode,
}: IPROPSLISTFAVORITE) => {
  const {
    currentStationId,
    isPlaying,
    playStation,
    stopStation,
    removeStation,
  } = useStations();

  const handlePlayPause = () => {
    if (currentStationId === id && isPlaying) {
      stopStation();
    } else {
      const json = {
        stationuuid: id,
        name: title,
        url,
        country,
        countrycode,
      };
      playStation({ ...json });
    }
  };

  const handleRemoveStation = () => {
    removeStation(id);
  };

  return (
    <div className="h-[75px] w-full flex justify-between relative">
      <Blur className="flex flex-row justify-between relative w-full bg-[#62626C] p-5 rounded-[10px]">
        <div className="flex items-center gap-5">
          <button
            onClick={handlePlayPause}
            className="bg-[#00000050] h-[58px] w-[58px] rounded-[50%] flex items-center justify-center"
          >
            {currentStationId === id && isPlaying ? <Pause /> : <Play />}
          </button>
          <div className="flex flex-col max-w-[175px] md:max-w-full">
            <h3 className="overflow-hidden truncate font-semibold text-[24px]">
              {title}
            </h3>
            <div className="flex flex-row flex-wrap gap-1">
              <p className="font-normal text-[16px]">{country},</p>
              <p className="font-normal text-[16px]">{countrycode}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Modal currentTitle={title} id={id} />
          <button onClick={handleRemoveStation}>
            <Trash2 />
          </button>
        </div>
      </Blur>
    </div>
  );
};
