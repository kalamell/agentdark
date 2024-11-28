import Image from "next/image";

export default function PaymentUnsuccess() {
  return (
    <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
      <div className="container mx-auto w-[43.303%] max-lg:w-[60%] max-md:w-full py-9">
        <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
          การชำระเงิน
        </p>
        <div className="pt-[24px] pb-6">
          <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-6 shadow-md">
            <div className="bg-[#FFFFFF] w-full rounded-[12px]">
              <div className="flex flex-col py-[20px] px-[24px]">
                <div className="flex flex-col items-center">
                  <Image
                    src="/icon-25.svg"
                    width={48}
                    height={48}
                    alt=""
                    priority={true}
                  />
                  <p className="font-athitiSemiBold pt-[10px] text-[22px] leading-[30px] text-[#DC2626]">
                    ทำรายการซื้อไม่สำเร็จ
                  </p>
                  <p className="font-athitiRegular text-[18px] leading-[22px] text-[#808291] text-center block max-md:hidden">
                    ระบบไม่สามารถส่ง SMS ไปยังท่านได้
                    <br />
                    <u>ติดต่อเจ้าหน้าที่</u> หรือทำรายการส่ง sms ใหม่อีกครั้ง
                  </p>
                  <p className="font-athitiRegular text-[18px] leading-[22px] text-[#808291] text-center hidden max-md:block">
                    ระบบไม่สามารถส่ง SMS ไปยังท่านได้
                    <br />
                    <u>ติดต่อเจ้าหน้าที่</u>
                    <br />
                    หรือทำรายการส่ง sms ใหม่อีกครั้ง
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center pb-[24px]">
                <div className="flex items-center justify-center border border-[#9CA3AF] w-[264px] h-[50px] rounded-[50px]">
                  <p className="font-athitiMedium text-[22px] leading-[24px] text-[#181B31CC]">
                    กลับไปหน้าชำระเงิน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
