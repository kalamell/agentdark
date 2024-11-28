import Link from "next/link";
export default function ButtonBrown({
  isLoading,
  text,
  link,
  onClick,
  font = 22,
  disable,
}) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <button
            type="button"
            className={` ${
              isLoading ? "disabled " : ""
            } whitespace-nowrap font-athitiSemiBold text-[${font}px] bg-[#000000]  text-white hover:bg-[#888888] hover:text-[#000000] py-[13px] rounded-[50px] leading-[24px] w-full  transition-all duration-300 ease-in-out`}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          disabled={disable ? "disabled" : ""}
          onClick={onClick}
          type="button"
          className={` ${
            disable
              ? "disabled:opacity-75 cursor-not-allowed disabled:hover:bg-[#000000] disabled:hover:text-white"
              : ""
          } whitespace-nowrap font-athitiSemiBold text-[${font}px] bg-[#000000]  text-white hover:bg-[#888888] hover:text-[#000000] py-[13px]  rounded-[50px] leading-[24px] w-full  transition-all duration-300 ease-in-out`}
        >
          {isLoading ? "กรุณารอสักครู่" : `${text}`}
        </button>
      )}
    </>
  );
}
