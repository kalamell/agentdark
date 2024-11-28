import { useState, useEffect, useRef } from "react";
import CustomPagination from "@/app/components/pagination";
import NavLink from "@/app/components/navLink";

import CustomSelect from "@/app/components/customSelect";
import CustomTags from "@/app/components/customTags";
import InputCheck from "@/app/components/inputCheck";
import ButtonBrown from "@/app/components/button/btn-brown";

import Link from "next/link";
import agentStore from "@/store/agentStore";


import { formatNumberWithCommas }  from '@/lib/utils';
import MyApp from "@/pages/_app";

const customerMockData = [
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "รอจ่ายเงิน",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "รอตรวจสภาพ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
];

export default function Sale3() {
  const [customerTableData, setCustomerTableData] = useState(customerMockData);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);


  const { getMyCustomer, customer } = agentStore();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
     
      //fetchTeamSaleChart();
      
      getMyCustomer();
      //fetchPieChartData();
      //fetchMySaleChart();

      hasFetched.current = true;
    }
  }, []);

  useEffect(() => {
    console.log(customer);
  })


  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleChange = (event) => {
    if (event && event.target) {
      setSelectedMonth(event.target.value);
      if (event.target.value == '') {
        getMyCustomer();
      } else {
        getMyCustomer({
          'status': event.target.value
        });
      }
    }
  };

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ระบบงานขาย", link: "/agent" },
    { nav: "ลูกค้าของฉัน", link: "#" },
  ];

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
    { value: "", label: "สำเร็จ" },
    { value: "", label: "รอจ่ายเงิน" },
    { value: "", label: "รอตรวจสภาพ" },
  ];

  const filtersort = [
    //{ value: "asc", label: "ราคาน้อยไปมาก" },
    { value: "desc", label: "ราคามากไปน้อย" },
  ];

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[100%] max-md:w-full py-9 px-4">
          

          
          
          <p className="font-athitiBold text-[36px] leading-[48px] text-[#181B31] text-center max-mp:leading-[38px] max-mp:text-[30px]">
            ลูกค้าของฉัน
          </p>

          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-[24px] shadow-md">

            <div className="flex max-xl:flex-col max-xl:gap-[12px] items-center justify-between pb-9 max-md:w-[85%] max-md:mx-auto">
              <p className="font-athitiSemiBold text-lg leading-[22px] text-[#111827]">
                ลูกค้าของฉัน
              </p>
              <div className="grid grid-cols-[auto_auto_auto_auto] max-lg:grid-cols-[320px] max-md:grid-cols-[auto] max-lg:gap-[12px] max-md:w-full  items-center gap-x-3">
                
                <div className="flex items-center gap-x-3">
                  <p className="font-athitiMedium text-sm leading-[20px]">สถานะ</p>
                  <div className="relative inline-block w-[135px] max-md:w-[60%]">
                    <select
                      className="focus:outline-none py-[9px] px-[16px] shadow-sm font-athitiRegular text-[16px] text-[#6B7280] leading-[20px] bg-white border rounded-[40px] block w-[100%] appearance-none"
                      onChange={handleChange}
                    >

<option className="bg-white" value="" selected>
                        ดูทั้งหมด
                      </option>

                      <option className="bg-white" value="New" >
                        ใหม่
                      </option>

                      <option className="bg-white" value="CheckOut">
                        รอจ่ายเงิน
                      </option>

                      <option className="bg-white" value="Paid" >
                        ชำระเงินแล้ว
                      </option>
                      

                      <option className="bg-white" value="Document">
                        รอส่งเอกสาร
                      </option>


                    </select>
                    <div className="flex absolute h-[20px] w-[20px] right-[16px] top-[9px] items-center justify-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-[#6B7280]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>

                  </div>
                </div>

                <div className="flex items-center gap-x-3">
                  
                  <div className="w-full">
                    <InputCheck
                      hiddenTitle
                      options={filtersort}
                      onChange={() => {}}
                      placeholder="ค้นหา"
                    />
                  </div>

                  <button
                        type="button"
                        className={`flex items-center justify-center whitespace-nowrap font-athitiSemiBold text-[18px] bg-[#984333] text-white hover:bg-[#fee042] hover:text-[#984333] py-2 rounded-[80px] leading-[24px] w-[80px] max-md:w-[80px] transition-all duration-300 ease-in-out`}
                      >
                        <svg
                          className=""
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.5 16.5L11.5 11.5M13.1667 7.33333C13.1667 10.555 10.555 13.1667 7.33333 13.1667C4.11167 13.1667 1.5 10.555 1.5 7.33333C1.5 4.11167 4.11167 1.5 7.33333 1.5C10.555 1.5 13.1667 4.11167 13.1667 7.33333Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                  
                </div>
              </div>
            </div>



              <div className="relative z-20 w-full h-auto max-h-[776px] max-md:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[12px] border">
                    <div className="font-athitiMedium text-[18px] bg-[#E7E5E4] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                        <p className="leading-[22px] flex-[1.3]">
                          รายชื่อลูกค้า
                        </p>
                        <p className="leading-[22px] flex-[1]">ทะเบียนรถยนต์</p>
                        <p className="leading-[22px] flex-[1] text-center max-w-[250px]">สถานะ</p>
                        <p className="leading-[22px] flex-[1] text-right max-w-[250px]">ราคา (บาท)</p>
                      </div>
                      { customer?.data.map((item, index) => {

                        

                          let link = `/app/${item._id}`;
                          let color = 'text-[#181B31] bg-yellow-100';
                          let status = item.status;

                          if (item.status == 'CheckOut') {
                            status = 'รอจ่ายเงิน';
                            color = 'text-[#991B1B] bg-[#FEE2E2]';
                          }


                          if (item.status == 'New') {
                            status = 'รอทำรายการ';
                          }


                          if (item.status == 'Quotation') {
                            status = 'ใบเสนอราคา';
                          }

                          if (item.status == 'Document') {
                            link = `/app/${item._id}/upload`;
                            status = 'รอส่งเอกสาร';
                            color = 'text-[#984333] bg-[#FEE042]'
                          }

                          if (item.status == 'Paid') {
                            link = '#';
                            color = 'text-green-800 bg-green-100';
                            status = 'สำเร็จ';
                          }

                          

                          if (item.status == 'Document') {
                            link = `/app/${item._id}/upload`;

                          }

                          return (
                            <Link href={link}>
                            <div
                            key={index}
                            className="text-[16px] bg-[#FFFFFF] font-athitiMedium flex flex-row p-5 max-md:min-w-[220%] border-b-2"
                            >
                            <p className="leading-[20px] flex-[1.3]">
                            {`${item.covered?.name.first} ${item.covered?.name.last}`}
                            </p>
                            <p className="leading-[20px] flex-[1] text-left text-[#6B7280]">
                              {item.covered?.car.no.length > 0 ? item.covered?.car.no[0] + ' ' + item.covered?.car.no[1] : '-'}
                            </p>
                            <div className="flex flex-[1] justify-center">
                                <p className={`px-[10px] py-[2px] text-center max-w-[250px] rounded-[10px] ${color} inline-block`}>
                                  {status}
                                </p>
                            </div>

                            <p className="leading-[20px] flex-[1] text-right max-w-[250px] text-[#6B7280]">
                              {formatNumberWithCommas( item.price.toFixed(2) )}
                            </p>

                          
                            </div>
                            </Link>
                          )


                          })}
                     

              </div>
              <div className="relative p-[24px] bg-[#FFFFFF] mt-[-10px] z-10 rounded-b-[12px]">
                {/*<CustomPagination
                  props={{ total: total, page: page }}
                  onPageChange={handlePageChange}
                />
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    </>
  );
}
