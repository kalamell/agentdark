import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CustomSelect from "./customSelect";
import CustomTags from "./customTags";
import TableCard from "../components/templateComponent/table-card";
import ButtonBrown from "../components/button/btn-brown";
import ButtonLine from "../components/button/btn-line";
import Router, { useRouter } from "next/router";
import axios from "axios";
import useStore from "@/store/store";
import Warning from "@/app/components/warning";
import Complete from "@/app/components/complete";
import applicationStore from "@/store/applicationStore";
import useCompareStore from "@/store/compareStore";
import usePackageStore from "@/store/packageStore";



export default function SearchResults({
  selectedSort,
  data,
  packages,
  filter,
  carid,
  token,
  brand,
  model,
  year,
  car,
  loading
}) {
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState("");

  const [isOpenComplete, setIsOpenComplete] = useState(false);
  const [textComplete, setTextComplete] = useState("");


  const { selectedItems, addItem, removeItem } = useCompareStore();

  const [datap, setDatap] = useState(packages);
  const { createApplication, createSupport} = applicationStore();
  //const { packages, fetchPackages} = usePackageStore();


  


  const [formData, setFormData] = useState({
    class: ['1', '2', '3', '4', '5', '6'],
    garage: '',
    sort: 'price_asc',
  });

  const filters = [
    //{ value: "", label: "ทั้งหมด" },
    { value: "all", label: "ชั้นประกันทั้งหมด" },
    { value: "1", label: "1" },
    { value: "2", label: "2+" },
    { value: "3", label: "2" },
    { value: "4", label: "3+" },
    { value: "5", label: "3" },
    { value: "6", label: "พ.ร.บ" },
  ];

  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };

  const filters2 = [
    //{ value: "", label: "ทั้งหมด" },
    { value: "Yes", label: "ซ่อมห้าง" },
    { value: "No", label: "ซ่อมอู่" },
  ];

  const filtersort = [
    //{ value: "asc", label: "ราคาน้อยไปมาก" },
    { value: "price_desc", label: "ราคามากไปน้อย" },
  ];

  const router = useRouter();

  const { user, cc } = useStore();

  const [isOpenPackages, setIsOpenPackages] = useState(null);
  const [indexDetails, setIndexDetails] = useState(1);
  const [popupDetails, setPopupDetails] = useState(false);
  const [totalPackages, setTotalPackages] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order is ascending
  const [sortedInsurances, setSortedInsurances] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (popupDetails) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [popupDetails]);



  useEffect(() => {
    const count = packages.reduce((acc, p) => acc + p.packages.length, 0);
    setTotalPackages(count);
    setDatap(data);
  }, [packages]);

  

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
    //return user.fee + ' ' + price;
  };

  const handleFilter = (v) => {
    /*setSortOrder(v.value);
    const sorted = packages.map((item) => {
      // Only apply sorting to specific _id values
      if (Array.isArray(item.packages)) {
        return {
          ...item,
          packages: [...item.packages].sort((a, b) => {
            if (v.value === "asc") {
              return a.price.sum - b.price.sum;
            } else {
              return b.price.sum - a.price.sum;
            }
          }),
        };
      }
      return item; // Return other items unchanged
    });

    setSortedInsurances(sorted);
    */
  };

  function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleSaleNow = async (car_id, package_id, type) => {
    setIsLoading(package_id);
    try {
      const creaetAppReponse = await createApplication(car_id, package_id);

      if (creaetAppReponse) {
        if (type == 'quotation') {
          router.push(`/quotation/${creaetAppReponse.data._id}/create`);
        } else {
          router.push(`/app/${creaetAppReponse.data._id}`);
        }
      } else {
        setIsOpenWarning(true);
        setTextWarning("ไม่สามารถสั่งซื้อได้");
        setIsLoading(false);

      }
    } catch (e) {
      //alert("มีข้อผิดพลาด");
      setIsOpenWarning(true);
      setTextWarning("ขออภัย มีข้อผิดพลาด");
      setIsLoading(false);
    }
  };

  const handleSupport = async (car_id, package_id) => {
    setIsLoading(package_id);
    try {
      //setIsOpenComplete(true);
      //setTextComplete("รอเจ้าหน้าที่ติดต่อกลับ");
      //setIsOpenComplete(false);

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
      //alert("มีข้อผิดพลาด");
     // setIsOpenWarning(true);
      //setTextWarning("ขออภัย มีข้อผิดพลาด");
      //setIsLoading(false);
    }
  };

  const handleSelect = (item, master) => {
    if (selectedItems.find((i) => i._id.$oid === item._id.$oid)) {
      removeItem(item);
      //setError('');
    } else if (selectedItems.length < 3) {
      addItem(item, master);
      //setError('');
    } else {
      //setError('You can only compare up to 5 items.');
    }
  };


  const handleFilterChange = (selected) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      class: selected.value, // Set `filters` with the selected options
    }));

    //filter(formData);

  };

  const handleFilterChange2 = (selected) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      garage: selected.value, // Updates formData based on the selected name
    }));

    //filter(formData);
  };

  const handleFilterChange3 = (selected) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sort: selected.value == '' ? 'price_asc' : 'price_desc', // Updates formData based on the selected name
    }));

    //filter(formData);
  };

  

  useEffect(() => {
    
    
    const handleFetchPackages = async () => {
      
      const sanitizedFormData = {
        ...formData,
        class: formData.class?.filter((item) => item !== "all"),
      };

      //const data = await fetchPackages(carid, sanitizedFormData);

      //console.log(carid, ' -- ', data,' -- ', sanitizedFormData)
      //console.log(packages);

      //setDatap(data);

      filter(formData);
    };

    

    //console.log('LENGTH : ', formData.class.length);

    //if (formData.class.length > 0) {
    //  console.log('fetch package from data');
     handleFetchPackages();
    //}
    
  }, [formData]);


  
  


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



      <div className="flex max-xl:flex-col max-xl:gap-[12px] items-center justify-between pb-9 max-md:w-[85%] max-md:mx-auto">
        <p className="font-athitiMedium text-lg leading-[22px] text-[#111827]">
          ประกันภัยสำหรับคุณ ค้นพบ ({totalPackages})
        </p>
        <div className="grid grid-cols-[auto_auto_auto_auto] max-lg:grid-cols-[320px] max-md:grid-cols-[auto] max-lg:gap-[12px] max-md:w-full  items-center gap-x-3">
          <div className="flex items-center gap-x-3">
            <p className="font-athitiMedium text-sm leading-[20px] whitespace-nowrap">
              ชั้นประกัน
            </p>
            <div className="w-full">
              <CustomTags
                hiddenTitle
                options={filters}
                onChange={handleFilterChange}
                defaultLabel="ชั้นประกันทั้งหมด"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-3">
            <p className="font-athitiMedium text-sm leading-[20px]">ซ่อม</p>
            <div className="w-full">
              <CustomSelect
                hiddenTitle
                options={filters2}
                onChange={handleFilterChange2}
                defaultLabel="ซ่อมทั้งหมด"
              />
            </div>
          </div>

          <div className="flex items-center gap-x-3">
            <p className="font-athitiMedium text-sm leading-[20px] whitespace-nowrap">
              เรียงลำดับตาม
            </p>
            <div className="w-full">
              <CustomSelect
                hiddenTitle
                options={filtersort}
                onChange={handleFilterChange3}
                defaultLabel="ราคาน้อยไปมาก"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.8)] rounded-3xl p-6">
        <div className="grid grid-cols-[auto_400px] max-md:grid-cols-[auto_auto_auto_auto] font-athitiSemiBold pb-5 pr-[12px] max-md:hidden">
          <p>บริษัทประกัน</p>
          <div className="flex gap-[115px]">
            <p>แพ็คเกจ</p>
            <p>ราคาเริ่มต้น</p>
          </div>
        </div>

        <div className="rounded-lg ">

          {
            !loading && (
              datap.map((item, index) => {
            return (
              <div key={`data-${index}`}>
                <div
                  className={`p-4 border-b cursor-pointer bg-[#ffffff] ${
                    index == 0
                      ? "rounded-t-lg"
                      : null || index == packages.length - 1
                      ? "rounded-b-lg"
                      : null
                  }`}
                  onClick={() => {
                    index == isOpenPackages
                      ? setIsOpenPackages(null)
                      : setIsOpenPackages(index);
                  }}
                >
                  <div className="grid grid-cols-[50px_auto_385px] max-md:grid-cols-[50px_auto] items-center font-athitiSemiBold relative">
                    <Image
                      src={`/insurances/${item.code}.svg`}
                      width={50}
                      height={50}
                      alt={item.name}
                      priority={true}
                      className="max-md:row-start-1 max-md:row-end-3"
                    />
                    <p className="font-athitiMedium px-[20px] max-md:px-0 max-md:pb-[6px] max-md:px-[20px]">
                      {item.name}
                    </p>

                    <div className="flex gap-[130px] items-center max-md:row-start-2 max-md:row-end-3 max-md:gap-[10px] max-md:px-[20px]">
                      <p className="bg-[#F3F4F6] w-fit h-fit px-2.5 rounded-md ">
                        {item.packages.length}
                      </p>

                      <p className="text-[#984333] border border-[#984333] w-fit h-fit rounded-md px-2.5 py-0.5">
                        ฿{item.min_price.toLocaleString()}
                      </p>
                    </div>

                    <svg
                      className={`justify-self-end absolute right-[25px] max-md:right-[5px] ${
                        isOpenPackages == index ? "rotate-0" : "rotate-180"
                      }`}
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                </div>

                {isOpenPackages == index ? (
                  <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 pt-6 gap-8 pb-9">
                    {item.packages.map((_item, index) => {
                      return (
                        <div key={`allPackages-${index}`}>
                          <div className="bg-[#ffffff] rounded-lg px-4 py-3 pb-0 drop-shadow-[0_1px_3px_rgba(107,114,128,0.3)] h-full flex flex-col  justify-between">
                            <div className="flex  justify-between">
                              <p className="font-athitiMedium text-lg leading-[24px] mb-[6px]">
                                {_item.name} <br />
                                ทุน ฿
                                {
                                  _item.coverage?.vehicle.damage == null ? Number(car.coverage).toLocaleString() : 
                                Number(
                                  _item.coverage?.vehicle.damage
                                ).toLocaleString()}
                              </p>

                              <div className="flex justify-end gap-x-2 whitespace-nowrap">
                                <label className="flex gap-x-2">
                                  <input
                                    type="checkbox"
                                    
                                    checked={!!selectedItems.find((i) => i._id.$oid === _item._id.$oid)}
                                    onChange={() => handleSelect(_item, item)}

                                    className="accent-[#984333] w-4 h-4 mt-[2px]"
                                  />
                                  <p className="font-athitiSemiBold text-sm leading-[20px] text-[#181b31bf]">
                                    เปรียบเทียบ
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div>

                              <div className="flex gap-x-2.5 justify-between">
                                <div className="flex gap-x-2.5">
                                  <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] border border-[#984333] rounded-md py-[3px] px-2.5">
                                    ชั้น {filterclass[_item.class]}
                                  </p>
                                  <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#F1F6F7] rounded-md py-[3px] px-2.5">
                                    ซ่อม{_item.garage == "No" ? "อู่" : "ห้าง"}
                                  </p>
                                </div>
                                { cc && (
                                <div>
                                  <p className="font-athitiMedium text-sm leading-[20px] text-[#808291]">
                                    คอมมิชชั่น ฿
                                  {formatNumber(
                                    Number(calculatePrice(_item.price))
                                  )}
                                  </p>
                                </div>
                                )}
                              </div>

                              <hr className="h-px bg-[#D1D5DB] border-0 mb-3 mt-4" />
                              <div className="flex items-center justify-center pb-5 gap-x-3">
                                {
                                  cc ? (
                                    <>
                                    <p className="font-athitiSemiBold text-3xl leading-[40px] text-center">
                                      ฿{_item.price.sum.toLocaleString()}
                                    </p>
                                    </>
                                ) : (
                                  <>
                                    <p className="font-athitiMedium  text-[#808291] text-xl leading-[30px] line-through">
                                      ฿{_item.price.sum.toLocaleString()}
                                    </p>

                                    <p className="font-athitiSemiBold text-3xl leading-[40px] text-center">
                                      ฿
                                      {formatNumber(
                                        Number(calculatePrice(_item.price))
                                      )}
                                    </p>
                                  </>
                                ) }
                              </div>

                              <div className={`grid ${cc ? 'grid-cols-2' : 'grid-cols-[40%_55%]' } gap-x-3 justify-center text-center pb-6`}>
                                <Link
                                  href="javascript:void(0);"
                                  onClick={() => {
                                    handleSaleNow(carid, _item._id.$oid, 'normal');
                                  }}
                                  className="block rounded-[50px] font-athitiSemiBold text-lg max-lg:text-[18px] bg-[#984333] text-white leading-[24px] py-[13px] px-1.5"
                                >
                                  {isLoading == _item._id?.$oid
                                    ? "Loading"
                                    : "ซื้อทันที"}
                                </Link>
                                
                                {
                                  cc ? (
                                    <>

                                {<Link
                                  href="javascript:void(0);"
                                  onClick={() => {
                                    handleSaleNow(carid, _item._id.$oid, 'quotation');
                                  }}
                                  className="flex justify-center items-center rounded-[50px] font-athitiSemiBold text-lg bg-[#fee042] text-[#984333] leading-[24px] py-2.5 px-1.5"
                                >
                                  
                                  {isLoading == _item._id?.$oid
                                    ? "Loading"
                                    : "ใบเสนอราคา"}
                                </Link>}


                                    </>
                                  ) : (

                                <Link
                                  href="javascript:void(0)"
                                  onClick={() => {
                                    handleSupport(carid, _item._id.$oid);
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
                                  {isLoading == _item._id?.$oid
                                    ? "Loading"
                                    : "ซื้อผ่านเจ้าหน้าที่"}
                                </Link>
                                )
                              }
                              </div>
                              {/*
                            <p className="font-athitiMedium  text-[#808291] text-md leading-[20px] py-3 text-center">
                              {_item.detail}
                            </p>
                            */}
                              <hr className="h-px bg-[#D1D5DB] border-0" />
                              <button
                                onClick={() => {
                                  setPopupDetails(!popupDetails);
                                  setIndexDetails(index);
                                }}
                                type="button"
                                className="font-athitiSemiBold  text-[#111827] text-md leading-[20px] p-4 w-full"
                              >
                                รายละเอียด
                              </button>
                            </div>
                          </div>

                          {popupDetails && index == indexDetails ? (
                            <div className="fixed top-0 left-0 w-full h-full z-50 bg-[rgba(0,0,0,0.2)] py-[80px] px-[72px] overflow-auto max-lg:p-0" onClick={() => {
                              setPopupDetails(!popupDetails);
                            }}>
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
                                    src={`/insurances/${item.code}.svg`}
                                    width={90}
                                    height={90}
                                    alt=""
                                    priority={true}
                                  />
                                  <div>
                                    <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                                      {_item.name}
                                    </p>
                                    <p className="font-athitiMedium text-[18px] leading-[24px] pb-[6px]">
                                      {item.name}
                                    </p>
                                    <div className="flex gap-[10px]">
                                      <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] border border-[#984333] rounded-md py-[3px] px-2.5">
                                        ชั้น {filterclass[_item.class]}
                                      </p>
                                      <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#F1F6F7] rounded-md py-[3px] px-2.5">
                                        ซ่อม
                                        {_item.garage == "No" ? "อู่" : "ห้าง"}
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
                                    props={_item.coverage.thirdparty}
                                  />

                                  <TableCard
                                    bgTitle="#FED7AA"
                                    bgContent="#FFF7ED"
                                    title="ความรับผิดชอบต่อรถยนต์เสียหาย สูญหาย ไฟไหม้"
                                    type="vehicle"
                                    props={_item.coverage.vehicle}
                                  />

                                  <TableCard
                                    bgTitle="#F1F5D8"
                                    bgContent="#FBFCF3"
                                    title="ความคุ้มครองตามเอกสารแนบท้าย"
                                    type="additional"
                                    props={_item.coverage.additional}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          }))}

          
        </div>
      </div>
    </>
  );
}
