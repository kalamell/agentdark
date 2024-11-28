import { useState } from "react";
import Image from "next/image";
import FormCard from "../../app/components/templateComponent/form-card";
import TextOnLine from "../../app/components/textComponent/text-on-line";
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

              <TextOnLine text="วิธีการชำระเงิน" />
              <div className="flex flex-col gap-y-4">
                <div
                  className={`gap-[24px] max-md:gap-[12px] ${
                    paymentOption == "promptpay"
                      ? "border-[#984333]"
                      : "border-gray-200"
                  } p-[16px] border rounded-[12px] border-[#984333] flex flex-col`}
                  onClick={() => handleRadioClick("promptpay")}
                >
                  <div className="flex flex-row">
                    <input
                      checked={`${
                        paymentOption == "promptpay" ? "checked" : ""
                      }`}
                      onChange={() => handleRadioClick("promptpay")}
                      type="radio"
                      className="w-[16px] h-[16px] mt-[6px] accent-[#984333]"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-col pl-[12px]">
                        <label
                          htmlFor="default-radio-1"
                          className="font-athitiMedium text-[#181B31] text-[16px] leading-[24px]"
                        >
                          QR Promptpay
                        </label>
                        <label
                          htmlFor="default-radio-1"
                          className="font-athitiRegular text-[#6B7280] text-[16px] leading-[20px]"
                        >
                          การชำระเงินผ่าน QR PromtPay
                        </label>
                      </div>
                      <div className="flex items-center justify-center">
                        <Image
                          src="/promptpay.svg"
                          width={68}
                          height={30}
                          alt="promptpay"
                          priority={true}
                        />
                      </div>
                    </div>
                  </div>

                  {paymentOption == "promptpay" ? (
                    <div className="flex items-center justify-center mb-[12px]">
                      <Image
                        src="/qrPromtPay.jpg"
                        width={200}
                        height={200}
                        alt="promptpay"
                        priority={true}
                      />
                    </div>
                  ) : null}
                </div>

                <div
                  className={`${
                    paymentOption == "true"
                      ? "border-[#984333]"
                      : "border-gray-200"
                  } p-[16px] border rounded-[12px] border-[#984333] flex flex-col`}
                  onClick={() => handleRadioClick("true")}
                >
                  <div className="flex flex-row">
                    <input
                      checked={`${paymentOption == "true" ? "checked" : ""}`}
                      onChange={() => handleRadioClick("true")}
                      type="radio"
                      className="w-[16px] h-[16px] mt-[6px] accent-[#984333]"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex flex-col pl-[12px]">
                        <label
                          htmlFor="default-radio-2"
                          className="font-athitiMedium text-[#181B31] text-[16px] leading-[24px]"
                        >
                          TrueMoney Wallet
                        </label>
                        <label
                          htmlFor="default-radio-2"
                          className="font-athitiRegular text-[#6B7280] text-[16px] leading-[20px]"
                        >
                          การชำระเงินผ่านทรูมันนี่ วอลเล็ท
                        </label>
                      </div>
                      <div className="flex items-center justify-center">
                        <Image
                          src="/trueMoney.svg"
                          width={54}
                          height={32}
                          alt="TrueMoney"
                          priority={true}
                        />
                      </div>
                    </div>
                  </div>

                  {paymentOption == "true" ? (
                    <div className="flex items-center justify-center mb-[12px]">
                      <Image
                        src="/true-scan.png"
                        width={200}
                        height={200}
                        alt="TrueMoney"
                        priority={true}
                      />
                    </div>
                  ) : null}
                </div>

                <div
                  className={`p-[16px] border rounded-[12px]  flex ${
                    paymentOption == "credit"
                      ? "border-[#984333]"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleRadioClick("credit")}
                >
                  <input
                    onChange={() => handleRadioClick("credit")}
                    checked={`${paymentOption == "credit" ? "checked" : ""}`}
                    type="radio"
                    className="w-[16px] h-[16px] mt-[6px] accent-[#984333]"
                  />
                  <div className="flex flex-row items-center justify-between w-[-webkit-fill-available]">
                    <div className="flex flex-col pl-[12px]">
                      <label
                        htmlFor="default-radio-3"
                        className="font-athitiSemiBold text-[#181B31] text-[16px] leading-[24px]"
                      >
                        Credit Card / Debit Card
                      </label>
                      <label
                        htmlFor="default-radio-3"
                        className="font-athitiRegular text-[#6B7280] text-[16px] leading-[20px]"
                      >
                        การชำระเงินผ่านบัตรเครดิต/เดบิต
                      </label>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-[16px] border rounded-[12px]  flex ${
                    paymentOption == "cash"
                      ? "border-[#984333]"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleRadioClick("cash")}
                >
                  <input
                    onChange={() => handleRadioClick("cash")}
                    checked={`${paymentOption == "cash" ? "checked" : ""}`}
                    type="radio"
                    className="w-[16px] h-[16px] mt-[6px] accent-[#984333]"
                  />
                  <div className="flex flex-row items-center justify-between w-[-webkit-fill-available]">
                    <div className="flex flex-col pl-[12px]">
                      <label
                        htmlFor="default-radio-3"
                        className="font-athitiSemiBold text-[#181B31] text-[16px] leading-[24px]"
                      >
                        แบบผ่อนเงินสด
                      </label>
                      <label
                        htmlFor="default-radio-3"
                        className="font-athitiRegular text-[#6B7280] text-[16px] leading-[20px]"
                      >
                        การชำระเงินแบบผ่อนเงินสดชำระ 3, 6 หรือ 10 งวด
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </FormCard>
          </div>
        </div>
      </div>
    </div>
  );
}
