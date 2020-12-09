import { useRef } from 'react';
import { toast, TypeOptions } from 'react-toastify';

export const useToast = () => {
  const toastId = useRef(null);

  const notifyToast = (message: string) => {
    toastId.current = toast(message, { autoClose: false });
  };

  const updateToast = (type: TypeOptions, message: string) => {
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
