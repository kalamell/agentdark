import Image from "next/image";
import Link from "next/link";
import FormCard from "../components/templateComponent/form-card";
import useClickOutside from "./useClickOutside";
import TableCard from "../components/templateComponent/table-card";
import { useState, useEffect, useRef } from "react";
import applicationStore from "@/store/applicationStore";

import Complete from "@/app/components/complete";
export default function MyInsurances(props) {
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState("");

  const [popupDetails, setPopupDetails] = useState(false);
  const [indexDetails, setIndexDetails] = useState(1);

  const { createSupport } = applicationStore();

  const selectRef = useRef(null);
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const closeDropdown = () => setIsOpenDownload(false);
  useClickOutside(selectRef, closeDropdown);

  useEffect(() => {
    if (popupDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popupDetails]);

  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };

  const dateDiffInDays = (date1, date2) => {
    // Convert both dates to milliseconds
    const diffTime = Math.abs(new Date(date2) - new Date());
    // Convert the difference to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const formatDate = (date) => {
    const startDate = new Date(date);
    if (!isNaN(startDate)) {
      const fmt = `${String(startDate.getDate()).padStart(2, "0")}/${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}/${startDate.getFullYear()}`;
      return fmt;
    }
    return "";
  };

  const handleCreateSupport = async (id) => {
    try {
      const mydata = await createSupport(id);
      console.log(mydata);
      setTextWarning("ส่งข้อมูลถึงเจ้าหน้าที่เรียบร้อย");
      setIsOpenWarning(true);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(props.insurances.data);

  return (
    <>
      <Complete
        id="validateAgentForm"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
      />

      {props.insurances.data
        ? props.insurances.data.map((item, index) => (
            <div key={index}>
              {/*<p className="font-athitiMedium text-base max-md:text-lg text-[#808291] leading-[22px] pb-3">
            { item.status == 'New' || item.status == null ? '' :  formatDate(item.start) }
          </p>*/}

              <FormCard
                title={
                  item.status === "New" || item.status == null
                    ? "อยู่ระหว่างขั้นตอนการสั่งซื้อ"
                    : item.covered?.car?.no?.length > 1
                    ? `ทะเบียนรถ : ${item.covered.car.no[0]} ${item.covered.car.no[1]}`
                    : "ทะเบียนรถข้อมูลไม่ครบ"
                }
                text="left"
                bgTitle={`${
                  item.status == "New" || item.status == null
                    ? `#cccccc`
                    : `#FDE68A`
                }`}
                bgContent="#FFFFFF"
                paddingMbX={20}
              >
                <div className="flex justify-between items-center max-md:flex-col max-md: gap-2">
                  <p className="font-athitiSemiBold text-lg text-[#808291] leading-[22px]">
                    {"วันที่สั่งซื้อ " + formatDate(item.created_at)}
                  </p>

                  <div className="flex gap-2">
                    {(item.status == "New" || item.status == null) && (
                      <p className="whitespace-nowrap font-athitiSemiBold text-sm  text-[#000] leading-[20px] bg-[#cccccc] rounded-[10px] py-0.5 px-2.5">
                        บันทึกร่าง
                      </p>
                    )}

                    {(item.status == "Quotation") && (
                      <p className="whitespace-nowrap font-athitiSemiBold text-sm  text-[#000] leading-[20px] bg-[#cccccc] rounded-[10px] py-0.5 px-2.5">
                        ใบเสนอราคา
                      </p>
                    )}

                    {item.status == "Paid" && (
                      <p className="font-athitiSemiBold text-sm  text-[#ffffff] leading-[20px] bg-[#10B981] rounded-[10px] py-0.5 px-2.5">
                        คุ้มครอง
                      </p>
                    )}

                    {item.status == "verify" && (
                      <p className="font-athitiSemiBold text-sm  text-[#991B1B] leading-[20px] bg-[#FEE2E2] rounded-[10px] py-0.5 px-2.5">
                        ตรวจสภาพรถยนต์
                      </p>
                    )}

                    {item.status == "Pending" && (
                      <p className="font-athitiSemiBold text-sm  text-[#991B1B] leading-[20px] bg-[#FEE2E2] rounded-[10px] py-0.5 px-2.5">
                        ชำระเงินไม่สำเร็จ
                      </p>
                    )}

                    {item.status == "Underwrite" && (
                      <p className="font-athitiSemiBold text-sm  text-[#000000] leading-[20px] bg-[#FEF3C7] rounded-[10px] py-0.5 px-2.5">
                        รอตรวจสภาพรถ
                      </p>
                    )}

                    {/*item.status !== "Active" ? (
                      <p className="font-athitiSemiBold text-sm  text-[#991B1B] leading-[20px] bg-[#FEE2E2] rounded-[10px] py-0.5 px-2.5">
                        {item.status}
                      </p>
                    ) : null*/}

                    {item.status == "Document" && (
                      <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#FEF3C7] rounded-[10px] py-0.5 px-2.5">
                        ส่งเอกสาร
                      </p>
                    )}

                    {item.status == "CheckOut" && (
                      <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#FEE2E2] rounded-[10px] py-0.5 px-2.5">
                        รอจ่ายเงิน
                      </p>
                    )}

                  </div>
                </div>
                <hr className="h-px bg-[#D1D5DB] border-0" />
                <div className="flex justify-between gap-3 max-lg:flex-col ">
                  <div className="flex  gap-x-5">
                    <Image
                      src={`/insurances/${item.package.insurer.code}.svg`}
                      width={75}
                      height={75}
                      alt={item.package.insurer.name}
                      priority={true}
                    />

                    <div className="flex flex-col gap-y-1.5">
                      <p className="font-athitiMedium text-lg  text-[#4B5563] leading-[22px]">
                        {item.package.insurer.name}
                      </p>
                      <p className="font-athitiSemiBold text-lg  text-[#111827] leading-[22px]">
                        {item.package.name}
                      </p>
                      <div className="flex gap-x-2.5">
                        <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] border border-[#984333] rounded-md py-[3px] px-2.5">
                          ชั้น {filterclass[item.package.class]}
                        </p>
                        <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#F1F6F7] rounded-md py-[3px] px-2.5">
                          ซ่อม{item.package.garage == "No" ? "อู่" : "ห้าง"}
                        </p>
                      </div>
                    </div>
                  </div>
                  {item.stop ? (
                    <>
                      <div className="flex flex-col items-end  max-lg:items-start gap-y-3">
                        <p className="font-athitiMedium text-base  text-[#065F46] leading-[20px] bg-[#ECFDF5] py-0.5 px-2.5 w-fit rounded-[10px]">
                          เหลือ {dateDiffInDays(item.start, item.stop)} วัน
                        </p>
                        <p className="font-athitiMedium text-lg max-md:text-base max-md:leading-[20px]  text-[#6B7280] leading-[22px] flex gap-x-1.5">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.00003 2C5.44775 2 5.00003 2.44772 5.00003 3V4H4.00003C2.89546 4 2.00003 4.89543 2.00003 6V16C2.00003 17.1046 2.89546 18 4.00003 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7.00003V3C7.00003 2.44772 6.55232 2 6.00003 2ZM6.00003 7C5.44775 7 5.00003 7.44772 5.00003 8C5.00003 8.55228 5.44775 9 6.00003 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6.00003Z"
                              fill="#9CA3AF"
                            />
                          </svg>
                          <span>
                            {" "}
                            วันที่คุ้มครอง {formatDate(item.start)} -{" "}
                            {formatDate(item.stop)}
                          </span>
                        </p>
                      </div>
                    </>
                  ) : null}
                </div>

                {props.payment && (
                  <div className="bg-[#ffffff] border px-6 py-4">
                    <div className="flex justify-between items-center max-md:flex-col max-md:gap-y-1.5">
                      <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                        การชำระเงิน
                      </p>
                      <button
                        type="button"
                        className="fill-[#984333] hover:fill-[#ffffff] hover:text-[#ffffff]  hover:bg-[#984333] text-[#984333] flex bg-[#FEE042] gap-x-1.5 rounded-[50px] py-[13px] px-[34px]"
                      >
                        <svg
                          width="16"
                          height="20"
                          viewBox="0 0 16 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.800049 2.80039C0.800049 1.47491 1.87456 0.400391 3.20005 0.400391H8.70299C9.33951 0.400391 9.94996 0.653247 10.4 1.10333L14.4971 5.20039C14.9472 5.65048 15.2 6.26093 15.2 6.89745V17.2004C15.2 18.5259 14.1255 19.6004 12.8 19.6004H3.20005C1.87456 19.6004 0.800049 18.5259 0.800049 17.2004V2.80039ZM3.20005 10.0004C3.20005 9.33765 3.73731 8.80039 4.40005 8.80039H11.6C12.2628 8.80039 12.8 9.33765 12.8 10.0004C12.8 10.6631 12.2628 11.2004 11.6 11.2004H4.40005C3.73731 11.2004 3.20005 10.6631 3.20005 10.0004ZM4.40005 13.6004C3.73731 13.6004 3.20005 14.1376 3.20005 14.8004C3.20005 15.4631 3.73731 16.0004 4.40005 16.0004H11.6C12.2628 16.0004 12.8 15.4631 12.8 14.8004C12.8 14.1376 12.2628 13.6004 11.6 13.6004H4.40005Z"
                          />
                        </svg>
                        <span className="font-athitiSemiBold  leading-[24px]">
                          ส่งใบเสร็จทางอีเมล
                        </span>
                      </button>
                    </div>
                    <div className="flex gap-x-6 max-md:flex-col">
                      <p className="font-athitiMedium text-lg text-[#111827] leading-[22px] whitespace-nowrap py-4 max-md:text-center">
                        รายละเอียดการชำระเงิน
                      </p>
                      <div className="w-full max-md:text-center">
                        <div className="flex gap-x-3 py-4 max-md:flex-col max-md:pt-0 max-md:items-center max-md:gap-y-3">
                          <div className="bg-[#10B981] rounded-full w-fit py-4 px-[13px]">
                            <svg
                              width="22"
                              height="16"
                              viewBox="0 0 24 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M22.7314 0.468628C23.3562 1.09347 23.3562 2.10653 22.7314 2.73137L9.93136 15.5313C9.30652 16.1562 8.29346 16.1562 7.66862 15.5313L1.26862 9.13135C0.643778 8.50652 0.643778 7.49345 1.26862 6.86862C1.89346 6.24378 2.90652 6.24378 3.53136 6.86862L8.79999 12.1372L20.4686 0.468628C21.0935 -0.156209 22.1065 -0.156209 22.7314 0.468628Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-athitiSemiBold text-lg text-[#111827] leading-[22px]">
                              ชำระเงินแล้ว
                            </p>
                            <p className="font-athitiMedium text-base text-[#6B7280] leading-[20px]">
                              วันที่ชำระเงิน วันศุกร์ที่ 14 มิถุนายน 2567
                            </p>
                          </div>
                        </div>
                        <hr className="h-px bg-[#D1D5DB] border-0" />

                        <div className="py-4">
                          <div className="flex justify-between">
                            <p className="font-athitiMedium text-lg text-[#111827] leading-[22px]">
                              ราคา
                            </p>
                            <p className="font-athitiMedium text-lg text-[#111827] leading-[22px]">
                              ฿918.98
                            </p>
                          </div>
                          <hr className="h-px my-3 bg-[#D1D5DB] border-0" />
                          <div className="flex justify-between">
                            <p className="font-athitiMedium text-lg text-[#111827] leading-[22px]">
                              ส่วนลดทั่วไป
                            </p>
                            <p className="font-athitiMedium text-lg text-[#111827] leading-[22px]">
                              -฿42.69
                            </p>
                          </div>
                          <hr className="h-px my-3 bg-[#D1D5DB] border-0" />
                          <div className="flex justify-between">
                            <p className="font-athitiMedium text-lg text-[#111827] leading-[22px]">
                              ราคารวม
                            </p>
                            <p className="font-athitiMedium text-lg text-[#111827] leading-[22px]">
                              ฿961.67
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!props.payment && (
                  <hr className="h-px bg-[#D1D5DB] border-0" />
                )}

                {popupDetails && index == indexDetails ? (
                  <div
                    className="fixed top-0 left-0 w-full h-full z-50 bg-[rgba(0,0,0,0.2)] py-[80px] px-[72px] overflow-auto max-lg:p-0"
                    onClick={() => {
                      setPopupDetails(!popupDetails);
                    }}
                  >
                    <div className="bg-[#ffffff] rounded-3xl max-lg:rounded-none p-6 relative container mx-auto">
                      <svg
                        onClick={() => {
                          setPopupDetails(!popupDetails);
                        }}
                        className="cursor-pointer top-[18px] right-[30px] absolute"
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 13.5L13 1.5M1 1.5L13 13.5"
                          stroke="#9CA3AF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <div className="flex gap-x-[20px] pb-[20px]">
                        <Image
                          src={`/insurances/${item.package.insurer.code}.svg`}
                          width={90}
                          height={90}
                          alt=""
                          priority={true}
                        />
                        <div>
                          <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                            {item.package.insurer.name}
                          </p>
                          <p className="font-athitiMedium text-[18px] leading-[24px] pb-[6px]">
                            {item.package.name}
                          </p>
                          <div className="flex gap-[10px]">
                            <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] border border-[#984333] rounded-md py-[3px] px-2.5">
                              ชั้น {filterclass[item.package.class]}
                            </p>
                            <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#F1F6F7] rounded-md py-[3px] px-2.5">
                              ซ่อม
                              {item.package.garage == "No" ? "อู่" : "ห้าง"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row items-center gap-x-4 pb-5">
                        <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                          รายละเอียดความคุ้มครอง
                        </p>
                        <hr className="h-px flex-grow bg-gray-200 border-0 rounded" />
                      </div>

                      <div className="flex flex-col gap-[20px]">
                        <TableCard
                          bgTitle="#FDE68A"
                          bgContent="#FFFBEB"
                          title="ความผิดต่อบุคคลภายนอก"
                          type="thirdparty"
                          props={item.package.coverage.thirdparty}
                        />

                        <TableCard
                          bgTitle="#FED7AA"
                          bgContent="#FFF7ED"
                          title="ความรับผิดชอบต่อรถยนต์เสียหาย สูญหาย ไฟไหม้"
                          type="vehicle"
                          props={item.package.coverage.vehicle}
                        />

                        <TableCard
                          bgTitle="#F1F5D8"
                          bgContent="#FBFCF3"
                          title="ความคุ้มครองตามเอกสารแนบท้าย"
                          type="additional"
                          props={item.package.coverage.additional}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex justify-between max-md:flex-col gap-y-5">
                  <div className="flex gap-x-2.5">
                    <Link
                      href="#"
                      onClick={() => handleCreateSupport(item._id)}
                      className="hover:stroke-[#243c5a] hover:bg-[#ffffff] hover:drop-shadow text-[#ffffff] hover:text-[#06C755] flex max-md:basis-1/2 max-w-[200px] justify-center items-center bg-[#06C755] py-2  px-[18px] rounded-[36px] gap-x-1.5 whitespace-nowrap"
                    >
                      <Image
                        src="/logo-3.svg"
                        width={20}
                        height={20}
                        alt="ติดต่อเจ้าหน้าที่"
                        priority={true}
                      />
                      <p className="font-athitiSemiBold text-sm  leading-[20px] ">
                        ติดต่อเจ้าหน้าที่
                      </p>
                    </Link>

                    {item.stop && (
                      <>
                        <Link
                          href={`tel:${item.package.insurer.claim}`}
                          className="fill-[#984333] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm  text-[#984333] hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[3px] px-[18px] gap-x-1.5"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0.799988 1.6998C0.799988 1.20275 1.20293 0.799805 1.69999 0.799805H3.63757C4.07753 0.799805 4.453 1.11788 4.52533 1.55185L5.19071 5.54413C5.25566 5.93386 5.05884 6.32038 4.70545 6.49708L3.31212 7.19374C4.31679 9.69029 6.3095 11.683 8.80606 12.6877L9.50272 11.2943C9.67941 10.941 10.0659 10.7441 10.4557 10.8091L14.4479 11.4745C14.8819 11.5468 15.2 11.9223 15.2 12.3622V14.2998C15.2 14.7969 14.797 15.1998 14.3 15.1998H12.5C6.03826 15.1998 0.799988 9.96154 0.799988 3.4998V1.6998Z" />
                          </svg>
                          <p>แจ้งเคลม</p>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="flex gap-x-2.5">
                    {item.status == "Active" &&
                      item.documents.map((doc, docindex) => {
                        if (doc.label == "Policy") {
                          return (
                            <Link
                              href="#"
                              className="fill-[#984333] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm  text-[#984333] hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[3px] px-[18px] gap-x-1.5"
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.99996 16C12.4182 16 16 12.4183 16 8C16 3.58172 12.4182 0 7.99996 0C3.58167 0 -6.10352e-05 3.58172 -6.10352e-05 8C-6.10352e-05 12.4183 3.58167 16 7.99996 16ZM8.99996 5C8.99996 4.44772 8.55224 4 7.99996 4C7.44767 4 6.99995 4.44772 6.99995 5L6.99995 8.58579L5.70706 7.29289C5.31653 6.90237 4.68337 6.90237 4.29284 7.29289C3.90232 7.68342 3.90232 8.31658 4.29284 8.70711L7.29285 11.7071C7.68337 12.0976 8.31654 12.0976 8.70707 11.7071L11.7071 8.70711C12.0976 8.31658 12.0976 7.68342 11.7071 7.29289C11.3165 6.90237 10.6834 6.90237 10.2929 7.29289L8.99996 8.58579V5Z"
                                />
                              </svg>
                              <p>{doc.label}</p>
                            </Link>
                          );
                        }
                      })}
                    {item.status == "Active" && (
                      <button
                        type="button"
                        className="max-md:basis-1/2 hover:text-[#984333] hover:bg-[#ffffff] border-[#984333] border font-athitiSemiBold  text-sm  text-[#ffffff] leading-[20px] bg-[#984333] rounded-[36px] py-[7px] px-[18px]"
                        onClick={() => {
                          setPopupDetails(!popupDetails);
                          setIndexDetails(index);
                        }}
                      >
                        รายละเอียด
                      </button>
                    )}

                    {item.status == "Document" && (
                      <Link href={`/app/${item._id}/upload`}>
                        <button
                          type="button"
                          className="fill-[#984333] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm bg-[#ffffff]  text-[#984333]  hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[7px] px-[18px] gap-x-1.5"
                        >
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 12 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.600006 2.59981C0.600006 1.60569 1.40589 0.799805 2.40001 0.799805H6.52721C7.0046 0.799805 7.46244 0.989447 7.80001 1.32701L10.8728 4.3998C11.2104 4.73737 11.4 5.19521 11.4 5.6726V13.3998C11.4 14.3939 10.5941 15.1998 9.60001 15.1998H2.40001C1.40589 15.1998 0.600006 14.3939 0.600006 13.3998V2.59981ZM2.40001 7.9998C2.40001 7.50275 2.80295 7.0998 3.30001 7.0998H8.70001C9.19706 7.0998 9.60001 7.50275 9.60001 7.9998C9.60001 8.49686 9.19706 8.89981 8.70001 8.89981H3.30001C2.80295 8.89981 2.40001 8.49686 2.40001 7.9998ZM3.30001 10.6998C2.80295 10.6998 2.40001 11.1027 2.40001 11.5998C2.40001 12.0969 2.80295 12.4998 3.30001 12.4998H8.70001C9.19706 12.4998 9.60001 12.0969 9.60001 11.5998C9.60001 11.1027 9.19706 10.6998 8.70001 10.6998H3.30001Z"
                            />
                          </svg>

                          <p>ส่งเอกสาร</p>
                        </button>
                      </Link>
                    )}

                    {item.status == "Quotation" && (
                      <Link href={`/app/${item._id}`}>
                        <button
                          type="button"
                          className="fill-[#984333] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm bg-[#ffffff]  text-[#984333]  hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[7px] px-[18px] gap-x-1.5"
                        >
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 12 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.600006 2.59981C0.600006 1.60569 1.40589 0.799805 2.40001 0.799805H6.52721C7.0046 0.799805 7.46244 0.989447 7.80001 1.32701L10.8728 4.3998C11.2104 4.73737 11.4 5.19521 11.4 5.6726V13.3998C11.4 14.3939 10.5941 15.1998 9.60001 15.1998H2.40001C1.40589 15.1998 0.600006 14.3939 0.600006 13.3998V2.59981ZM2.40001 7.9998C2.40001 7.50275 2.80295 7.0998 3.30001 7.0998H8.70001C9.19706 7.0998 9.60001 7.50275 9.60001 7.9998C9.60001 8.49686 9.19706 8.89981 8.70001 8.89981H3.30001C2.80295 8.89981 2.40001 8.49686 2.40001 7.9998ZM3.30001 10.6998C2.80295 10.6998 2.40001 11.1027 2.40001 11.5998C2.40001 12.0969 2.80295 12.4998 3.30001 12.4998H8.70001C9.19706 12.4998 9.60001 12.0969 9.60001 11.5998C9.60001 11.1027 9.19706 10.6998 8.70001 10.6998H3.30001Z"
                            />
                          </svg>

                          <p>ใบเสนอราคา</p>
                        </button>
                      </Link>
                    )}

                    {item.status == "CheckOut" ? (
                      <Link
                        href={`/app/${item._id}`}
                        className={`${
                          item.sendDoc !== "" || item.download !== ""
                            ? "max-md:basis-1/2"
                            : "max-md:w-full"
                        } text-center`}
                      >
                        <button
                          type="button"
                          className="fill-[#984333] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm bg-[#ffffff]  text-[#984333]  hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[7px] px-[18px] gap-x-1.5"
                        >
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 12 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.600006 2.59981C0.600006 1.60569 1.40589 0.799805 2.40001 0.799805H6.52721C7.0046 0.799805 7.46244 0.989447 7.80001 1.32701L10.8728 4.3998C11.2104 4.73737 11.4 5.19521 11.4 5.6726V13.3998C11.4 14.3939 10.5941 15.1998 9.60001 15.1998H2.40001C1.40589 15.1998 0.600006 14.3939 0.600006 13.3998V2.59981ZM2.40001 7.9998C2.40001 7.50275 2.80295 7.0998 3.30001 7.0998H8.70001C9.19706 7.0998 9.60001 7.50275 9.60001 7.9998C9.60001 8.49686 9.19706 8.89981 8.70001 8.89981H3.30001C2.80295 8.89981 2.40001 8.49686 2.40001 7.9998ZM3.30001 10.6998C2.80295 10.6998 2.40001 11.1027 2.40001 11.5998C2.40001 12.0969 2.80295 12.4998 3.30001 12.4998H8.70001C9.19706 12.4998 9.60001 12.0969 9.60001 11.5998C9.60001 11.1027 9.19706 10.6998 8.70001 10.6998H3.30001Z"
                            />
                          </svg>

                          <p>รอชำระเงิน</p>
                        </button>
                      </Link>
                    ) : null}

                    {item.status == "Pending" ? (
                      <Link href={`/app/${item._id}`}>
                        <button
                          type="button"
                          className="fill-[#984333] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm bg-[#ffffff]  text-[#984333]  hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[7px] px-[18px] gap-x-1.5"
                        >
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 12 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.600006 2.59981C0.600006 1.60569 1.40589 0.799805 2.40001 0.799805H6.52721C7.0046 0.799805 7.46244 0.989447 7.80001 1.32701L10.8728 4.3998C11.2104 4.73737 11.4 5.19521 11.4 5.6726V13.3998C11.4 14.3939 10.5941 15.1998 9.60001 15.1998H2.40001C1.40589 15.1998 0.600006 14.3939 0.600006 13.3998V2.59981ZM2.40001 7.9998C2.40001 7.50275 2.80295 7.0998 3.30001 7.0998H8.70001C9.19706 7.0998 9.60001 7.50275 9.60001 7.9998C9.60001 8.49686 9.19706 8.89981 8.70001 8.89981H3.30001C2.80295 8.89981 2.40001 8.49686 2.40001 7.9998ZM3.30001 10.6998C2.80295 10.6998 2.40001 11.1027 2.40001 11.5998C2.40001 12.0969 2.80295 12.4998 3.30001 12.4998H8.70001C9.19706 12.4998 9.60001 12.0969 9.60001 11.5998C9.60001 11.1027 9.19706 10.6998 8.70001 10.6998H3.30001Z"
                            />
                          </svg>

                          <p>โปรดชำระใหม่อีกครั้ง</p>
                        </button>
                      </Link>
                    ) : null}

                    {item.status == "New" || item.status == null ? (
                      <>
                        {/* ดาวน์โหลดเอกสาร */}
                        {/* <div
                          ref={selectRef}
                          className="flex items-center justify-center relative"
                        >
                          <div
                            onClick={() => setIsOpenDownload(!isOpenDownload)}
                            className="flex flex-row cursor-pointer gap-[6px] items-center justify-center border border-[#984333] w-[130px] h-[36px] rounded-[32px]"
                          >
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
                          {isOpenDownload ? (
                            <div className="flex flex-col absolute top-[42px]  bg-[#FFFFFF] py-[6px] w-[160px] drop-shadow-[0_1px_3px_rgba(107,114,128,0.3)] font-athitiMedium rounded-lg">
                              <button
                                type="button"
                                className="leading-[24px] px-[6px] py-[4px] line-clamp-2  text-[#181b31] hover:text-[#984333]"
                              >
                                ดาวน์โหลดเอกสารไทยไพบูลย์ประกันภัยไทยไพบูลย์ประกันภัยไทยไพบูลย์ประกันภัย
                              </button>
                              <button
                                type="button"
                                className="leading-[24px] px-[6px] py-[4px] line-clamp-2  text-[#181b31] hover:text-[#984333]"
                              >
                                ไทยไพบูลย์ประกันภัย
                              </button>
                            </div>
                          ) : null}
                        </div> */}

                        <Link
                          href={`/app/${item._id}`}
                          className={`${
                            item.sendDoc !== "" || item.download !== ""
                              ? "max-md:basis-1/2"
                              : "max-md:w-full"
                          } text-center`}
                        >
                          <p className="hover:text-[#984333] hover:bg-[#ffffff] border-[#984333] border font-athitiSemiBold  text-sm  text-[#ffffff] leading-[20px] bg-[#984333] rounded-[36px] py-[7px] px-[18px]">
                            ดำเนินการต่อ
                          </p>
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
              </FormCard>
            </div>
          ))
        : null}
    </>
  );
}
