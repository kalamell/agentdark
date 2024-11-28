export default function textComponent({ text }) {
  return (
    <div className="flex flex-row items-center gap-x-4">
      <p className="font-athitiSemiBold text-[18px] leading-[22px]">{text}</p>
      <hr className="h-px flex-grow bg-[#D1D5DB] border-0 rounded" />
    </div>
  );
}
