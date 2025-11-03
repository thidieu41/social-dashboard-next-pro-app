import Image from "next/image";

type AvatarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  height?: number;
  width?: number;
};

const Avatar = (props: AvatarProps) => {
  const { width = 30, height = 30 } = props;
  return (
    // <input {...props}>
    //     <Image src={"/avatar.jpg"} alt="" width={60} height={60} />
    // </input>
    <div className="rounded-full">
      <Image
        src={"/images/avatar.jpg"}
        alt=""
        width={width}
        height={height}
        className="rounded-full object-cover"
      />
    </div>
  );
};

export default Avatar;
