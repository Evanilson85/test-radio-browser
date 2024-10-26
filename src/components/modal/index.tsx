import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useToast } from "@/hooks/use-toast"
import { Pencil } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { useStations } from '@/context';

interface IPROPSMODAL {
  currentTitle: string;
  id: string
}

export const Modal = ({ currentTitle, id }: IPROPSMODAL) => {

  const { toast } = useToast()
  const { editStation } = useStations();
  const [name, setName] = useState(currentTitle);
  const [openModal, setModal] = useState<boolean>(false);

  const handleSaveNewTitle = () => {
    toast({
      title: "",
      description: "Successfully edited!",
    })
    editStation(id, name)
    setModal(false);
  };

  return (
    <Dialog open={openModal} >
      <DialogTrigger>
        <button onClick={() => setModal(true)}>
          <Pencil />
        </button>
      </DialogTrigger>
      <DialogContent className='w-[90%] md:w-full border-none rounded-[10px] bg-main'>
        <DialogHeader>
          <DialogTitle className='text-white'>Edit</DialogTitle>
        </DialogHeader>
        <div>
          <input
            type="text"
            placeholder="edit name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border-2 h-[50px] p-5 rounded-sm"
          />
        </div>
        <DialogFooter className="flex gap-5 flex-row-reverse">
            <button
              className="w-full bg-green-400 h-[40px] my-5 rounded-sm text-white text-[20px]"
              onClick={handleSaveNewTitle}
            >
              save
            </button>
          <DialogClose asChild>
            <button
              className="w-full bg-red-500 h-[40px] my-5 rounded-sm text-white text-[14px]"
              onClick={() => setModal(false)}
            >
              close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
