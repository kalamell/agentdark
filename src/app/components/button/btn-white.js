import Link from "next/link";

export default function ButtonWhite({ isLoading, text, link, onClick, disabled }) {
  return (
    <>
      {link ? (
        <Link href={link}>
          <button
            type="button"
            className={`h-full whitespace-nowrap font-athitiSemiBold border border-[#9CA3AF] text-[22px] bg-[#ffff] text-[#181B31] rounded-[50px] leading-[24px] w-full transition-all duration-300 ease-in-out ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={disabled}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          onClick={onClick}
          type="button"
          className={`whitespace-nowrap font-athitiSemiBold border border-[#9CA3AF] text-[22px] bg-[#ffff] text-[#181B31] rounded-[50px] leading-[24px] w-full transition-all duration-300 ease-in-out ${disabled || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={disabled}
        >
          {isLoading ? "กรุณารอสักครู่" : `${text}`}
        </button>
      )}
    </>
  );
}
