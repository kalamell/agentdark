import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MyInsurances from "../../app/components/myInsurances";
import NavLink from "../../app/components/navLink";

export default function Insurances() {
  const Insurances = [
    {
      status: "success",
      download: "#",
      sendDoc: "",
    },
    {
      status: "verify",
      download: "",
      sendDoc: "",
    },
    {
      status: "sendDoc",
      download: "",
      sendDoc: "#",
    },
  ];

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
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
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 max-md:px-5 shadow-md flex flex-col gap-y-12">
              <MyInsurances payment insurances={Insurances} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
