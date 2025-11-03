import { twMerge } from "tailwind-merge";

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: "col" | "row";
  spacing?: number;
};

const Stack = (props: StackProps) => {
  const { children, className, direction = 'row', spacing = 0 } = props;
  const mergeClass = twMerge(
    `flex flex-${direction} gap-${spacing} p-1 rounded-lg w-full`,
    className
  );
  return (
    <div {...props} className={mergeClass}>
      {children}
    </div>
  );
};

export default Stack;
