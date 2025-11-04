import Image from "next/image";
import { twMerge } from "tailwind-merge";

type AvatarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  height?: number;
  width?: number;
};

const Avatar = (props: AvatarProps) => {
  const { width = 30, height = 30, src = "/images/avatar.jpg" } = props;
  const mergeClass = twMerge("rounded-full object-cover", props.className);
  return (
    <div className="rounded-full">
      <Image
        src={src}
        alt="img-avatar"
        width={width}
        height={height}
        className={mergeClass}
      />
    </div>
  );
};

export default Avatar;
