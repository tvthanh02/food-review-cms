import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useRef } from 'react';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetError,
} from 'react-hook-form';

interface ButtonUploadAvatarProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  control?: Control<T>;
  setError: UseFormSetError<T>;
  errors: FieldErrors<T>;
}

const ButtonUploadAvatar = <T extends FieldValues>(
  props: ButtonUploadAvatarProps<T>
) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  console.log(props);
  const getUrlFromFile = (file: File) => {
    // something
    console.log(file);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      getUrlFromFile(file);
    }
  };

  return (
    <div className='flex items-center gap-3'>
      <Avatar className='w-16 h-16 rounded-full border overflow-hidden'>
        <AvatarImage
          className='w-full h-full object-cover'
          src='https://github.com/shadcn.png'
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <input
        ref={inputFileRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => handleChangeFile(e)}
      />
      <Button
        onClick={() => inputFileRef.current?.click()}
        variant='outline'
        size='sm'
      >
        <Plus size={16} />
        Upload
      </Button>
    </div>
  );
};

export default ButtonUploadAvatar;
