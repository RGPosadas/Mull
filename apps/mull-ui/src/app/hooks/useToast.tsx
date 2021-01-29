import { useRef } from 'react';
import { toast, ToastOptions, TypeOptions } from 'react-toastify';

export const useToast = () => {
  const toastId = useRef(null);

  const notifyToast = (message: string, options?: ToastOptions) => {
    toastId.current = toast(message, { autoClose: false, ...options });
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
