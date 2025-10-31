import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export const Button = (props: ButtonProps) => {
  const { className } = props;

  const btnClass = twMerge(
    "flex items-center justify-center text-center gap-2 px-4 py-1 rounded-xl border transition min-h-11 cursor-pointer",
    className
  );
  return <button {...props} className={btnClass}></button>;
};
