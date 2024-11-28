import Image from "next/image";
import Link from "next/link";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonLine from "../components/button/btn-line";
import useCompareStore from "@/store/compareStore";
import Warning from "@/app/components/warning";
import Complete from "@/app/components/complete";

import applicationStore from "@/store/applicationStore";
import { useRouter } from "next/router";

import useStore from "@/store/store";
import { useState, useEffect } from "react";
export default function Compares({ car, data, items, }) {
  const router = useRouter();

  const { user, cc } = useStore();
  const { carid } = useCompareStore();

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState("");


  const [isOpenComplete, setIsOpenComplete] = useState(false);
  const [textComplete, setTextComplete] = useState("");


  const { selectedItems, addItem, removeItem } = useCompareStore();

  const { createApplication, createSupport } = applicationStore();

  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };

  const calculatePrice = (price) => {
    if (user?.commission) {
      if (cc) {

        const fee = user.commission.fee;
        const rate = fee.default["default"];
        const commission = price.amt * rate;

        return Number(commission).toFixed(2);


      } else {
          const fee = user.commission.fee;
          const rate = fee.default["default"];
          const commission = price.amt * rate;
          const wht = commission * 0.03;
          const price_net = price.sum - (commission - wht);
          return Number(price_net).toFixed(2);
      }
    } else {
      return Number(price).toFixed(2);
    }
  };

  function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //const { car } = useCompareStore();

  const [isLoading, setIsLoading] = useState(null);

  console.log(items);

  const handleSaleNow = async (car_id, package_id, type) => {
    setIsLoading(package_id);
    try {
      const creaetAppReponse = await createApplication(car_id, package_id);

      if (type == 'quotation') {
        router.push(`/quotation/${creaetAppReponse.data._id}/create`);
      } else {
        router.push(`/app/${creaetAppReponse.data._id}`);
      }

    } catch (e) {
      //alert("มีข้อผิดพลาด");
      console.log(" EROR : ", e);
      router.push('/login');
      //setIsOpenWarning(true);
      //setTextWarning("ขออภัย มีข้อผิดพลาด");
      //setIsLoading(false);
    }
  };

  const handleSupport = async (car_id, package_id) => {
    setIsLoading(package_id);
    try {
      
      const creaetAppReponse = await createApplication(car_id, package_id);

      if (creaetAppReponse) {
        const support = await createSupport(creaetAppReponse.data._id);
        if (support) {

          setIsOpenComplete(true);
          setTextComplete("กรุณารอเจ้าหน้าที่ติดต่อกลับ");
          setIsLoading(false);

        } else {
          setIsOpenWarning(true);
          setTextWarning("ไม่สามารถทำรายการได้");
          setIsLoading(false);

        }
        
      } else {

        setIsOpenWarning(true);
        setTextWarning("ไม่สามารถทำรายการได้");
        setIsLoading(false);

      }
    } catch (e) {
      router.push('/login');
      
    }
  };

  return (
    <>
      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />

      <Complete
        id="completeUser"
        isOpenWarning={isOpenComplete}
        textWarning={textComplete}
        closeModel={() => setIsOpenComplete(false)}
      />


      <div className="text-center overflow-x-auto">
        <div
          className={`flex
          [&>*:nth-child(odd)]:bg-[#F5F5F4] 
          [&>*:nth-child(even)]:bg-[#FFFFFF] 
          `}
        >
          {data.map((item, index) => {
            if (index == 0) {
              return (
                <div
                  key={index}
                  className={`flex flex-col justify-between w-full  min-w-[300px]`}
                >
                  <div className={`p-6 flex flex-col items-center gap-y-1.5`}>
                    {/*<Image
                      src={item.img}
                      width={75}
                      height={75}
                      alt=""
                      priority={true}
                      className="mx-auto mb-5  max-xl:m-0 max-xl:w-[60px]"
                    />*/}
                    <div className="flex flex-col gap-1.5 max-xl:items-center">
                      <p className="font-athitiSemiBold text-lg xl:h-[22px] text-[#111827]">
                      { `${car?.brand } `}
                      
                      </p>
                      <p className="font-athitiSemiBold text-lg leading-[22px] text-[#111827]">
                        {car?.model?.main} {car?.year} <br /> {car?.model?.sub}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 flex flex-col gap-y-3 max-md:px-[16px]">
                    {index != 0 ? (
                      <>
                        <ButtonBrown
                          text="ซื้อทันที"
                          link={item.link1}
                          font={18}
                        />
                        <ButtonLine
                          text="ซื้อผ่านเจ้าหน้าที่"
                          link={item.link2}
                          font={18}
                          size={40}
                        />
                      </>
                    ) : null}

                    {item.specialPrice ? (
                      <p
                        className={`${
                          index % 2 != 0
                            ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                            : null
                        } font-athitiBold text-[26px] text-[#181B31] py-1 border-b`}
                      >
                        ฿{item.specialPrice}
                      </p>
                    ) : (
                      <p className="font-athitiMedium text-[20px] text-[#181B31] py-1 border-b max-xl:hidden">
                        ราคาพิเศษ
                      </p>
                    )}

                    {item.insuranceClass ? (
                      <p className=" py-2.5 px-3 mx-auto mb-4">
                        <span className="font-athitiMedium text-[#984333] text-[14px] leading-[20px] border border-[#984333] px-3 py-2  rounded-full">
                          {item.insuranceClass}
                        </span>
                      </p>
                    ) : (
                      <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-2.5 px-3 mx-auto mb-4 max-xl:hidden">
                        ชั้นประกัน
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          })}

          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="
                w-full
                min-w-[300px]
                flex flex-col 
                justify-between
                max-md:first:rounded-none  
                max-md:last:rounded-none
                "
              >
                <div className={`p-6 flex flex-col items-center gap-y-1.5`}>
                  <Image
                    src={`/insurances/${item.master.code}.svg`}
                    width={75}
                    height={75}
                    alt=""
                    priority={true}
                    className="mx-auto mb-5  max-xl:m-0 max-xl:w-[60px]"
                  />
                  <div className="flex flex-col gap-y-1.5">
                    <p className="font-athitiMedium text-lg xl:h-[22px] text-[#4B5563]">
                      {item.master.name}
                    </p>
                    <p className="font-athitiSemiBold text-lg leading-[22px] text-[#111827]">
                      {item.detail}
                    </p>
                  </div>
                </div>

                <div className="px-5 flex flex-col gap-y-3 max-md:px-[16px]">
                  <Link
                    href="javascript:void(0);"
                    onClick={() => {
                      handleSaleNow(car?._id, item._id.$oid, 'normal');
                    }}
                    className="block rounded-[50px] font-athitiSemiBold text-lg max-lg:text-[18px] bg-[#984333] text-white leading-[24px] py-[13px] px-1.5"
                  >
                    {isLoading == item._id?.$oid ? "Loading" : "ซื้อทันที"}
                  </Link>
                  {
                    (cc && user?.approve_at) ? (
                      <>

                  {<Link
                    href="javascript:void(0);"
                    onClick={() => {
                      handleSaleNow(car?._id, item._id.$oid, 'quotation');
                    }}
                    className="flex justify-center items-center rounded-[50px] font-athitiSemiBold text-lg bg-[#fee042] text-[#984333] leading-[24px] py-2.5 px-1.5"
                  >
                    
                    {isLoading == item._id?.$oid ? "Loading" : "ใบเสนอราคา"}
                  </Link>}


                      </>
                    ) : (

                  <Link
                    href="javascript:void(0)"
                    onClick={() => {
                      handleSupport(car?._id, item._id.$oid);
                    }}

                    className="flex justify-center items-center rounded-[50px] font-athitiSemiBold text-lg bg-[#06C755] text-white leading-[24px] py-2.5 px-1.5"
                  >
                    <Image
                      src="/logo-3.svg"
                      width={30}
                      height={30}
                      alt="line"
                      priority={true}
                    />
                    {isLoading == item._id?.$oid ? "Loading" : "ซื้อผ่านเจ้าหน้าที่"}
                  </Link>
                    )}
                 

                   {
                      cc ? (
                        <>

<p className="font-athitiMedium text-sm leading-[20px] text-[#808291]">
                          คอมมิชชั่น ฿
                        {formatNumber(
                          Number(calculatePrice(item.price))
                        )}
                        </p>


                        <p className="font-athitiSemiBold text-3xl leading-[40px] text-center py-1 border-b">
                          ฿{item.price.sum.toLocaleString()}
                        </p>
                        
                        
                        </>
                    ) : (
                      <>
                        <p
                          className={`${
                            index % 2 != 0
                              ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                              : null
                          } font-athitiBold text-[26px] text-[#181B31] py-1 border-b`}
                        >
                          ฿ {formatNumber(Number(calculatePrice(item.price)))}
                        </p>
                        
                      </>
                    ) } 

                  

                  <p className=" py-2.5 px-3 mx-auto mb-4">
                    <span className="font-athitiMedium text-[#984333] text-[14px] leading-[20px] border border-[#984333] px-3 py-2  rounded-full">
                      ชั้น {filterclass[item.class]}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-athitiSemiBold  text-lg text-[#181B31] bg-[#FDE68A] leading-[22px] py-4 px-3 sticky left-0">
          ความผิดต่อบุคคลภายนอก
        </p>
        <div
          className={`
        flex
        [&>*:nth-child(1n)]:bg-[#FFFBEB]
        [&>*:nth-child(2n+3)]:bg-[#F5F5F4]
        [&>*:nth-child(even)]:bg-[#FFFFFF]
        max-xl:[&>*:nth-child(odd)]:bg-[#F5F5F4]
        `}
        >
          {data.map((item, index) => {
            if (index == 0) {
              return (
                <div
                  key={index}
                  className={`w-full min-w-[300px] px-5 [&>*:nth-last-child(-n+1)]:border-0 ${
                    index % 2 != 0
                      ? "[&>*:nth-child(n)]:drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                      : null
                  } `}
                >
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    {item.arrangingRepairs ? (
                      <>
                        <span className="text-[#181B31] xl:hidden">
                          การจัดซ่อม
                        </span>
                        <br className="xl:hidden" />
                        {item.arrangingRepairs}
                      </>
                    ) : (
                      "การจัดซ่อม"
                    )}
                  </p>
                  {/*<p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b">
                    {item.identifyTheDriver ? (
                      <>
                        <span className="text-[#181B31] xl:hidden">
                          ระบุผู้ขับขี่
                        </span>
                        <br className="xl:hidden" />
                        {item.identifyTheDriver}
                      </>
                    ) : (
                      "ระบุผู้ขับขี่"
                    )}
                  </p>*/}
                  {/*
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b">
                    {item.deductible ? (
                      <>
                        <span className="text-[#181B31] xl:hidden">
                          รับผิดส่วนแรก
                        </span>
                        <br className="xl:hidden" />
                        {item.deductible}
                      </>
                    ) : (
                      "รับผิดส่วนแรก"
                    )}
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b">
                    {item.carRepairFunds ? (
                      <>
                        <span className="text-[#181B31] xl:hidden">
                          ทุนซ่อมรถ
                        </span>
                        <br className="xl:hidden" />
                        {item.carRepairFunds}
                      </>
                    ) : (
                      "ทุนซ่อมรถ"
                    )}
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b">
                    {item.lostOrBurned ? (
                      <>
                        <span className="text-[#181B31] xl:hidden">
                          สูญหายหรือไฟไหม้
                        </span>
                        <br className="xl:hidden" />
                        {item.lostOrBurned}
                      </>
                    ) : (
                      "สูญหายหรือไฟไหม้"
                    )}
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b">
                    {item.floodInsurance ? (
                      <>
                        <span className="text-[#181B31] xl:hidden">
                          ประกันน้ำท่วม
                        </span>
                        <br className="xl:hidden" />
                        {item.floodInsurance}
                      </>
                    ) : (
                      "ประกันน้ำท่วม"
                    )}
                  </p>
                  */}
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    ความเสียหายต่อชีวิต ร่างกาย ต่อ คน
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    ความเสียหายต่อชีวิต ร่างกาย ต่อ ครั้ง
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    ความเสียหายต่อทรัพย์สิน ต่อ ครั้ง
                  </p>
                </div>
              );
            }
          })}

          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-full min-w-[300px] px-5 [&>*:nth-last-child(-n+1)]:border-0 ${
                  index % 2 != 0
                    ? "[&>*:nth-child(n)]:drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                    : null
                }`}
              >
                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  ซ่อม{item.garage == "No" ? "อู่" : "ห้าง"}
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {Number(
                    item.coverage.thirdparty.health_per_person
                  ).toLocaleString()}
                </p>
                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {Number(
                    item.coverage.thirdparty.health_per_accident
                  ).toLocaleString()}
                </p>
                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {Number(item.coverage.thirdparty.property).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        <p className="font-athitiSemiBold  text-lg text-[#181B31] bg-[#FED7AA] leading-[22px] py-4 px-3 sticky left-0">
          ความรับผิดชอบต่อรถยนต์เสียหาย สูญหาย ไฟไหม้
        </p>
        <div
          className={`
          flex
          [&>*:nth-child(1n)]:bg-[#FFFBEB]
          [&>*:nth-child(2n+3)]:bg-[#F5F5F4]
          [&>*:nth-child(even)]:bg-[#FFFFFF]
          max-xl:[&>*:nth-child(odd)]:bg-[#F5F5F4]
          `}
        >
          {data.map((item, index) => {
            if (index == 0) {
              return (
                <div
                  key={index}
                  className={`w-full min-w-[300px] px-5 [&>*:nth-last-child(-n+1)]:border-0 ${
                    index % 2 != 0
                      ? "[&>*:nth-child(n)]:drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                      : null
                  } `}
                >
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    ความเสียหายต่อรถยนต์
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    • ความเสียหายส่วนแรก
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    ความรับผิดชอบรถยนต์สูญหาย / ไฟไหม้
                  </p>
                </div>
              );
            }
          })}

          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-full min-w-[300px] px-5 [&>*:nth-last-child(-n+1)]:border-0 ${
                  index % 2 != 0
                    ? "[&>*:nth-child(n)]:drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                    : null
                } `}
              >
                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {item.coverage.vehicle.damage == null
                    ? "ตามทุนประกัน"
                    : item.coverage.vehicle.damage == 0
                    ? "ไม่คุ้มครอง"
                    : Number(item.coverage.vehicle.damage).toLocaleString()}
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {item.coverage.vehicle.deductible
                    ? Number(item.coverage.vehicle.deductible).toLocaleString()
                    : "ไม่มี"}
                </p>
                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {item.coverage.vehicle.lossfire == null
                    ? "ตามทุนประกัน"
                    : item.coverage.vehicle.lossfire == 0
                    ? "ไม่คุ้มครอง"
                    : Number(item.coverage.vehicle.lossfire).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        <p className="font-athitiSemiBold text-lg text-[#181B31] bg-[#F1F5D8] leading-[22px] py-4 px-3 sticky left-0">
          ความคุ้มครองตามเอกสารแนบท้าย
        </p>
        <div
          className={`
            flex
            [&>*:nth-child(1n)]:bg-[#FFFBEB]
            [&>*:nth-child(2n+3)]:bg-[#F5F5F4]
            [&>*:nth-child(even)]:bg-[#FFFFFF]
            max-xl:[&>*:nth-child(odd)]:bg-[#F5F5F4]
            `}
        >
          {data.map((item, index) => {
            if (index == 0) {
              return (
                <div
                  key={index}
                  className={`w-full min-w-[300px] px-5 [&>*:nth-last-child(-n+1)]:border-0 ${
                    index % 2 != 0
                      ? "[&>*:nth-child(n)]:drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                      : null
                  } `}
                >
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    อุบัติเหตุส่วนบุคคล
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    • ผู้ขับขี่
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    • ผู้โดยสาร
                  </p>

                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    ค่ารักษาพยาบาล
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    • ผู้ขับขี่
                  </p>
                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    • ผู้โดยสาร
                  </p>

                  <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                    การประกันตัวผู้ขับขี่
                  </p>
                </div>
              );
            }
          })}

          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-full min-w-[300px] px-5 [&>*:nth-last-child(-n+1)]:border-0 ${
                  index % 2 != 0
                    ? "[&>*:nth-child(n)]:drop-shadow-[0_1px_2px_rgba(107,114,128,0.3)]"
                    : null
                }`}
              >
                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  &nbsp;
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {`${item.coverage.additional.pa.driver} /  `}{" "}
                  {Number(
                    item.coverage.additional.pa.expenses
                  ).toLocaleString()}
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {`${item.coverage.additional.pa.passenger} /  `}{" "}
                  {Number(
                    item.coverage.additional.pa.expenses
                  ).toLocaleString()}
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  &nbsp;
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {`${item.coverage.additional.medical.driver} /  `}{" "}
                  {Number(
                    item.coverage.additional.medical.expenses
                  ).toLocaleString()}
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {`${item.coverage.additional.medical.passenger} /  `}{" "}
                  {Number(
                    item.coverage.additional.medical.expenses
                  ).toLocaleString()}
                </p>

                <p className="font-athitiMedium text-[18px] text-[#6B7280] leading-[22px] py-4 border-b ">
                  {Number(item.coverage.additional.lg).toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}