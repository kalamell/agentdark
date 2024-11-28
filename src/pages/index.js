import Image from "next/image";
import { useState, useEffect } from "react";
import Insurance from "@/app/components/Insurance";
import useCarStore from "@/store/carStore";
import useStore from "@/store/store";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchData } from "@/lib/api";
import Warning from "../app/components/warning";
import useCompareStore from "@/store/compareStore";

export default function Home() {
  const [selectedCarBrand, setSelectedCarBrand] = useState(null);
  const [selectedCarManufacture, setSelectedManufacture] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [selectedSubCarModel, setSelectedSubCarModel] = useState(null);
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [checkDisable, setCheckDisable] = useState(true);
  const { clearItems } = useCompareStore();

  const [isLoading, setIsLoading] = useState(false);

  const {
    brand,
    setBrand,
    model,
    setModel,
    year,
    setYear,
    submodel,
    setSubModel,
    carBrands,
    fetchCarBrands,
    carModels,
    fetchCarModels,
    carYears,
    fetchCarYears,
    carSubModels,
    fetchCarSubModel,
    apiurl,
    setApi,
  } = useCarStore();

  const { user } = useStore();
  const router = useRouter();

  

  useEffect(() => {
  
    fetchCarBrands();
    clearItems();
    //fetchData('/api/car/brands', { method: 'POST'});
  }, []);

  useEffect(() => {
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);

  const handleSelectedCarBrand = (value) => {
    setBrand(value.value);
    fetchCarModels(value.value);
    setCheckDisable(true);
  };

  const handleSelectedCarModel = (value) => {
    setModel(value.value);
    fetchCarYears();
    setCheckDisable(true);
  };

  const handleSelectedCarYears = (value) => {
    setYear(value.value);
    fetchCarSubModel();
    setCheckDisable(true);
  };
  const handleSelectedCarSubModel = (value) => {
    setSubModel(value.value);
    setSelectedSubCarModel(value.label);
    //console.log(value);
    setCheckDisable(false);
  };

  const valueSelect = (value) => {
    console.log(value);
  };
  const handleCarSearch = () => {
    //alert('ok');
    //console.log(user);
    //setIsLoading(true);
    if (brand == "" || model == "" || year == "" || submodel == "") {
      setIsOpenWarning(true);
    } else {
      setIsLoading(true);

      

      if (!user) {
        sessionStorage.setItem(
          "prevPath",
          `/car/insure/results/${brand}/${model}/${year}/${submodel}`
        );
        router.push("/login");
      } else {
        router.push(
          `/car/insure/results/${brand}/${model}/${year}/${submodel}`
        );
      }
    }
  };

  return (
    <>
      <Head>
        <title>เดโมโบรกเกอร์ บริการด้านการประกันภัย</title>
      </Head>
      <Warning
        id="validateCheckPrice"
        isOpenWarning={isOpenWarning}
        textWarning="กรุณาเลือกข้อมูล"
        closeModel={() => setIsOpenWarning(false)}
      />

      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9">
        <div className="container mx-auto text-center">
          <h1 className="font-athitiBold max-lg:text-[32px] max-lg:leading-[41px] max-lg:pb-6 leading-[48px] text-4xl leading-[48px] max-lg:leading-[42px]  ">
            เดโมโบรกเกอร์ <br className="lg:hidden max-lg:block" />
            บริการด้านการประกันภัย
          </h1>
          <p className="font-athitiMedium text-xl leading-[30px] max-lg:pb-5">
            ซื้อประกันออนไลน์กับเรา <br className="lg:hidden max-lg:block" />
            รับส่วนลดทันที 20%
          </p>
          <div></div>
          <div className="max-w-[582px] mx-auto py-6 flex max-xl:flex-col max-xl:px-9 max-md:px-3 gap-9">
            <Insurance
              labelBrand="ยี่ห้อรถยนต์"
              brand={carBrands}
              selectedBrand={handleSelectedCarBrand}
              labelModel="รุ่นรถยนต์"
              model={carModels}
              selectedModel={handleSelectedCarModel}
              labelManufacture="ปีที่ผลิต "
              manufacture={carYears}
              selectedManufacture={handleSelectedCarYears}
              labelSubModel="รุ่นย่อย"
              subModel={carSubModels}
              selectedSubModel={handleSelectedCarSubModel}
              headerText="ประกันรถยนต์ของคุณ"
              icon="/icon-15.svg"
              onSearch={handleCarSearch}
              valuesc={valueSelect}
              isLoading={isLoading}
              checkDisable={checkDisable}
            />

            {/*<Insurance
              labelBrand="ยี่ห้อรถจักรยานยนต์"
              brand={mcBrand}
              selectedBrand={setSelectedMCBrand}
              labelManufacture="ปีที่ผลิต "
              manufacture={mcManufacture}
              selected
              Manufacture={setSelectedMCManufacture}
              labelModel="รุ่นรถจักรยานยนต์"
              model={mcModel}
              selectedModel={setSelectedMCModel}
              labelSubModel="ซีซีรถจักรยานยนต์"
              subModel={subMcModel}
              selectedSubCarModel={setSelectedSubMCModel}
              headerText="ประกันรถจักรยานยนต์"
              icon="/icon-14.svg"
            />*/}
          </div>
        </div>
      </div>
      <div className="bg-[#fee042]">
        <div className="bg-[#FFFFFF] px-9 py-[61px]  max-md:py-9 max-xl:px-9  max-lg:px-5 max-md:rounded-t-[36px]">
          <div className="container mx-auto grid grid-cols-[260px_auto] max-lg:grid-cols-1 items-center gap-y-3">
            <div className="flex flex-col gap-y-4 max-lg:text-center">
              <p className="font-athitiBold text-3xl max-lg:text-[26px] leading-[40px] max-lg:leading-[30px]">
              เดโมโบรกเกอร์
                <br /> <span className="text-[#808291]">สินค้าประกันภัย</span>
              </p>
              <p className="font-athitiMedium text-[#808291] text-lg leading-[22px]">
                หลากหลายสินค้าประกันภัย ที่มีคุณภาพ
                <br /> หลากหลาย และคุ้มค่าที่สุด
                <br />
                จากบริษัทประกันภัยชั้นนำระดับโลก
              </p>
            </div>

            <div className="grid grid-cols-4 justify-items-center max-md:grid-cols-1 items-start w-full justify-around text-center max-md:gap-y-[54px] max-md:py-3">
              <Link href="#" className="grid grid-cols-1 gap-y-4 w-fit">
                <div className="grid place-content-center filter-ffffff bg-[#F1F6F7] hover:bg-[#984333] filter-984333 rounded-full w-fit mx-auto p-2.5 h-[100px]  transition-all duration-300 ease-in-out">
                  <Image
                    src="/icon-6.svg"
                    width={80}
                    height={80}
                    alt="ประกันการเดินทาง"
                    priority={true}
                  />
                </div>
                <p className="font-athitiSemiBold text-xl text-[#984333]">
                  พ.ร.บ.
                </p>
              </Link>
              <Link href="#" className="grid grid-cols-1 gap-y-4  w-fit">
                <div className="filter-ffffff bg-[#F1F6F7] hover:bg-[#984333] filter-984333 rounded-full w-fit mx-auto p-2.5  transition-all duration-300 ease-in-out">
                  <Image
                    src="/icon-3.svg"
                    width={80}
                    height={80}
                    alt="ประกันการเดินทาง"
                    priority={true}
                  />
                </div>
                <p className="font-athitiSemiBold text-xl text-[#984333]">
                  ประกันการเดินทาง
                </p>
              </Link>
              <Link href="#" className="grid grid-cols-1 gap-y-4  w-fit">
                <div className="filter-ffffff bg-[#F1F6F7] hover:bg-[#984333] filter-984333 rounded-full w-fit mx-auto p-2.5  transition-all duration-300 ease-in-out">
                  <Image
                    src="/icon-4.svg"
                    width={80}
                    height={80}
                    alt="ประกันการเดินทาง"
                    priority={true}
                  />
                </div>
                <p className="font-athitiSemiBold text-xl text-[#984333]">
                  ประกันสุขภาพ
                </p>
              </Link>
              <Link href="#" className="grid grid-cols-1 gap-y-4  w-fit">
                <div className="filter-ffffff bg-[#F1F6F7] hover:bg-[#984333] filter-984333 rounded-full w-fit mx-auto p-2.5  transition-all duration-300 ease-in-out">
                  <Image
                    src="/icon-5.svg"
                    width={80}
                    height={80}
                    alt="ประกันการเดินทาง"
                    priority={true}
                  />
                </div>
                <p className="font-athitiSemiBold text-xl text-[#984333]">
                  ประกันอุบัติเหตุส่วนบุคคล
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F1F6F7] px-9 max-md:px-0">
        <div className="container mx-auto  grid grid-cols-2 max-md:grid-cols-1 py-12  gap-x-[60px] max-md:pt-0">
          <Image
            src="/img-1.png?v1"
            width={570}
            height={700}
            alt="img"
            priority={true}
            className="w-full h-[700px] max-xl:h-full  object-cover rounded-3xl max-md:rounded-none"
          />
          <div className="flex flex-col justify-between">
            <div className="py-12 max-md:text-center">
              
              <p className="font-athitiBold text-[#111827] text-3xl max-lg:text-[26px] max-lg:leading-[30px] leading-[40px]">
                สมัครสมาชิก <br className="lg:hidden max-md:hidden" />เดโมโบรกเกอร์
              </p>
              <p className="font-athitiMedium text-[#808291] text-lg leading-[22px] pt-5">
                สมัครฟรี ไม่ต้องลงทุน <br className="md:hidden" />
                (เพียงมีใบอนุญาตนายหน้าประกันวินาศภัย)
                <br />
                เรามีแผนประกันภัยรถยนต์ มอเตอร์ไซค์ <br className="md:hidden" />
                ยิ่งขายมาก ยิ่งได้มาก
                <br className="max-md:hidden" />
                ผลตอบแทนไม่จำกัด
              </p>
            </div>

            <div className="relative ml-[-25%] max-xl:ml-[-50%] max-lg:ml-[-65%] max-md:ml-[0] max-md:grid max-md:grid-cols-1">
              <div className="absolute pt-6 px-6 left-0 w-6/12 max-md:w-full  h-full max-md:relative row-start-2 max-md:p-0">
                <Image
                  className="rounded-xl max-md:rounded-none w-full h-full max-md:h-[240px]  object-cover"
                  src="/img-2.png?v1"
                  width={298}
                  height={415}
                  alt="img"
                  priority={true}
                />
              </div>

              <div className="bg-[#FFFFFF] rounded-t-[36px] grid grid-cols-2 max-md:grid-cols-1 gap-[60px] max-lg:gap-[0px] pt-9 pl-6 pb-12 max-md:px-5 max-md:py-9 ">
                <div />
                <div className="flex items-center max-md:justify-center gap-x-6">
                  <Image
                    src="/icon-12.svg"
                    width={108}
                    height={108}
                    alt="ค่าตอบแทนสูงสุด"
                    priority={true}
                  />
                  <div>
                    <p className="font-athitiBold text-[#181B31] text-5xl leading-[48px]">
                      12%
                    </p>

                    <p className="font-athitiSemiBold text-base text-[#A7A9B8] leading-[20px]">
                      ค่าตอบแทนสูงสุด
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F1F6F7]  rounded-xl  grid grid-cols-2 max-md:grid-cols-1 gap-[60px] max-lg:gap-[0px] pl-6 mt-[-12px] max-md:mt-0 max-md:pt-9 max-md:pr-6 max-lg:pb-0 pb-10">
                <div />
                <div className="py-9 max-lg:py-0">
                  <div className="flex items-center  gap-x-2.5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" rx="12" fill="#000000" />
                      <path
                        d="M7.33334 12.6667L10 15.3334L16.6667 8.66669"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="font-athitiSemiBold text-xl leading-[30px] text-[#181B31]">
                      สมัครฟรี
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2.5">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" rx="12" fill="#000000" />
                      <path
                        d="M7.33334 12.6667L10 15.3334L16.6667 8.66669"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className="font-athitiSemiBold text-xl leading-[30px] text-[#181B31]">
                      ผลตอบแทนสูง
                    </p>
                  </div>
                  <Link href="/agent">
                    <button
                      type="button"
                      className="font-athitiSemiBold text-[22px] bg-[#000000] text-white hover:bg-[#888888] hover:text-[#000000] py-[13px] px-[48px] rounded-[50px] leading-[24px] mt-9 max-md:w-full  transition-all duration-300 ease-in-out"
                    >
                      สมัครสมาชิก
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

