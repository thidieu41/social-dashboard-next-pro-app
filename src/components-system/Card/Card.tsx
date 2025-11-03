import { twMerge } from "tailwind-merge";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {};

const Card = (props: CardProps) => {
  const { children, className } = props;
  const mergeClass = twMerge(`stack-wrapper  p-3 rounded-lg w-full`, className);
  return (
    <div {...props} className={mergeClass}>
      {children}
    </div>
  );
};

export default Card;
