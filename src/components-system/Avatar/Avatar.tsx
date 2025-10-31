import Image from "next/image"


type AvatarProps =  React.InputHTMLAttributes<HTMLInputElement> & {

}

 const Avatar = (props: AvatarProps) => {
    return(
        // <input {...props}>
        //     <Image src={"/avatar.jpg"} alt="" width={60} height={60} />
        // </input>
        <div className="rounded-full">
            <Image src={"/images/avatar.jpg"} alt="" width={30} height={30} className="rounded-full object-cover" />
        </div>
    )
}

export default Avatar