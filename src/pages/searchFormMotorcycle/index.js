import { useState } from "react";
import Insurance from "@/app/components/Insurance";

export default function SearchFormMotorcycle() {
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
              title="ข้อมูลรถยนต์"
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
            />
          </div>
        </div>
      </div>
    </>
  );
}
