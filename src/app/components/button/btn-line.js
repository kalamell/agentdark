import Link from "next/link";
import Image from "next/image";

export default function ButtonLine({
  text = "คลิกเพื่อรับส่วนลด",
  link,
  size = 40,
  font = 22,
}) {
  return (
    <Link
      href={link}
      className={`text-[${font}px] py-[5px] hover:stroke-[#243c5a] hover:bg-[#ffffff] hover:drop-shadow text-[#ffffff] hover:text-[#06C755] gap-x-1.5 flex justify-center items-center font-athitiSemiBold  bg-[#06C755]  text-white x  rounded-[50px] leading-[24px] w-full text-center  transition-all duration-300 ease-in-out`}
    >
      <Image
        src="/logo-3.svg"
        width={size}
        height={size}
        alt="line"
        priority={true}
      />
      {text}
    </Link>
  );
}
