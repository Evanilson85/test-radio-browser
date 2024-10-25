import { X, Square } from 'lucide-react';
import { Header } from '../header';
import { ListFavorite } from '../list/listFavorite';
import { Blur } from '../blur';

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
          <button className="hidden md:flex items-center gap-5">
            <Header.icon iconName="Search" size={34} />
            <input
              type="text"
              placeholder="Search stations"
              className="text-white bg-transparent border-none outline-none"
            />
          </button>
        </div>
      </div>
      <div className="bg-[#4D4D56] min-h-dvh rounded-[10px] relative mt-5">
        <Blur>
          <div className="border-b-[1px] border-b-[#605C5C]">
            <div className="flex gap-5 items-center h-[75px] px-10 relative">
              <div className="bg-black rounded-md">
                <Square />
              </div>
              <h2 className="text-[24px] font-semibold">NOME DA RÁDIO ATUAL</h2>
            </div>
          </div>
          <div className=" flex flex-col gap-5 md:p-5">
            {Array.from({ length: 20 }).map((_, index) => (
              <ListFavorite key={index} />
            ))}
          </div>
        </Blur>
      </div>
    </div>
  );
};
