import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputType = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  starticon?: React.ReactNode;
  name: string;
};

const Input = (props: InputType) => {
  const { className, label = "", name, starticon: icon } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;

  const mergedClass = twMerge(
    `w-full border border-gray-400  py-3 rounded-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      !!icon ? "pl-10" : "pl-5"
    }`,
    className
  );
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className="secondary-text">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5">
            {icon}
          </span>
        )}
        <input {...register(name)} {...props} className={`${mergedClass}`} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
