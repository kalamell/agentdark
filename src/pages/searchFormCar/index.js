import Image from "next/image";
import { useState, useEffect } from "react";
import Insurance from "@/app/components/Insurance";
import useCarStore from "@/store/carStore";
import useStore from "@/store/store";
import Head from "next/head";
import { useRouter } from "next/router";


export default function SearchFormCar() {
  const [selectedCarBrand, setSelectedCarBrand] = useState(null);
  const [selectedCarManufacture, setSelectedManufacture] = useState(null);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [selectedSubCarModel, setSelectedSubCarModel] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [checkDisable, setCheckDisable] = useState(true);

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
    fetchCarSubModel
  } = useCarStore();

  const { user } = useStore();

  const carBrand = [
    { value: " 1 ", label: " carBrand Option 1 " },
    { value: " 2 ", label: " carBrand Option 2 " },
    { value: " 3 ", label: " carBrand Option 3 " },
  ];
  const carManufacture = [
    { value: " 1 ", label: " carManufacture Option 1 " },
    { value: " 2 ", label: " carManufacture Option 2 " },
    { value: " 3 ", label: " carManufacture Option 3 " },
  ];
  const carModel = [
    { value: " 1 ", label: " carModel Option 1 " },
    { value: " 2 ", label: " carModel Option 2 " },
    { value: " 3 ", label: " carModel Option 3 " },
  ];

  const subCarModel = [
    { value: " 1 ", label: " subCarModel Option 1 " },
    { value: " 2 ", label: " subCarModel Option 2 " },
    { value: " 3 ", label: " subCarModel Option 3 " },
  ];

  const [selectedMCBrand, setSelectedMCBrand] = useState(null);
  const [selectedMCManufacture, setSelectedMCManufacture] = useState(null);
  const [selectedMCModel, setSelectedMCModel] = useState(null);
  const [selectedSubMCModel, setSelectedSubMCModel] = useState(null);

  const mcBrand = [
    { value: " 1 ", label: " mcBrand Option 1 " },
    { value: " 2 ", label: " mcBrand Option 2 " },
    { value: " 3 ", label: " mcBrand Option 3 " },
  ];
  const mcManufacture = [
    { value: " 1 ", label: " mcManufacture Option 1 " },
    { value: " 2 ", label: " mcManufacture Option 2 " },
    { value: " 3 ", label: " mcManufacture Option 3 " },
  ];
  const mcModel = [
    { value: " 1 ", label: " mcModel Option 1 " },
    { value: " 2 ", label: " mcModel Option 2 " },
    { value: " 3 ", label: " mcModel Option 3 " },
  ];

  const subMcModel = [
    { value: " 1 ", label: " subMcModel Option 1 " },
    { value: " 2 ", label: " subMcModel Option 2 " },
    { value: " 3 ", label: " subMcModel Option 3 " },
  ];

  const router = useRouter();

  useEffect(() => {
    fetchCarBrands();
  }, [fetchCarBrands, brand]);

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
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9 min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto text-center">
          <h1 className="font-athitiBold max-lg:text-[32px] max-lg:leading-[41px] max-lg:pb-6 leading-[48px] text-4xl leading-[48px] max-lg:leading-[42px]  ">
            เดโมโบรกเกอร์ <br className="lg:hidden max-lg:block" />
            บริการด้านการประกันภัย
          </h1>
          <p className="font-athitiMedium text-xl leading-[30px] max-lg:pb-5">
            ซื้อประกันออนไลน์กับเรา <br className="lg:hidden max-lg:block" />
            รับส่วนลดทันที 20%
          </p>
          <div className="max-w-[582px] mx-auto py-6 flex max-xl:flex-col max-xl:px-9 max-md:px-0 gap-9">
          
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

          </div>
        </div>
      </div>
    </>
  );
}
