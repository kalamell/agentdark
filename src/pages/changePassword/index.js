import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputCheck from "../../app/components/inputCheck";
import NavLink from "../../app/components/navLink";
import ButtonBrown from "../../app/components/button/btn-brown";
import ButtonWhite from "../../app/components/button/btn-white";

export default function ChangePassword() {
  const [step, setStep] = useState(2);

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "เปลี่ยนรหัสผ่านใหม่", link: "/changePassword" },
  ];

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[582px] max-md:w-full py-9">
          <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
            เปลี่ยนรหัสผ่านใหม่
          </p>
          <p className="text-center font-athitiMedium leading-[30px] text-xl ">
            กำหนดรหัสผ่านใหม่
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
              <div className="bg-[#fff] rounded-xl p-6 flex flex-col gap-y-9">
                <div className="flex flex-col gap-y-4">
                  {step === 1 && (
                    <>
                      <InputCheck
                        type="password"
                        title="รหัสผ่านปัจจุบัน"
                        placeholder="รหัสผ่านปัจจุบัน"
                        valid=""
                        onChange=""
                      />

                      <InputCheck
                        type="password"
                        title="รหัสผ่านใหม่"
                        placeholder="รหัสผ่านใหม่"
                        placeholderBottom={
                          <>
                            โปรดกรอกรหัสผ่านยาว 6-10 ตัวอักษร
                            <br className="md:hidden" />
                            มีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่
                            <br className="max-md:hidden" />
                            และพิมพ์เล็ก
                            <br className="md:hidden" />
                            (A-Z, a-z) มีตัวเลข (0-9) และอักขระพิเศษ
                            <br className="md:hidden" />
                            (@ # - ! ,)
                          </>
                        }
                        valid=""
                        onChange=""
                      />

                      <InputCheck
                        type="password"
                        title="ยืนยันรหัสผ่านใหม่"
                        placeholder="ยืนยันรหัสผ่านใหม่"
                        placeholderBottom=""
                        valid=""
                        onChange=""
                      />

                      <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                        <ButtonWhite link="#" text="ย้อนกลับ" />
                        <ButtonBrown text="ถัดไป" />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <div className="flex flex-col gap-y-4 items-center">
                      <Image
                        src="/icon-22.svg"
                        width={48}
                        height={48}
                        alt="ประกันการเดินทาง"
                        priority={true}
                      />
                      <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                        เปลี่ยนรหัสผ่านเรียบร้อยค่ะ
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
