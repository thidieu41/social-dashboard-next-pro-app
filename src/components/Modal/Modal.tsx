import { Button } from "@/components-system/Button/Button";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  isOpen?: boolean;
  onChange?: (open: boolean) => void;
};

export default function Modal(props: ModalProps) {
  const { isOpen, onChange, children, className, title } = props;

  const handleSetModalToogle = () => {
    onChange?.(!isOpen);
  };

  const mergeClass = twMerge("p-4", className);
  return (
    <div className="relative overflow-hidden">
      {/* Khi modal mở → phần bên trái bị mờ */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black/20 backdrop-blur-sm z-40 transition-all"
          onClick={handleSetModalToogle}
        />
      )}

      {/* Modal trượt từ phải ra */}
      <div
        className={`modal-wrap fixed top-0 right-0 h-full w-1/3 shadow-2xl z-50 transform transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button onClick={handleSetModalToogle}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className={mergeClass}>{children}</div>
      </div>
    </div>
  );
}
