import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputCheck from "../../app/components/inputCheck";
import TemplateLogin from "../../app/components/templateComponent/login";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonLine from "@/app/components/button/btn-line";
import ButtonOutline from "@/app/components/button/btn-outline";

export default function NotRegisterold() {
  const [step, setStep] = useState(1);

  return (
    <TemplateLogin
      title="ซื้อเลยไม่ลงทะเบียน"
      subTitle="กรอกเบอร์โทรศัพท์ของคุณเพื่อยืนยัน OTP ทาง SMS"
    >
      <div className="flex flex-col gap-y-4">
        {step === 1 && (
          <>
            <InputCheck
              onKeyPress
              type="text"
              title=" เบอร์โทรศัพท์"
              placeholderBottom="โปรดกรอกเบอร์โทรศัพท์"
              valid=""
              onChange=""
            />
            <ButtonBrown text="รับรหัส OTP" />
          </>
        )}

        {step === 2 && (
          <>
            <InputCheck
              type="text"
              title={
                <>
                  ยืนยันรหัส โปรดกรอกรหัส OTP (REF:SFMAQR) <br />
                  ที่ได้รับทาง SMS ที่ 083-XXX-5566
                </>
              }
              placeholder="รหัส OTP มีอายุการใช้งาน 5 นาที"
              placeholderBottom="รหัส OTP มีอายุการใช้งาน 5 นาที"
              valid=""
              onChange=""
            />
            <ButtonBrown text="  ยืนยัน OTP" />
          </>
        )}

        {step === 3 && (
          <>
            <p className="font-athitiMedium text-xl text-[#374151] leading-[30px] text-center">
              รับส่วนลดทันที 20% <br className="md:hidden" />
              สำหรับการซื้อประกันกับเรา
            </p>
            <ButtonLine link="#" />

            <div className="grid grid-cols-2 gap-x-3 pt-5">
              <ButtonOutline text="กลับไปหน้าค้นหา" link="#" />
              <ButtonOutline text="เลือกซื้อประกัน" link="#" />
            </div>
          </>
        )}
      </div>
    </TemplateLogin>
  );
}
