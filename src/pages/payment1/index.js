import { useState } from "react";
import Image from "next/image";
import FormCard from "../../app/components/templateComponent/form-card";
import TextOnLine from "../../app/components/textComponent/text-on-line";
import ButtonBrown from "@/app/components/button/btn-brown";

export default function Payment() {
  const [paymentOption, setPaymentOption] = useState("");

  const handleRadioClick = (e) => {
    console.log(e);
    setPaymentOption(e);
  };

  return (
    <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
      <div className="container mx-auto w-[89.285%] max-md:w-full py-9">
        <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
          การชำระเงิน
        </p>
        <p className="text-center font-athitiMedium leading-[30px] text-xl">
          ชำระตรงกับบริษัทไทยไพบูลย์ประกันภัย
        </p>

        <div className="pt-[24px] pb-6">
          <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
            <FormCard
              title="สรุปการสั่งซื้อประกันรถยนต์"
              text="center"
              bgTitle="#FDE68A"
              bgContent="#FFFFFF"
              paddingMbX={20}
            >
              <TextOnLine text="สรุปข้อมูลการชำระเงิน" />

              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row max-md:flex-col gap-[6px] justify-between">
                  <p className="font-athitiRegular text-[18px] leading-[22px]">
                    บจก.ประกันคุ้มภัย ชั้น 1
                  </p>
                  <p className="font-athitiRegular text-[18px] leading-[22px]">
                    26,700.00 บาท
                  </p>
                </div>
                <div className="flex flex-row max-md:flex-col gap-[6px] justify-between">
                  <p className="font-athitiRegular text-[18px] leading-[22px]">
                    ประกันภัยภาคบังคับ (พ.ร.บ.)
                  </p>
                  <p className="font-athitiRegular text-[18px] leading-[22px]">
                    622 บาท
                  </p>
                </div>
                <div className="flex flex-row max-md:flex-col gap-[6px] justify-between">
                  <p className="font-athitiRegular text-[18px] leading-[22px]">
                    ส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์
                  </p>
                  <p className="font-athitiRegular text-[18px] leading-[22px]">
                    50 บาท
                  </p>
                </div>
              </div>
              <hr className="h-px bg-[#F8F8F8] border-0" />
              <div className="flex flex-row max-md:flex-col gap-[6px] justify-between">
                <div>
                  <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                    ยอดเงินรวม
                  </p>
                  <p className="font-athitiRegular text-[16px] leading-[20px] text-[#808291]">
                    (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                  </p>
                </div>

                <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                  27,372.00 บาท
                </p>
              </div>

              <div className="max-w-[210px] w-full mx-auto mt-[40px]  flex items-center">
                  <ButtonBrown
                    onClick={() => {
                      
                    }}
                    text="ไปหน้าชำระเงิน"
                  />
                </div>
            </FormCard>
          </div>
        </div>
      </div>
    </div>
  );
}
