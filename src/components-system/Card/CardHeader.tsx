import { twMerge } from "tailwind-merge";

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
};

export const CardHeader = (props: CardHeaderProps) => {
  const { children, title, className } = props;
  const mergeClass = twMerge("flex justify-between items-center", className);
  return (
    <div className={mergeClass}>
      <p className="text-lg font-semibold! text-blue-500">{title}</p>
      {children}
    </div>
  );
};
