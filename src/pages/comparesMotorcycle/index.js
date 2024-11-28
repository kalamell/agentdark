import NavLink from "@/app/components/navLink";
import Compares from "@/app/components/compares"

export default function comparesMotorcycle() {
  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยรถยนต์ TOYOTA C-HR 1.8cc 4 Door ปี2023", link: "#" },
  ];

  const data = [
    {
      img: "/icon-18.svg",
      brand1: "",
      brand2: "TOYOTA C-HR 1.8CC 4 DOOR",
      link1: "",
      link2: "",
      specialPrice: "",
      insuranceClass: "",
      arrangingRepairs: "",
      identifyTheDriver: "",
      deductible: "",
      carRepairFunds: "",
      lostOrBurned: "",
      floodInsurance: "",
      tpibHuman: "",
      tpibTime: "",
      property: "",
      personalAccident: "",
      medicalFee: "",
      driverInsurance: "",
    },
    {
      img: "/icon-19.svg",
      brand1: "เมืองไทยประกันภัย",
      brand2: "MTI 1 Easy SUV DG (กทม.และปริมณฑล)",
      link1: "#1",
      link2: "#2",
      specialPrice: "21,901",
      insuranceClass: "2+",
      arrangingRepairs: "ห้าง",
      identifyTheDriver: "ไม่ระบุ",
      deductible: "ไม่มี",
      carRepairFunds: "730,000",
      lostOrBurned: "730,000",
      floodInsurance: "730,000",
      tpibHuman: "1,000,000",
      tpibTime: "10,000,000",
      property: "5,000,000",
      personalAccident: "(1 + 6) 100,000",
      medicalFee: "(1 + 6) 100,000",
      driverInsurance: "300,000",
    },
    {
      img: "/icon-20.svg",
      brand1: "เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย)",
      brand2: "MSIG 1 SUV EASY",
      link1: "#1",
      link2: "#2",
      specialPrice: "21,901",
      insuranceClass: "2+",
      arrangingRepairs: "ห้าง",
      identifyTheDriver: "ไม่ระบุ",
      deductible: "ไม่มี",
      carRepairFunds: "730,000",
      lostOrBurned: "730,000",
      floodInsurance: "730,000",
      tpibHuman: "1,000,000",
      tpibTime: "10,000,000",
      property: "5,000,000",
      personalAccident: "(1 + 6) 100,000",
      medicalFee: "(1 + 6) 100,000",
      driverInsurance: "500,000",
    },
    {
      img: "/icon-21.svg",
      brand1: "วิริยะประกันภัย",
      brand2: "VIB 1 SINGLE RATE DG 2024 กลุ่ม4",
      link1: "#1",
      link2: "#2",
      specialPrice: "21,901",
      insuranceClass: "2+",
      arrangingRepairs: "ห้าง",
      identifyTheDriver: "ไม่ระบุ",
      deductible: "ไม่มี",
      carRepairFunds: "730,000",
      lostOrBurned: "730,000",
      floodInsurance: "730,000",
      tpibHuman: "1,000,000",
      tpibTime: "10,000,000",
      property: "5,000,000",
      personalAccident: "(1 + 6) 100,000",
      medicalFee: "(1 + 6) 100,000",
      driverInsurance: "300,000",
    },
  ];


  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9 max-xl:py-0">
        <div className="container mx-auto">
          
        </div>
      </div>
    </>
  );
}
