import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FileInput from "../../app/components/fileInput";
import NavLink from "../../app/components/navLink";
import ButtonWhite from "../../app/components/button/btn-white";
import ButtonBrown from "../../app/components/button/btn-brown";

export default function MyInsurances(props) {
  const [idCard, setIdCardCopy] = useState(null);
  const [carCopy, setCarCopy] = useState(null);
  const [additionalDoc, setAdditionalDoc] = useState(null);
  const [selectFile, setSelectFile] = useState(null);

  const navLink = [
    { nav: "หน้าแรก", link: "/home" },
    { nav: "ประกันภัยของฉัน", link: "/myInsurances" },
  ];
  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto max-md:w-full py-9">
          <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-md:leading-[38px]">
            ประกันภัยของฉัน
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 max-md:px-5 shadow-md flex flex-col">
              <p className="font-athitiMedium text-base max-md:text-lg text-[#808291] leading-[22px] pb-3">
                จ. 03 มิ.ย. 2567
              </p>

              <p className="bg-[#CFCFCF] rounded-t-xl flex flex-col font-athitiSemiBold text-[22px]  text-[#984333] leading-[30px] px-5 py-4">
                ทะเบียนรถ : 1กข 3959
              </p>

              <div className="bg-[#FFFFFF] p-6 max-md:px-5 rounded-b-xl flex flex-col gap-y-5">
                <div className="flex justify-between">
                  <p className="font-athitiSemiBold text-lg  text-[#808291] leading-[22px]">
                    ID: 1234567890
                  </p>

                  <p className="font-athitiSemiBold text-sm  text-[#CCE7F6] leading-[20px] bg-[#FEF3C7] rounded-[10px] py-0.5 px-2.5">
                    ส่งเอกสาร
                  </p>
                </div>

                <hr className="h-px bg-[#D1D5DB] border-0" />

                <FileInput
                  label="สำเนาบัตรประชาชน"
                  fileChange={setIdCardCopy}
                  id="idCardCopy"
                />
                <FileInput
                  label="สำเนารถ"
                  fileChange={setCarCopy}
                  id="carCopy"
                />
                <div className="grid grid-cols-2 gap-x-3 max-lg:grid-cols-1 max-lg:gap-y-5">
                  <FileInput
                    label="เอกสารเพิ่มเติม"
                    fileChange={setAdditionalDoc}
                    id="additionalDoc"
                  />
                  <FileInput
                    label="เลือกไฟล์"
                    fileChange={setSelectFile}
                    id="selectFile"
                  />
                </div>
                <div className="flex max-md:grid max-md:grid-cols-2 max-md:gap-y-5 max-md:justify-items-center">
                  <div className="p-[15px] max-md:p-3 w-fit">
                    <div className="relative">
                      <Image
                        src="/img-4.png"
                        width={120}
                        height={120}
                        alt="img"
                        priority={true}
                        className="max-md:w-full"
                      />
                      <svg
                        className="absolute top-[-10px] right-[-10px]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                        <g clipPath="url(#clip0_112_1714)">
                          <path
                            d="M8 16L16 8M8 8L16 16"
                            stroke="#991B1B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_112_1714">
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="6"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="p-[15px] max-md:p-3 w-fit">
                    <div className="relative">
                      <Image
                        src="/img-4.png"
                        width={120}
                        height={120}
                        alt="img"
                        priority={true}
                        className="max-md:w-full"
                      />
                      <svg
                        className="absolute top-[-10px] right-[-10px]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                        <g clipPath="url(#clip0_112_1714)">
                          <path
                            d="M8 16L16 8M8 8L16 16"
                            stroke="#991B1B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_112_1714">
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="6"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="p-[15px] max-md:p-3 w-fit">
                    <div className="relative">
                      <Image
                        src="/img-4.png"
                        width={120}
                        height={120}
                        alt="img"
                        priority={true}
                        className="max-md:w-full"
                      />
                      <svg
                        className="absolute top-[-10px] right-[-10px]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                        <g clipPath="url(#clip0_112_1714)">
                          <path
                            d="M8 16L16 8M8 8L16 16"
                            stroke="#991B1B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_112_1714">
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="6"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="p-[15px] max-md:p-3 w-fit">
                    <div className="relative">
                      <Image
                        src="/img-4.png"
                        width={120}
                        height={120}
                        alt="img"
                        priority={true}
                        className="max-md:w-full"
                      />
                      <svg
                        className="absolute top-[-10px] right-[-10px]"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                        <g clipPath="url(#clip0_112_1714)">
                          <path
                            d="M8 16L16 8M8 8L16 16"
                            stroke="#991B1B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_112_1714">
                            <rect
                              x="4"
                              y="4"
                              width="16"
                              height="16"
                              rx="6"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                <hr className="h-px bg-[#D1D5DB] border-0" />

                <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                  <ButtonWhite text="ยกเลิก" />
                  <ButtonBrown text="บันทึก" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
