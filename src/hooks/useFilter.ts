import { useEffect } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

const useFilter = <T extends object, K extends FieldValues>(
  searchParams: T,
  navigateFn: (values: K) => void
) => {
  const { register, control, handleSubmit, setValue } = useForm<K>();

  useEffect(() => {
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key as keyof T] !== undefined) {
        setValue(
          key as Path<K>,
          searchParams[key as keyof T] as PathValue<K, Path<K>>
        );
      }
    });
  }, [searchParams, setValue]);

  const onSubmit: SubmitHandler<K> = (data: K) => {
    navigateFn(data);
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
};

export default useFilter;
