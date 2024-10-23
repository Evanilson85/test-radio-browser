import { Pause, X } from 'lucide-react';
import { Header } from '../header';
import { ListFavorite } from '../list/listFavorite';

interface IPROPSMENU {
  open: boolean;
  onClose: () => void;
}

export const Screen = ({ ...props }: IPROPSMENU) => {
  return (
    <div
      className={`h-dvh overflow-y-auto bg-main w-full p-6 fixed z-50 ease-linear duration-200 ${props.open ? 'right-0' : '-right-[100%]'} md:right-[0%] md:w-spacing-right md:absolute`}
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
          <button className="hidden md:block">
            <Header.icon iconName="Search" size={34} />
          </button>
        </div>
      </div>
      <div className="bg-[#4D4D56] min-h-dvh">
        <div className="flex gap-5 items-center h-[75px] px-10">
          <Pause />
          <h2>NOME DA RÁDIO ATUAL</h2>
        </div>
        <div className="p-5 ">
          {Array.from({ length: 20 }).map((_, index) => (
            <ListFavorite key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
