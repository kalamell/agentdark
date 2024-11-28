// pages/blankPage.js
import EmptyLayout from "@/app/components/EmptyLayout";
import TableCard from "@/app/components/templateComponent/table-card";
import { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";


import applicationStore from "@/store/applicationStore";
import useCarStore from "@/store/carStore";
function BlankPage( { appid }) {
  const router = useRouter();
  const hasFetched = useRef(false);


  const [formData, setFormData] = useState(null);

  const [informUser, setInformUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };


  const {
    fetchApplication,
  } = applicationStore();

  const { 
    fetchCarId,
    car
  } = useCarStore();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const carData = await fetchApplication(appid, 'quotation');

        console.log(' data : ', carData);

        if (!carData) {
          //console.log('error : ');
          //router.push("/login");
          return;
        }

        if (carData.data.status == 'Document') {
          router.push(`/app/${appid}/upload`)
        }

        if (carData.data.status !== 'Quotation') {
          router.push(`/quotation/${appid}/create`)
        }

        setFormData(carData);
        setIsLoading(false);

        console.log(" xxxxxx : ", formData);

        setFormData((prevState) => ({
          ...prevState,
          covered: {
            ...prevState.covered,
          },
        }));

        

        
      } catch (error) {
        //alert(' .. ', error);
        setIsLoading(false);
        //router.push('/login');
      }
    };

    if (appid && !hasFetched.current) {
      fetchData();
      //fetchCarId(formData?.data.car._id);

      hasFetched.current = true;
    }
  }, [appid]);

  useEffect(() => {

    
    if (formData) {
      
      fetchCarId(formData?.data.car_id);
    }

  }, [formData]);


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

   
   
    const basePrice = formData.data.package.price.sum;
    const discount = formData.data.discount;
   
    const finalPrice = basePrice - discount;

    return finalPrice.toLocaleString(); // Convert to a localized string
  };



  return (
   

    <div className="bg-singha-white max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)] print:p-0">
      <div className="container mx-auto max-md:w-full py-9 max-md:px-4 relative print:py-0 print:px-0">
      
      <button
        onClick={() => window.print()}
          type="button"
          className="fill-[#984333] print:hidden absolute right-[1.5em] bg-[#ffff] hover:fill-[#ffffff] hover:bg-[#984333] flex max-md:basis-1/2 max-w-[200px] justify-center items-center font-athitiSemiBold text-sm bg-[#ffffff] text-[#984333] hover:text-[#ffffff] leading-[20px] border border-[#984333] rounded-[36px] py-[7px] px-[18px] gap-x-1.5"
        >
          <svg
            width="24"
            height="24"
            className="fill-[#FFFFFF] hover:fill-[#984333]"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 17H19C20.1046 17 21 16.1046 21 15V11C21 9.89543 20.1046 9 19 9H5C3.89543 9 3 9.89543 3 11V15C3 16.1046 3.89543 17 5 17H7M9 21H15C16.1046 21 17 20.1046 17 19V15C17 13.8954 16.1046 13 15 13H9C7.89543 13 7 13.8954 7 15V19C7 20.1046 7.89543 21 9 21ZM17 9V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V9H17Z"
              stroke="#984333"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="max-md:hidden">พิมพ์ใบเสนอราคา</p>
        </button>



        <div class="flex justify-center items-center m-auto">
        <Image
            src="/logo-1.svg"
            width={150}
            height={95}
            alt="logo"
            priority={true}
            quality={100}
            className="mx-auto mb-[6px] print:w-[100px]"
          />
        </div>

        <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-md:leading-[38px] print:text-[24px]">
          ใบเสนอราคา
        </p>
        {
          !isLoading && (
        <p className="font-athitiSemiBold text-center text-2xl leading-[48px] max-md:text-3xl max-md:leading-[38px] print:text-[20px]">
          {`${car.brand} ${car.model?.main} ${car.year} ${car.model?.sub}`} 
        </p>
        )}
        {
          !isLoading ? (
            <>
            <div className="p-[24px] max-md:px-[10px] flex flex-col gap-y-[12px]  print:p-0">

              <div className="flex max-md:flex-col gap-x-4 print:gap-0 print:flex print:flex-row">
                <div className="w-full">

                  <div className="flex flex-row items-center gap-x-4 mb-3">
                    <p className="font-athitiSemiBold text-[22px] leading-[30px] print:text-[18px] ">
                      ข้อมูลผู้เอาประกัน
                    </p>
                    <hr className="h-px flex-grow bg-[#D1D5DB] border-0 rounded" />
                  </div>
                  <div className="grid grid-cols-[200px_auto] mb-3 font-athitiLight  text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                    <p>วันที่</p>
                    <p>: {formatDateAndAddYear(formData.data.created_at).formattedDate} </p>
                  </div>
                  <div className="grid grid-cols-[200px_auto] mb-3 font-athitiLight  text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                    <p>ชื่อลูกค้า</p>
                    <p>: {`${formData.data.covered.name.title} ${formData.data.covered.name.first} ${formData.data.covered.name.last}`}</p>
                  </div>
                  <div className="grid grid-cols-[200px_auto] mb-3 font-athitiLight  text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                    <p>เบอร์โทร</p>
                    <p>: {formData.data.covered.mobile}</p>
                  </div>

                </div>

                <div className="w-full">

                  <div className="flex flex-row items-center gap-x-4 mb-3">
                    <p className="font-athitiSemiBold text-[22px] leading-[30px] print:text-[18px]">
                      ผู้เสนอราคา
                    </p>
                    <hr className="h-px flex-grow bg-[#D1D5DB] border-0 rounded" />
                  </div>
                  
                  <div className="grid grid-cols-[200px_auto] mb-3 font-athitiLight  text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                    <p>ชื่อ</p>
                    <p>: {`${formData.data?.user?.agent?.name?.title} ${formData.data?.user?.agent?.name?.first} ${formData?.data?.user?.agent?.name?.last}`}</p>
                  </div>

                  <div className="grid grid-cols-[200px_auto] mb-3 font-athitiLight  text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                    <p>เบอร์โทร</p>
                    <p>: {`${formData.data?.user?.agent?.mobile}`}</p>
                  </div>

                  <div className="grid grid-cols-[200px_auto] mb-3 font-athitiLight  text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                    <p>เลขที่ใบอนุญาต</p>
                    <p>: {`${formData.data?.user?.agent?.oic?.card}`}</p>
                  </div>


                </div>

              </div>
              
              


              
              

              <div className="flex flex-row items-center gap-x-4">
                <p className="font-athitiSemiBold text-[22px] leading-[30px] print:text-[18px]">
                รายละเอียดการเอาประกัน
                </p>
                <hr className="h-px flex-grow bg-[#D1D5DB] border-0 rounded" />
              </div>

              <div className="flex max-md:flex-col font-athitiLight justify-between text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                <p>บจก.ประกันคุ้มภัย ชั้น {filterclass[formData.data.package?.class]} ซ่อม{formData.data.package?.garage == "No" ? "อู่" : "ห้าง"}</p>
                <p>{ Number(formData.data.package?.price.sum.toFixed(2)).toLocaleString()} บาท</p>
              </div>
              
              <div className="flex max-md:flex-col font-athitiLight justify-between text-[18px] leading-[24px] print:grid-cols-[100px_auto] print:text-[14px] print:leading-[14px]">
                <p>ส่วนลด</p>
                <p>{`${formData.data.discount.toFixed(2)}`} บาท</p>
              </div>

             

              {/*<div className="flex max-md:flex-col font-athitiLight justify-between text-[18px] leading-[24px]">
                <p>ประกันภัยภาคบังคับ (พ.ร.บ.)</p>
                <p>622 บาท</p>
              </div>

              <div className="flex max-md:flex-col font-athitiLight justify-between text-[18px] leading-[24px]">
                <p>ส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์</p>
                <p>50 บาท</p>
              </div>
              */}

              <hr className="h-px bg-[#F8F8F8] border-0 print:hidden" />

              <div>
                <div className="flex font-athitiSemiBold  justify-between text-[22px] leading-[30px] print:text-[18px]">
                  <p>ยอดเงินรวม</p>
                  <p>{calculatePrice()} บาท</p>
                </div>
                <p className="font-athitiLight text-[#808291] print:text-[14px]">
                  (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                </p>
              </div>

              <hr className="h-px bg-[#F8F8F8] border-0 print:hidden" />

              <div className="flex flex-row items-center gap-x-4">
                <p className="font-athitiSemiBold text-[22px] leading-[30px] print:text-[18px]">
                  รายละเอียดความคุ้มครอง
                </p>
                <hr className="h-px flex-grow bg-[#D1D5DB] border-0 rounded" />
              </div>

              <div className="flex flex-col gap-[20px]">
                <TableCard
                  bgTitle="#FDE68A"
                  bgContent="#FFFBEB"
                  title="ความผิดต่อบุคคลภายนอก"
                  type="thirdparty"
                  props={formData.data.package?.coverage.thirdparty}
                />

                <TableCard
                  bgTitle="#FED7AA"
                  bgContent="#FFF7ED"
                  title="ความรับผิดชอบต่อรถยนต์เสียหาย สูญหาย ไฟไหม้"
                  type="vehicle"
                  props={formData.data.package?.coverage.vehicle}
                />

                <TableCard
                  bgTitle="#F1F5D8"
                  bgContent="#FBFCF3"
                  title="ความคุ้มครองตามเอกสารแนบท้าย"
                  type="additional"
                  props={formData.data.package?.coverage.additional}
                />
              </div>
              <hr class="h-px flex-grow bg-[#D1D5DB] border-0 rounded mt-[26px] mb-[12px]" />
              <div className="flex flex-col gap-[6px] text-center font-athitiMedium text-[18px] leading-[24px] print:text-[14px]">
                
                <p>บริษัท เดโมโบรกเกอร์ จำกัด</p>
                <p>
                99/99 ชั้น 9  กรุงเทพมหานคร 10100
                </p>
                <p>
                  โทร :
                  <a className="underline" href="tel:02-275-9119">
                    02-999-9999
                  </a>
                </p>
                <p>
                  Email :
                  <a className="underline" href="mailto:">
                    noreply@agetndemo.com
                  </a>
                </p>
              </div>
            </div>
            
            </>
          ) : null }
        
      </div>
    </div>
  );
}

// Specify the layout for this page
BlankPage.getLayout = function getLayout(page) {
  return <EmptyLayout>{page}</EmptyLayout>;
};

export default BlankPage;



export const getServerSideProps = async ({ params }) => {
  // Assuming params.slug is something like '123-car-model'
  const { appid } = params;

  return {
    props: {
      appid,
    },
  };
};

