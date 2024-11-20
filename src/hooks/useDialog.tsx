import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface DialogInfo {
  title: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogInfo, setDialogInfo] = useState<DialogInfo | null>(null);

  const setDialog = ({
    title,
    description,
    onCancel,
    onConfirm,
  }: DialogInfo) => {
    setDialogInfo({ title, description, onCancel, onConfirm });
    setIsOpen(true);
  };

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const RootDialog = () => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogInfo?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogInfo?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={dialogInfo?.onCancel}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={dialogInfo?.onConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { RootDialog, setDialog, toggleDialog };
};

export default useDialog;
