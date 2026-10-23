import ReactDOM from "react-dom";
import Header from "./Header";
import { X } from "lucide-react";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen = false, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="dark:bg-dark-secondary/50 fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-200/50 p-4">
      <div className="dark:bg-dark-secondary w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg">
        <Header
          title={name}
          buttonComponent={
            <button
              onClick={onClose}
              className="bg-blue-primary flex h-7 w-7 items-center justify-center rounded-full text-white hover:bg-blue-600"
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
