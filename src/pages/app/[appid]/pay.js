
import { useState, useEffect, useRef, Suspense } from "react";

import Image from "next/image";
import FormCard from "@/app/components/templateComponent/form-card";
import TextOnLine from "@/app/components/textComponent/text-on-line";
import ButtonBrown from "@/app/components/button/btn-brown";

import { formatNumberWithCommas }  from '@/lib/utils';

import applicationStore from "@/store/applicationStore";
import { useRouter } from "next/router";
export default function Payment({ appid }) {

    const router = useRouter();

  const [paymentOption, setPaymentOption] = useState("");

  const hasFetched = useRef(false);
  const intervalRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState(null);

  const {
    fetchApplication,
    checkoutApplication
  } = applicationStore();

  const confirmPay = async () => {
    try {
      const checkoutReponse = await checkoutApplication(appid);

      if (checkoutReponse.success) {
        //router.push(`/app/${appid}/pay`);
        window.open(
          checkoutReponse.data.data.payment.invoice.invoice_url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch (e) {
      console.error(e);
    }

    //setIsLoading(false);
  };


  const fetchData = async () => {
    try {
      const carData = await fetchApplication(appid);
      if (!carData) {
        //console.log('error : ');
        router.push("/login");
        return;
      }

      if (carData.status == 'Document') {
        router.push(`/app/${appid}/upload`)
      }

      if (carData.status == 'Paid') {
        router.push(`/myInsurances`);
      }

     
      setFormData(carData);
      setIsLoading(false);

      
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      //router.push('/login');
    }
  };

  if (appid && !hasFetched.current) {
    fetchData();
    hasFetched.current = true;
  }

  useEffect(() => {

    
  }, [formData]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(intervalRef.current); // Clear on component unmount
  }, []);


  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };

  const formatDateAndAddYear = (inputDate) => {
    const date = new Date(inputDate);
  
    // Format date as DD/MM/YYYY
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  
    // Add one year
    date.setFullYear(date.getFullYear() + 1);
    const nextYearDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  
    return { formattedDate, nextYearDate };
  };

  const calculatePrice = () => {
    /*
    app.price - app.discount + 50(ถ้ามี)
    */
    const basePrice = formData?.price;
    const discount = formData?.discount;
    //const tax = basePrice * 0.07;

    const additionalFee = formData?.is_del == true ? 50 : 0;
    const finalPrice = basePrice - discount + additionalFee;

    return finalPrice.toLocaleString(); // Convert to a localized string
  };

  return (
    <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
      <div className="container mx-auto w-[89.285%] max-md:w-full py-9 px-4">
        <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
          การชำระเงิน
        </p>
        { !isLoading ? (
        <>
        <p className="text-center font-athitiMedium leading-[30px] text-xl">
          ชำระตรงกับบริษัท{formData?.package?.insurer?.name}
        </p>

        <div className="pt-[24px] pb-6">
          <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
            <FormCard
              title="สรุปการสั่งซื้อประกันรถยนต์"
              text="center"
              bgTitle="#FDE68A"
              bgContent="#FFFFFF"
              paddingMbX={20}
            >
              <TextOnLine text="สรุปข้อมูลการชำระเงิน" />

              
              <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end gap-[14px] max-md:gap-[6px] font-athitiMedium text-[18px] leading-[22px]">
                    <p>
                    {formData?.package?.insurer.name} ชั้น{" "}
                    {filterclass[formData?.package.class]}{" "}
                    </p>
                    <p className="max-md:pb-[12px]">
                    {formData?.price.toLocaleString()} บาท
                    </p>

                      {/*<p>ประกันภัยภาคบังคับ (พ.ร.บ.)</p>
                    <p className="max-md:pb-[12px]"> บาท</p>*/}

                      <p>ส่วนลด</p>
                      <p className="max-md:pb-[12px]">
                        - {formatNumberWithCommas(Number(formData?.discount).toFixed(2))} บาท
                      </p>

                      {formData?.is_del == true ? (
                        <>
                          <p>ส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์</p>
                          <p className="max-md:pb-[12px]">50 บาท</p>
                        </>
                      ) : null}
                    </div>
                    <hr className="h-px bg-[#FFFFFF] border-0" />
                    <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end">
                      <p className="font-athitiSemiBold text-[22px] leading-[20px] text-start">
                        ยอดเงินรวม <br />
                        <span className="font-athitiMedium text-[16px] leading-[20px] text-[#808291]">
                          (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                        </span>
                      </p>
                      <p className="font-athitiSemiBold text-[22px] leading-[40px]">
                        {calculatePrice()} บาท
                      </p>
                    </div>


             

              <div className="max-w-[210px] w-full mx-auto mt-[40px]  flex items-center">
                  <ButtonBrown
                    onClick={confirmPay}
                    text="ไปหน้าชำระเงิน"
                  />
                </div>
            </FormCard>
          </div>
        </div>
        </> 
        ) : null }
      </div>
    </div>
  );
}


export const getServerSideProps = async ({ params }) => {
    // Assuming params.slug is something like '123-car-model'
    const { appid } = params;
  
    return {
      props: {
        appid,
      },
    };
  };