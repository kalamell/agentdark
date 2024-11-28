'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import CustomSelect from "./customSelect";
import ButtonBrown from "@/app/components/button/btn-brown";
export default function Insurance({
  labelBrand,
  brand,
  labelManufacture,
  manufacture,
  labelModel,
  model,
  labelSubModel,
  subModel,
  headerText,
  title,
  icon,
  selectedBrand,
  selectedManufacture,
  selectedModel,
  selectedSubModel,
  onSearch,
  isLoading,
  checkDisable

  
}) {

  const [resetSelect1, setResetSelect1] = useState(false);
  const [resetSelect2, setResetSelect2] = useState(false);
  const [resetSelect3, setResetSelect3] = useState(false);
  const [resetSelect4, setResetSelect4] = useState(false);


  const handleselectedBrand = (value) => {
    selectedBrand(value)

    setResetSelect2(true);
    setResetSelect3(true);
    setResetSelect4(true);
    setTimeout(() => setResetSelect2(false), 0);
    setTimeout(() => setResetSelect3(false), 0);
    setTimeout(() => setResetSelect4(false), 0);
    
    
  }

  const handleselectedModel = (value) => {
    selectedModel(value);
    setResetSelect3(true);
    setResetSelect4(true);
    setTimeout(() => setResetSelect3(false), 0);
    setTimeout(() => setResetSelect4(false), 0);
    
  }
  

  return (
    <>
      <div className="bg-white/80 flex-1 rounded-3xl p-6 max-lg:px-5 shadow-md">
        <div className="bg-[#984333] hover:bg-[#f1f6f7] filter-984333 rounded-full p-[15px] inline-block">
          <Image src={icon} width={50} height={50} alt="car" priority={true} />
        </div>

        <div className="pb-5">
          <p className="font-athitiBold text-xl py-px">{headerText}</p>
          <p className="font-athitiRegular text-[#6B7280] text-sm">
            โปรดกรอกรายละเอียดให้ครบถ้วน
          </p>
        </div>
        <div className="p-5 bg-[#FFFFFF] rounded-xl">
          <p className="font-athitiMedium text-xl leading-[30px]">{title}</p>
          <div className="grid grid-cols-2 max-md:grid-cols-1 py-5 max-lg:py-6 gap-y-4 gap-x-6">
            <CustomSelect
              title={labelBrand}
              options={brand}
              onChange={handleselectedBrand}
              defaultLabel={`เลือก${labelBrand}`}
              reset={resetSelect1}
            />

            <CustomSelect
              title={labelModel}
              options={model}
              onChange={handleselectedModel}
              defaultLabel={`เลือก${labelModel}`}
              reset={resetSelect2}
            />

            <CustomSelect
              title={labelManufacture}
              options={manufacture}
              onChange={selectedManufacture}
              defaultLabel={`เลือก${labelManufacture}`}
              reset={resetSelect3}
            />

            <CustomSelect
              title={labelSubModel}
              options={subModel}
              onChange={selectedSubModel}
              defaultLabel={`เลือก${labelSubModel}`}
              reset={resetSelect4}
            />



           
          </div>
          <div className="md:w-[209px] mx-auto">
            <ButtonBrown isLoading={isLoading} disable={checkDisable} onClick={onSearch} text="เช็คราคา" />
          </div>
        </div>
      </div>
    </>
  );
}
