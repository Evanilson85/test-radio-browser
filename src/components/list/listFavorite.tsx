import { Play, Trash2, Pencil } from 'lucide-react';
import { Blur } from '../blur';
import { Modal } from '../modal';

export const ListFavorite = () => {
  return (
    <div className="h-[75px] w-full flex justify-between relative">
      <Blur className="flex flex-row justify-between relative w-full bg-[#62626C] p-5 rounded-[10px]">
        <div className="flex items-center gap-5">
          <div className="bg-[#00000050] h-[58px] w-[58px] rounded-[50%] flex items-center justify-center">
            <Play />
          </div>
          <div className="flex flex-col">
            <h3>Titulo principal</h3>
            <p>subTitulo</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button>
            <Pencil />
            <Modal />
          </button>
          <button>
            <Trash2 />
          </button>
        </div>
      </Blur>
    </div>
  );
};
