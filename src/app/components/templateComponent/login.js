import Image from "next/image";

export default function TemplateLogin({ children, title, subTitle }) {
  return (
    <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
      <div className="container mx-auto w-[512px] max-md:w-full py-9 max-md:px-4">
        <Image
          src="/logoipsum-242.svg"
          width={300}
          height={202}
          alt="สมัครฟรี"
          priority={true}
          className="mx-auto mb-4"
          quality={100}
        />
        <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#111827] text-center">
          {title}
        </p>
        <p className="font-athitiMedium text-base  text-[#808291] text-center">
          {subTitle}
        </p>
        <div className="pt-[24px] pb-6">
          <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
            <div className="bg-[#fff] rounded-xl p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
