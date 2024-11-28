import Image from "next/image";

export default function PaymentSuccess() {
  return (
    <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
      <div className="container mx-auto w-[43.303%] max-lg:w-[60%] max-md:w-full py-9">
        <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
          การชำระเงิน
        </p>
        <p className="text-center font-athitiMedium leading-[30px] text-xl">
          ชำระตรงกับบริษัทไทยไพบูลย์ประกันภัย
        </p>
        <div className="pt-[24px] pb-6">
          <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-6 shadow-md">
            <div className="bg-[#FFFFFF] w-full rounded-[12px]">
              <div className="flex flex-col py-[20px] px-[24px]">
                <div className="flex flex-col items-center">
                  <Image
                    src="/icon-22.svg"
                    width={48}
                    height={48}
                    alt=""
                    priority={true}
                  />
                  <p className="font-athitiSemiBold pt-[10px] text-[22px] leading-[30px] text-[#111827]">
                    ทำรายการซื้อสำเร็จ
                  </p>
                  <p className="font-athitiRegular text-[18px] leading-[22px] text-[#808291] max-md:text-center">
                    ท่านได้รับความคุ้มครอง
                    <br className="md:hidden" />
                    จากกรมธรรม์ประกันภัยแล้ว
                  </p>
                </div>
                <div className="flex flex-row pt-[20px]">
                  <Image
                    src="/img-3.svg"
                    width={75}
                    height={75}
                    alt=""
                    priority={true}
                    className="mr-[20px]"
                  />
                  <div className="flex flex-col">
                    <p className="font-athitiMedium text-[18px] leading-[22px] text-[#4B5563] mb-[6px]">
                      เมืองไทยประกันภัย
                    </p>
                    <p className="font-athitiSemiBold text-[18px] leading-[22px] text-[#111827] mb-[6px]">
                      MTI 1 Easy SUV DG (กทม.และปริมณฑล)
                    </p>
                    <div className="flex flex-row gap-[10px]">
                      <div className="flex items-center justify-center border border-[#984333] w-[46px] h-[28px] rounded-[6px]">
                        <p className="font-athitiSemiBold text-[14px] leading-[20px] text-[#984333]">
                          ชั้น 1
                        </p>
                      </div>
                      <div className="flex items-center justify-center border border-[#F1F6F7] bg-[#F1F6F7] w-[65px] h-[28px] rounded-[6px]">
                        <p className="font-athitiSemiBold text-[14px] leading-[20px] text-[#984333]">
                          ซ่อมห้าง
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-[20px] h-px flex-grow bg-gray-200 border-0 rounded mb-[20px]"></hr>
                <div className="flex flex-col gap-y-[6px] mb-[20px]">
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#111827]">
                    หมายเลขทะเบียน : 1กข1234
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#111827]">
                    วันเริ่มต้นความคุ้มครอง : 01/11/2560
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#111827]">
                    วันเริ่มต้นความคุ้มครอง : 01/11/2560
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex flex-row gap-[6px] items-center justify-center border border-[#984333] w-[113px] h-[32px] rounded-[32px]">
                    <Image
                      src="/icon-24.svg"
                      width={20}
                      height={20}
                      alt=""
                      priority={true}
                    />
                    <p className="font-athitiSemiBold text-[14px] leading-[20px] text-[#984333]">
                      ดาวโหลด
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
