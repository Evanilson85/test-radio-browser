/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IStations } from '@/interfaces';
import { useToast } from '@/hooks/use-toast';

interface StationsContextType {
  stations: IStations[];
  currentStationId: string | null;
  isPlaying: boolean;
  currentStationData: Pick<
    IStations,
    'stationuuid' | 'name' | 'url' | 'country' | 'countrycode'
  > | null;
  playStation: (
    station: Pick<
      IStations,
      'stationuuid' | 'name' | 'url' | 'country' | 'countrycode'
    >
  ) => void;
  stopStation: () => void;
  saveStation: (station: IStations) => void;
  editStation: (stationuuid: string, updatedName: string) => void;
  getStationsFromLocalStorage: () => IStations[];
  removeStation: (stationuuid: string) => void;
}

const StationsContext = createContext<StationsContextType | undefined>(
  undefined
);

export const StationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toast } = useToast();

  const [stations, setStations] = useState<IStations[]>([]);
  const [currentStationId, setCurrentStationId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentStationData, setCurrentStationData] = useState<Pick<
    IStations,
    'stationuuid' | 'name' | 'url' | 'country' | 'countrycode'
  > | null>(null);

  const playStation = (
    station: Pick<
      IStations,
      'stationuuid' | 'name' | 'url' | 'country' | 'countrycode'
    >
  ) => {
    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(station.url);
    setCurrentStationData(station);
    newAudio.play();
    setAudio(newAudio);
    setCurrentStationId(station.stationuuid);
    setIsPlaying(true);

    newAudio.onended = () => {
      setIsPlaying(false);
      setCurrentStationId(null);
    };
  };

  const stopStation = () => {
    if (audio) {
      audio.pause();
      setAudio(null);
      setIsPlaying(false);
      setCurrentStationId(null);
    }
  };

  const saveStation = (station: IStations) => {
    const storedStations = getStationsFromLocalStorage();

    if (storedStations.some(s => s.stationuuid === station.stationuuid)) {
      alert('Station is already in your favorites.');
      return;
    }

    const updatedStations = [...storedStations, station];
    localStorage.setItem('favoriteStations', JSON.stringify(updatedStations));
    setStations(updatedStations);
  };

  const editStation = (stationuuid: string, updatedName: string) => {
    const storedStations = getStationsFromLocalStorage();
    const updatedStations = storedStations.map(station => {
      return station.stationuuid === stationuuid
        ? { ...station, name: updatedName }
        : station;
    });

    localStorage.setItem('favoriteStations', JSON.stringify(updatedStations));
    setStations(updatedStations);
  };

  const removeStation = (stationuuid: string) => {
    if (audio && currentStationData?.stationuuid === stationuuid) {
      toast({
        title: '',
        description:
          'It is not possible to delete when listening to the current radio',
      });
      return;
    }

    const storedStations = getStationsFromLocalStorage();
    const updatedStations = storedStations.filter(
      station => station.stationuuid !== stationuuid
    );

    localStorage.setItem('favoriteStations', JSON.stringify(updatedStations));
    setStations(updatedStations);

    toast({
      title: '',
      description: 'Successfully deleted!',
    });
  };

  const getStationsFromLocalStorage = (): IStations[] => {
    const storedStations = localStorage.getItem('favoriteStations');
    return storedStations ? JSON.parse(storedStations) : [];
  };

  useEffect(() => {
    const storedStations = getStationsFromLocalStorage();
    setStations(storedStations);
  }, []);

  return (
    <StationsContext.Provider
      value={{
        stations,
        currentStationId,
        isPlaying,
        currentStationData,
        playStation,
        stopStation,
        saveStation,
        getStationsFromLocalStorage,
        removeStation,
        editStation,
      }}
    >
      {children}
    </StationsContext.Provider>
  );
};

export const useStations = () => {
  const context = useContext(StationsContext);
  if (!context) {
    throw new Error('useStations must be used within a StationsProvider');
  }
  return context;
};
