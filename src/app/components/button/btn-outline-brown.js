import Link from "next/link";

export default function ButtonOutlineBrown({ text, link, onClick, isLoading }) {
  return (
    <>
      {link ? (
        <Link
          href={link}
          className="whitespace-nowrap font-athitiSemiBold text-[18px] bg-[#984333]  text-white hover:bg-[#fee042] hover:text-[#984333] py-[13px]  rounded-[50px] leading-[24px] w-full  transition-all duration-300 ease-in-out"
        >
          {text}
        </Link>
      ) : (
        <button
          onClick={onClick}
          type="button"
          className="whitespace-nowrap font-athitiSemiBold text-[18px] bg-[#FFFF] border border-[#984333] text-[#984333] hover:bg-[#984333] hover:text-[#FFFFFF] py-[13px] rounded-[50px] leading-[24px] w-full  transition-all duration-300 ease-in-out"
        >
          {isLoading ? "กรุณารอสักครู่" : `${text}`}
        </button>
      )}
    </>
  );
}
