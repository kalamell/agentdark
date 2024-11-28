import Image from "next/image";
export default function agentDone() {
  return (
    <>
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[582px] max-md:w-full py-9">
          <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
           สมัครสมาชิก เดโมโบรกเกอร์
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
              <div className="bg-[#fff] rounded-xl p-6 flex flex-col gap-y-9">
                <div className="flex flex-col gap-y-4 items-center">
                  <Image
                    src="/icon-22.svg"
                    width={48}
                    height={48}
                    alt="ประกันการเดินทาง"
                    priority={true}
                  />
                  <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                    ส่งข้อมูลเรียบร้อยค่ะ
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
