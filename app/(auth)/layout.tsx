import Image from "next/image";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-[1000px] flex">
      <Image
        src="/auth_background.png"
        width={950}
        height={1000}
        alt="background image"
        className="w-1/2 h-full"
      />
      <div className="w-1/2 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default layout;
