import Image from "next/image";

export default function FormCard({
  children,
  title = <></> || "",
  bgTitle,
  bgContent,
  text,
  paddingMbX,
}) {
  return (
    <div>
      <p
        className={`text-${text} font-athitiSemiBold text-[22px] leading-[30px] bg-[${bgTitle}] rounded-t-lg  py-[16px] px-[20px]`}
      >
        {title}
      </p>
      <div
        className={`bg-[${bgContent}] px-[24px] py-[24px] ${
          paddingMbX !== "" ? `max-md:px-[${paddingMbX}px]` : null
        } flex flex-col gap-y-[20px] rounded-b-[12px] `}
      >
        {children}
      </div>
    </div>
  );
}
