import { useRef } from 'react';
import { toast, TypeOptions } from 'react-toastify';

export const useToast = () => {
  const toastId = useRef<React.ReactText>(null);

  const notifyToast = (message: string, type: TypeOptions = toast.TYPE.INFO) => {
    toastId.current = toast(message, { autoClose: 3000, type });
  };

  const updateToast = (message: string, type: TypeOptions = toast.TYPE.INFO) => {
    toast.update(toastId.current, {
      type,
      render: message,
      autoClose: 3000,
    });
  };

  return {
    notifyToast,
    updateToast,
  };
};
