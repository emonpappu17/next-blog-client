import Image from "next/image";

export const Logo = () => (
  <Image
    width={100}
    height={100}
    // style={{ width: "100px", height: "auto" }}
    src="/logo.jpg"
    alt="Company Logo"
  ></Image>
);
