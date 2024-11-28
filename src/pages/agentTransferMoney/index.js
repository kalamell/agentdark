import CustomSelect from "../../app/components/customSelect";
import { useState } from "react";
import FileInput from "../../app/components/fileInput";
import InputCheck from "../../app/components/inputCheck";
import FormCard from "../../app/components/templateComponent/form-card";
import ButtonWhite from "../../app/components/button/btn-white";
import ButtonBrown from "../../app/components/button/btn-brown";
import Image from "next/image";

export default function AgentTransferMoney() {
  const gender = [
    { value: "", label: "หญิง" },
    { value: "", label: "ชาย" },
  ];

  return (
    <>
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)] py-9">
        <div className="container mx-auto">
          <h1 className="text-[#181B31] font-athitiBold text-[36px] leading-[48px] text-center">
            แบบฟอร์มแจ้งโอนเงิน
          </h1>
          <p className="text-[#181B31] pb-[12px] font-athitiMedium text-[20px] leading-[30px] text-center">
            โปรดกรอกข้อมูล
          </p>
          <div className="bg-[#ffffff] p-[24px] rounded-[12px] flex flex-col gap-y-[24px]">
            <FormCard
              title="แบบฟอร์มแจ้งโอนเงินค้ำประกัน"
              text="left"
              bgTitle="#E7E5E4"
              bgContent="#F5F5F4"
            >
              <div className="flex gap-[12px] max-md:pb-[20px]">
                <Image
                  src="/icon-23.svg"
                  width={20}
                  height={20}
                  alt="scb"
                  priority={true}
                />
                <p className="font-athitiSemiBold text-[#111827]">
                  ธนาคารไทยพาณิชย์&nbsp;
                  <span className="font-athitiMedium text-[#808291]">
                    <br className="md:hidden" />
                    ชื่อบัญชี&nbsp;
                  </span>
                  SINGHA BROKER COMPANY&nbsp;
                  <span className="font-athitiMedium text-[#808291]">
                    <br className="md:hidden" />
                    เลขที่บัญชี&nbsp;
                  </span>
                  246-9-00000-9
                </p>
              </div>
              <div className="grid grid-cols-[30%_15%_15%_auto] max-xl:grid-cols-[auto_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                <InputCheck
                  title="วันที่โอนเงิน"
                  type="date"
                  valid=""
                  onChange=""
                />

                <CustomSelect
                  title="เวลาโอนเงิน"
                  placeholderBottom="โปรดเลือกชั่วโมง"
                  options={gender}
                  onChange=""
                  defaultLabel="ชั่วโมง"
                />

                <CustomSelect
                  required={false}
                  placeholderBottom="โปรดเลือกนาที"
                  options={gender}
                  onChange=""
                  defaultLabel="นาที"
                />

                <FileInput
                  label="หลักฐานการโอน"
                  fileChange=""
                  placeholderBottom="โปรดอัพโหลดรูปหลักฐานการโอน"
                  id="transfer"
                  required
                />
              </div>
            </FormCard>

            <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
              <ButtonWhite text="ย้อนกลับ" />
              <ButtonBrown text="ส่งข้อมูล" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
