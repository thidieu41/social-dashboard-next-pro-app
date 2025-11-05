/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components-system/Button/Button";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  isOpen?: boolean;
  onChangeModal?: (open: boolean, title: string) => void;
};

type ModalActionsProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function Modal(props: ModalProps) {
  const { isOpen, onChangeModal, children, className, title } = props;

  const handleSetModalToogle = () => {
    onChangeModal?.(!isOpen, title || "");
  };

  const mergeClass = twMerge("p-4 flex-1 overflow-y-auto h-full", className);

  const childrenArray = React.Children.toArray(children);
  const actions = childrenArray.filter(
    (child: any) =>
      React.isValidElement(child) &&
      (child?.type as any)?.displayName === "ModalActions"
  );

  const content = childrenArray.filter(
    (child: any) =>
      React.isValidElement(child) &&
      (child?.type as any)?.displayName !== "ModalActions"
  );
  return (
    <div className="relative overflow-hidden flex flex-col">
      {/* Khi modal mở → phần bên trái bị mờ */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black/20 z-40 transition-all"
          onClick={handleSetModalToogle}
        />
      )}

      {/* Modal trượt từ phải ra */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="modal-wrap fixed top-0 right-0 h-full md:w-1/3 w-3/4 shadow-2xl z-50 flex flex-col "
          >
            <div className="flex justify-between items-center p-4 border-b border-color">
              <h2 className="text-lg font-semibold main-text-title">{title}</h2>
              <Button onClick={handleSetModalToogle}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className={mergeClass}>{content}</div>

            {actions.length > 0 && (
              <div className="p-2 border-t border-color sticky bottom-0 shrink-0">
                {actions}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

export const ModalActions = (props: ModalActionsProps) => {
  const { className, children } = props;
  const mergedClass = twMerge("flex justify-end gap-2 p-2", className);
  return (
    <div {...props} className={mergedClass}>
      {children}
    </div>
  );
};

ModalActions.displayName = "ModalActions";
