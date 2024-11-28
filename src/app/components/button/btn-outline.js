import Link from "next/link";

export default function ButtonOutline({ text, link }) {
  return (
    <Link
      href={link}
      className="text-center border border-[#A7A9B8] rounded-lg text-[#181b31cc] font-athitiSemiBold text-sm leading-[16px] py-[9px]  transition-all duration-300 ease-in-out"
    >
      {text}
    </Link>
  );
}
