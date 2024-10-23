import { useState } from 'react';
import { Header } from '../../components/header';
import { List } from '../../components/list';
import { Menu } from '../../components/screenFavorite';

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Header.input placeholder="Search here" />
          </div>
        </Header.root>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 30 }).map(item => (
            <List.stations
              key={Number(item)}
              checkFavorite={true}
              title="teste"
            />
          ))}
        </div>
      </div>
    </>
  );
};
