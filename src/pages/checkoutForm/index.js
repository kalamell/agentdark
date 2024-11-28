import NavLink from "@/app/components/navLink";
import CustomSelect from "@/app/components/customSelect";
import { useState, useEffect } from "react";
import InputCheck from "@/app/components/inputCheck";
import FormCard from "@/app/components/templateComponent/form-card";
import TextOnLine from "@/app/components/textComponent/text-on-line";
import Checkbox from "@/app/components/textComponent/checkbox";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonWhite from "@/app/components/button/btn-white";
import TableCard from "@/app/components/templateComponent/table-card";
import Image from "next/image";

export default function ComparesCar() {
  const [step, setStep] = useState(1);
  const [insuredInformation, setInsuredInformation] = useState(false);
  const [carInformation, setCarInformation] = useState(false);
  const [orderingInformation, setOrderingInformation] = useState(false);
  const [protectionDetails, setprotectionDetails] = useState(false);

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยรถยนต์ TOYOTA C-HR 1.8cc 4 Door ปี2023", link: "#" },
  ];

  const title = [
    { value: "1", label: "option 1" },
    { value: "2", label: "option 2" },
  ];

  const DamageToCars = [
    {
      protection: "ความเสียหายต่อรถยนต์ - Test1",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [{ protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" }],
    },
    {
      protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [],
    },
    {
      protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
      insuranceFund: "ไม่คุ้มครอง",
      sub: [],
    },
  ];

  const ThirdPartyLiability = [
    {
      protection:
        "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ. - Test1",
      insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
      sub: [{ protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" }],
    },
    {
      protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [],
    },
  ];

  const ProtectedAccordingDocuments = [
    {
      protection: "อุบัติเหตุส่วนบุคคล - Test1",
      insuranceFund: "",
      sub: [
        {
          protection: "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
          insuranceFund: "100,000 บาท (ต่อคน)",
        },
        {
          protection: "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
          insuranceFund: "100,000 บาท (ต่อคน)",
        },
      ],
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    console.log(selectedTitle);
  }, [selectedTitle]);

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9 min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto">
          <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-lg:leading-[38px] max-lg:text-[28px]">
            กรอกข้อมูล
            <br className="md:hidden" />
            เพื่อซื้อประกันรถยนต์
          </p>
          <div className="flex justify-between w-[630px] max-md:w-[330px] mx-auto">
            <div className="flex w-full justify-between gap-[120px] max-xl:gap-[60px] max-md:gap-[20px]  relative mt-[20px] mb-[36px]">
              <div className="flex flex-col items-center gap-[12px]">
                {step === 1 ? (
                  <Image
                    src="/circle-check.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : (
                  <Image
                    src="/check.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                )}
                <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#984333] z-10 max-md:text-[18px] text-center">
                  ข้อมูลผู้เอาประกัน
                </p>
              </div>
              <hr
                className={`h-px ${
                  step >= 2 ? "border-[#984333]" : "border-[#808291]"
                }  border-[1px] absolute w-[220px] max-md:left-[60px] max-md:w-[120px] top-[15px] left-[90px]`}
              />
              <div className="flex flex-col items-center gap-[12px]">
                {step === 1 ? (
                  <Image
                    src="/circle.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : step === 2 ? (
                  <Image
                    src="/circle-check.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : step > 2 ? (
                  <Image
                    src="/check.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : null}
                <p
                  className={`font-athitiSemiBold text-[22px] leading-[30px] max-md:text-[18px] text-center ${
                    step >= 2 ? "text-[#984333]" : "text-[#808291]"
                  }`}
                >
                  ข้อมูลรถยนต์
                </p>
              </div>
              <hr
                className={`h-px ${
                  step >= 3 ? "border-[#984333]" : "border-[#808291]"
                } border-[1px] absolute w-[220px] max-md:left-[180px] max-md:w-[110px] top-[15px] left-[330px]`}
              />
              <div className="flex flex-col items-center gap-[12px]">
                {step < 3 ? (
                  <Image
                    src="/circle.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : step === 3 ? (
                  <Image
                    src="/circle-check.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : step === 4 ? (
                  <Image
                    src="/check.svg"
                    width={32}
                    height={32}
                    alt="promptpay"
                    priority={true}
                    className="z-20"
                  />
                ) : null}
                <p
                  className={`font-athitiSemiBold text-[22px] leading-[30px] max-md:text-[18px] text-center ${
                    step == 4 ? "text-[#984333]" : "text-[#808291]"
                  }`}
                >
                  ข้อมูลการสั่งซื้อ
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] px-[24px] max-md:px-[20px] py-[24px] rounded-[12px] flex flex-col gap-y-[24px]">
            {step >= 2 ? (
              <div>
                <div
                  onClick={() => {
                    setInsuredInformation(!insuredInformation);
                  }}
                  className={`cursor-pointer flex bg-[#FDE68A] p-[16px] items-center justify-between ${
                    insuredInformation
                      ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-tl-2xl rounded-tr-2xl"
                      : "rounded-2xl"
                  }`}
                >
                  <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="30" height="30" rx="15" fill="#181B31" />
                      <path
                        d="M8 16L12 20L22 10"
                        stroke="#FDE68A"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p>ข้อมูลผู้เอาประกัน</p>
                  </div>

                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      insuredInformation ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <path
                      d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                      stroke="#111928"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {insuredInformation ? (
                  <div className="bg-[#ffffff] flex flex-col gap-[12px] p-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)]  rounded-b-2xl">
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      นางสาวอารีย์ ธรรมรส
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      วันเกิด : 23/07/2528
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      เลขบัตรประชาชน : 0123456789123
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      โทรศัพท์มือถือ : 0987654321
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      อีเมล : aree.t@gmail.com
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      197/32 หมู่ 17 ซอยมหาชัย ถนนบางนา-ตราด บางแก้ว บางพลี
                      สมุทรปราการ 10540
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
            {step >= 3 ? (
              <div>
                <div
                  onClick={() => {
                    setCarInformation(!carInformation);
                  }}
                  className={`cursor-pointer flex bg-[#FED7AA] p-[16px] items-center justify-between ${
                    carInformation
                      ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-tl-2xl rounded-tr-2xl"
                      : "rounded-2xl"
                  }`}
                >
                  <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="30" height="30" rx="15" fill="#181B31" />
                      <path
                        d="M8 16L12 20L22 10"
                        stroke="#FED7AA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>ข้อมูลรถยนต์</p>
                  </div>

                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${carInformation ? "rotate-0" : "rotate-180"}`}
                  >
                    <path
                      d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                      stroke="#111928"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {carInformation ? (
                  <div className="bg-[#ffffff] flex flex-col gap-[12px] p-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-b-2xl">
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      หมายเลขทะเบียน : 1กข1234
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      เลขตัวรถ (ตัวถัง) : MMTJJKK10FH006002
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      ติดตั้งแก็ส : ไม่ติดตั้ง
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
            {step >= 4 ? (
              <div>
                <div
                  onClick={() => {
                    setOrderingInformation(!orderingInformation);
                  }}
                  className={`cursor-pointer flex bg-[#F1F5D8] p-[16px] items-center justify-between ${
                    orderingInformation
                      ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-tl-2xl rounded-tr-2xl"
                      : "rounded-2xl"
                  }`}
                >
                  <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="30" height="30" rx="15" fill="#181B31" />
                      <path
                        d="M8 16L12 20L22 10"
                        stroke="#F1F5D8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>ข้อมูลการสั่งซื้อ</p>
                  </div>

                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${step >= 4 ? "rotate-180" : "rotate-0"}`}
                  >
                    <path
                      d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                      stroke="#111928"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {orderingInformation ? (
                  <div className="bg-[#ffffff] flex flex-col gap-[12px] p-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-b-2xl">
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      หมายเลขทะเบียน : 1กข1234
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      เลขตัวรถ (ตัวถัง) : MMTJJKK10FH006002
                    </p>
                    <p className="font-athitiMedium text-[18px] leading-[22px] ">
                      ติดตั้งแก็ส : ไม่ติดตั้ง
                    </p>
                  </div>
                ) : null}
              </div>
            ) : null}
            {step === 1 ? (
              <FormCard
                title="ข้อมูลผู้เอาประกัน"
                text="center"
                bgTitle="#FDE68A"
                bgContent="#FFFBEB"
                paddingMbX="0"
              >
                <div className="md:bg-[#FFFFFF] rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ข้อมูลผู้เอาประกัน" />
                  <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                    <CustomSelect
                      title="คำนำหน้าชื่อ"
                      placeholderBottom="โปรดกรอกคำนำหน้าชื่อ"
                      required
                      options={title}
                      onChange={setSelectedTitle}
                      defaultLabel="คำนำหน้าชื่อ"
                    />

                    <InputCheck
                      title="ชื่อ"
                      placeholderBottom="โปรดกรอกชื่อ"
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="นามสกุล"
                      placeholderBottom="โปรดกรอกนามสกุล"
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="วัน/เดือน/ปี เกิด"
                      placeholderBottom="โปรดกรอกวัน/เดือน/ปี เกิด"
                      type="date"
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="เลขบัตรประชาชน 13 หลัก"
                      placeholderBottom="ตัวอย่าง 0123456789123"
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="โทรศัพท์มือถือ"
                      placeholderBottom="ตัวอย่าง 0987654321"
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="อีเมล"
                      placeholderBottom="ตัวอย่าง example@gmail.com"
                      type="email"
                      valid=""
                      onChange=""
                    />
                  </div>
                </div>

                <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่หน้ากรมธรรม์" />

                  <div className="grid grid-cols-[15%_15%_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                    <InputCheck title="บ้านเลขที่" valid="" onChange="" />

                    <InputCheck title="หมู่" valid="" onChange="" />

                    <InputCheck title="หมู่บ้าน" valid="" onChange="" />

                    <InputCheck
                      title="โครงการ"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ชั้น"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ห้อง"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ซอย"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <InputCheck
                      title="ถนน"
                      required={false}
                      valid=""
                      onChange=""
                    />

                    <div className="md:col-start-1 md:col-end-3">
                      <CustomSelect
                        title="จังหวัด"
                        placeholderBottom="โปรดเลือกจังหวัด"
                        required
                        options={title}
                        onChange=""
                        defaultLabel="เลือกจังหวัด"
                      />
                    </div>

                    <CustomSelect
                      title="อำเภอ / เขต"
                      placeholderBottom="โปรดเลือกอำเภอ / เขต"
                      required
                      options={title}
                      onChange=""
                      defaultLabel="เลือกอำเภอ / เขต"
                    />

                    <CustomSelect
                      title="ตำบล / แขวง"
                      placeholderBottom="โปรดเลือกตำบล / แขวง"
                      required
                      options={title}
                      onChange=""
                      defaultLabel="เลือกตำบล / แขวง"
                    />

                    <div className="md:col-start-1 md:col-end-3">
                      <InputCheck
                        title="รหัสไปรษณีย์"
                        placeholderBottom="โปรดกรอกรหัสไปรษณีย์"
                        required={false}
                        valid=""
                        onChange=""
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#FFFFFF] md:rounded-[12px] max-md:bg-[#FFFBEB] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่ในการจัดส่งเอกสาร" />
                  <Checkbox text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />
                </div>

                <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                  <TextOnLine text="ที่อยู่ในการออกใบกำกับภาษี" />
                  <Checkbox text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />
                </div>

                <div className="max-w-[210px] w-full mx-auto mt-[40px]  flex items-center">
                  <ButtonBrown
                    onClick={() => {
                      setStep(2);
                    }}
                    text="ถัดไป"
                  />
                </div>
              </FormCard>
            ) : step === 2 ? (
              <FormCard
                title="ข้อมูลรถยนต์"
                text="center"
                bgTitle="#FED7AA"
                bgContent="#FFF7ED"
                paddingMbX="20"
              >
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                  <div className="grid grid-cols-[60%_40%]">
                    <InputCheck
                      title="หมายเลขทะเบียน"
                      placeholderBottom="*ตัวอย่าง กข1234 หรือ 1กข1234"
                      valid=""
                      onChange=""
                      roundedLeft
                    />
                    <div className="max-md:mt-[26px]">
                      <CustomSelect
                        options={title}
                        onChange={setSelectedTitle}
                        defaultLabel="จังหวัด"
                        roundedLeftNone
                      />
                    </div>
                  </div>

                  <InputCheck
                    title="เลขตัวรถ (ตัวถัง)"
                    placeholderBottom="*ตัวอย่าง MMTJJKK10FH006002"
                    valid=""
                    onChange=""
                  />

                  <CustomSelect
                    title="ติดตั้งแก็ส"
                    required
                    options={title}
                    onChange={setSelectedTitle}
                    defaultLabel="ไม่ติดตั้ง"
                  />
                </div>
                <div className="flex flex-col gap-[20px]">
                  <p className="font-athitiMedium text-[#808291] text-[16px] leading-[20px]">
                    * หมายเหตุ มีผลต่อการคิดคำนวณเบี้ยประกันภัย
                  </p>
                  <hr className="h-px bg-[#FFFFFF] border-0" />
                  <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                    <ButtonWhite
                      onClick={() => {
                        setStep(1);
                      }}
                      text="ย้อนกลับ"
                    />
                    <ButtonBrown
                      onClick={() => {
                        setStep(3);
                      }}
                      text="ถัดไป"
                    />
                  </div>
                </div>
              </FormCard>
            ) : step === 3 ? (
              <FormCard
                title="ข้อมูลการสั่งซื้อ"
                text="center"
                bgTitle="#F1F5D8"
                bgContent="#FBFCF3"
                paddingMbX={20}
              >
                <TextOnLine text="รายละเอียดประกันภัย" />

                <p className="font-athitiSemiBold text-base leading-[22px]">
                  ระบุผู้ขับขี่
                </p>

                <div className="grid grid-cols-[auto_37%_37%] items-center max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                  <CustomSelect
                    title="คำนำหน้าชื่อ"
                    options={title}
                    onChange=""
                    defaultLabel="คำนำหน้าชื่อ"
                  />
                  <InputCheck title="ชื่อ" valid="" onChange="" />
                  <InputCheck title="นามสกุล" valid="" onChange="" />
                  <p className="font-athitiSemiBold text-base leading-[20px]">
                    ระยะเวลาคุ้มครอง 1 ปี วันเริ่มต้นความคุ้มครอง
                    <span className="text-[#FF0000]">*</span>
                  </p>
                  <InputCheck
                    type="date"
                    required={false}
                    valid=""
                    onChange=""
                  />
                </div>

                <TextOnLine text="รายละเอียดประกันภัย" />
                <Checkbox text="ซื้อประกันภัยภาคบังคับ (พ.ร.บ.)" />

                <div className="grid grid-cols-[auto_37%_37%] items-center max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                  <p className="font-athitiSemiBold text-base leading-[20px]">
                    ระยะเวลา : 1 ปี วันเริ่มต้นความคุ้มครอง
                    <span className="text-[#FF0000]">*</span>
                  </p>
                  <InputCheck
                    type="date"
                    required={false}
                    valid=""
                    onChange=""
                  />
                </div>

                <p className="font-athitiMedium  text-[#808291] text-[16px] leading-[20px]">
                  * เอกสารกรมธรรม์ภาคบังคับ (พ.ร.บ.)
                  เพื่อนำไปยื่นชำระภาษีประจำปีจะได้รับการจัดส่งให้คุณทางไปรษณีย์โดยไม่มีค่าใช้จ่ายเพิ่มเติม
                </p>

                <TextOnLine text="ค่าบริการจัดส่งเอกสาร" />

                <Checkbox text="จัดส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์ (+50 บาท)" />

                <p className="font-athitiMedium  text-[#808291] text-[16px] leading-[20px]">
                  * กรมธรรม์ประกันภัยภาคสมัครใจ (ประเภท 1, 2, 2+, 3+ หรือ 3)
                  จะได้รับการส่งให้คุณทางอีเมลภายหลังการชำระเงินเสร็จสิ้นสมบูรณ์ในกรณีที่คุณ
                  ต้องการได้รับกรมธรรม์ภาคสมัครใจทางไปรษณีย์
                  กรุณาชำระค่าบริการจัดส่ง 50 บาท
                </p>

                <hr className="h-px bg-[#FFFFFF] border-0" />

                <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                  <ButtonWhite
                    onClick={() => {
                      setStep(2);
                    }}
                    text="ย้อนกลับ"
                  />
                  <ButtonBrown
                    onClick={() => {
                      setStep(4);
                    }}
                    text="ถัดไป"
                  />
                </div>
              </FormCard>
            ) : step === 4 ? (
              <FormCard
                title="สรุปการสั่งซื้อประกันรถยนต์"
                text="center"
                bgTitle="#E7E5E4"
                bgContent="#F5F5F4"
                paddingMbX="20"
              >
                <TextOnLine text=" สรุปข้อมูลการชำระเงิน" />
                <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end gap-[14px] max-md:gap-[6px] font-athitiMedium text-[18px] leading-[22px]">
                  <p>บจก.ประกันคุ้มภัย ชั้น 1</p>
                  <p className="max-md:pb-[12px]">26,700.00 บาท</p>
                  <p>ประกันภัยภาคบังคับ (พ.ร.บ.)</p>
                  <p className="max-md:pb-[12px]">622 บาท</p>
                  <p>ส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์</p>
                  <p className="max-md:pb-[12px]">50 บาท</p>
                </div>
                <hr className="h-px bg-[#FFFFFF] border-0" />
                <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end">
                  <p className="font-athitiSemiBold text-[22px] leading-[20px] text-start">
                    ยอดเงินรวม <br />
                    <span className="font-athitiMedium text-[16px] leading-[20px] text-[#808291]">
                      (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                    </span>
                  </p>
                  <p className="font-athitiSemiBold text-[22px] leading-[40px]">
                    27,372.00 บาท
                  </p>
                </div>

                <div
                  onClick={() => {
                    setprotectionDetails(!protectionDetails);
                  }}
                  className="bg-[#E7E5E4] px-[16px] py-[13px] rounded-[12px] justify-between flex  items-center cursor-pointer"
                >
                  <p className="font-athitiSemiBold text-[18px] leading-[22px]">
                    รายละเอียดความคุ้มครอง
                  </p>
                  <svg
                    width="12"
                    height="7"
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      !protectionDetails ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <path
                      d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                      stroke="#111928"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>

                {protectionDetails ? (
                  <>
                    <TableCard
                      bgTitle="#E7E5E4"
                      bgContent="#FFFFFF"
                      title="ความเสียหายต่อรถยนต์"
                      props={DamageToCars}
                    />

                    <TableCard
                      bgTitle="#E7E5E4"
                      bgContent="#FFFFFF"
                      title="ความรับผิดต่อบุคคลภายนอก"
                      props={ThirdPartyLiability}
                    />

                    <TableCard
                      bgTitle="#E7E5E4"
                      bgContent="#FFFFFF"
                      title="ความคุ้มครองตามเอกสารแนบท้าย"
                      props={ProtectedAccordingDocuments}
                    />
                  </>
                ) : null}

                <p className="font-athitiMedium text-[16px] leading-[20px] text-[#808291] text-center">
                  การกดยืนยันหมายถึงคุณได้ยอมรับ&nbsp;
                  <br className="md:hidden" />
                  <span className="underline">ในข้อตกลงและเงื่อนไข</span>
                  &nbsp;แล้ว
                  <br />
                  คำเตือน :
                  ผู้ซื้อควรทำความเข้าใจในรายละเอียดความคุ้มครองและเงื่อนไข
                  ก่อนตัดสินใจซื้อทุกครั้ง
                </p>
                <hr className="h-px bg-[#FFFFFF] border-0" />
                <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[10px] md:mx-auto">
                  <ButtonWhite
                    onClick={() => {
                      setStep(3);
                    }}
                    text="ย้อนกลับ"
                  />
                  <ButtonBrown text="ยืนยันคำสั่งซื้อ" />
                </div>
              </FormCard>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
