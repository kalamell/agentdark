import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import MyInsurances from "../../app/components/myInsurances";
import NavLink from "../../app/components/navLink";
import Head from "next/head";
import useStore from "@/store/store";
import { useRouter } from "next/router";
import applicationStore from "@/store/applicationStore";
import Warning from "../../app/components/warning";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonLine from "@/app/components/button/btn-line";
import ButtonOutline from "@/app/components/button/btn-outline";

import TemplateLogin from "../../app/components/templateComponent/login";

export default function Insurances() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, setToken, token } = useStore();
  const [data, setData] = useState([]);
  const { fetchMyApplciation, createSupport } = applicationStore();
  const router = useRouter();

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState('');


  useEffect(() => {
    let timer;

    if (user) {
      setIsLoading(false);
    } else if (user === null) {
      // Set a 10-second delay before redirecting to login
      timer = setTimeout(() => {
        router.push("/login");
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [user, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mydata = await fetchMyApplciation();
        if (mydata) {
          setData(mydata);
        } else {
          //alert('false');
          //setIsOpenWarning(true);
          //setTextWarning('กรุณา Login ใหม่อีกครั้ง');
          setUser(null);
          setToken(null);
          router.push('/login');
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

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

      <Warning
        id="validateAgentForm"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />

      {!isLoading ? (
        <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)] md:px-6">
          <div className="container mx-auto max-md:w-full py-9 max-md:px-4">
            <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-md:leading-[38px]">
              ประกันภัยของฉัน
            </p>
            
            { data?.data?.length == 0 ? (
              
              <div className="container mx-auto w-[512px] max-md:w-full py-9 max-md:px-4">
                <div className="pb-6">
                  <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
                    <div className="bg-[#fff] rounded-xl p-6">
                        <div className="flex flex-col gap-y-4">
                      
                      
                        <p className="font-athitiSemiBold text-[22px] text-[#374151] leading-[30px] text-center">
                        ยังไม่มีประกันของท่าน
                          
                        </p>

                        <ButtonBrown
                          link="/searchFormCar"
                          text="เลือกซื้อประกัน"
                        />

                       
                      </div>
                    

                    </div>
                  </div>
                </div>
              </div>

              


            ) : (
              <div className="pt-[24px] pb-6">
                <div className=" bg-white/80 rounded-3xl p-6 max-md:px-5 shadow-md flex flex-col gap-y-12">
                  <MyInsurances insurances={data} />
                </div>
              </div>
            )}
          
          </div>
        </div>
      ) : null}
    </>
  );
}
