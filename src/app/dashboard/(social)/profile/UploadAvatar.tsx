"use client";

import Avatar from "@/components-system/Avatar/Avatar";
import { useRef, useState } from "react";

export const UploadAvatar = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState("/images/avatar.jpg");

  const hanldeClickUploadOnImgage = () => {
    fileRef.current?.click();
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor="avatar-upload" className="cursor-pointer">
        <Avatar
          onClick={hanldeClickUploadOnImgage}
          width={80}
          height={80}
          src={preview}
          className="max-w-20 max-h-20"
        />
      </label>

      <input
        id="avatar-upload"
        name="file"
        ref={fileRef}
        accept="image/*"
        type="file"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
};
