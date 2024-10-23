import { Play, Edit, Delete } from 'lucide-react';

export const ListFavorite = () => {
  return (
    <div className="bg-[#62626C] h-[75px] w-full flex justify-between px-5">
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
          <Edit />
        </button>
        <button>
          <Delete />
        </button>
      </div>
    </div>
  );
};
