import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { List } from '@/components/list';
import { Menu } from '@/components/screenFavorite';
import ReactLoading from 'react-loading';

import api from '@/service/api';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IStations } from '@/interfaces';
import { useStations } from '@/context';
import { toast } from '@/hooks/use-toast';

export const Home = () => {
  const { saveStation, getStationsFromLocalStorage } = useStations();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState<IStations[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchRadios = async () => {
      try {
        const { data } = await api.get('/json/stations/search?limit=100');

        const storedStations = getStationsFromLocalStorage();

        const updatedStations = data.map((station: IStations) => {
          const localStorageMatch = storedStations.find(
            s => s.stationuuid === station.stationuuid
          );
          return localStorageMatch
            ? { ...station, ...localStorageMatch }
            : station;
        });

        setStations(updatedStations);
      } catch (error) {
        setError('Failed to load stations. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRadios();
  }, []);

  useEffect(() => {
    const storedStations = getStationsFromLocalStorage();
    const updatedStations = stations.map(station => {
      const localStorageMatch = storedStations.find(
        s => s.stationuuid === station.stationuuid
      );
      return localStorageMatch
        ? { ...station, ...localStorageMatch }
        : { ...station, checkFavorite: false };
    });
    setStations(updatedStations);
  }, [getStationsFromLocalStorage]);

  const filteredItems = stations.filter(
    item =>
      item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSaveStation = (station: IStations) => {
    if (station.checkFavorite)
      return toast({
        title: '',
        description: 'This station is already in your favorites!',
      });

    const newStation = { ...station, checkFavorite: true };
    saveStation(newStation);

    const updatedStations = stations.map(item =>
      item.stationuuid === station.stationuuid ? newStation : item
    );
    // adding to favorites
    toast({
      title: '',
      description: 'adding to favorites',
    });
    setStations(updatedStations);
  };

  return (
    <>
      <Menu.mobile open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <div className="p-6 max-h-dvh overflow-auto md:max-w-[380px]">
        <Header.root>
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(true)}>
              <Header.icon iconName="Menu" size={34} />
            </button>
          </div>
          <div className="w-10/12 mx-auto my-5 md:w-full">
            <Header.input
              placeholder="Search here"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </Header.root>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="w-full flex justify-center">
              <ReactLoading
                type={'bars'}
                color={'blue'}
                height={'20%'}
                width={'20%'}
              />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {currentItems.length > 0 ? (
                currentItems.map(item => (
                  <List.stations
                    key={item.stationuuid}
                    checkFavorite={item.checkFavorite}
                    title={item.name !== ' ' ? item.name : 'name not found'}
                    onClick={() => handleSaveStation(item)}
                  />
                ))
              ) : (
                <p className="text-white font-semibold">No stations found.</p>
              )}

              {currentItems.length > 0 && ( // refatorar
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2  h-[40px] bg-slate-200 rounded-[10px]  ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ArrowLeft />
                  </button>
                  <span className="text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2  h-[40px] bg-slate-200 rounded-[10px] ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ArrowRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
