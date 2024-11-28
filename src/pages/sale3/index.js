import { useState } from "react";
import CustomPagination from "@/app/components/pagination";
import NavLink from "../../app/components/navLink";

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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยรถยนต์ TOYOTA C-HR 1.8cc 4 Door ปี2023", link: "#" },
  ];

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[100%] max-md:w-full py-9">
          <p className="font-athitiBold text-[36px] leading-[48px] text-[#181B31] text-center max-mp:leading-[38px] max-mp:text-[30px]">
            ลูกค้าของฉัน
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-[24px] shadow-md">
              <div className="relative z-20 w-full h-auto max-h-[776px] max-md:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[12px] border">
                <div className="bg-[#FED7AA] flex flex-row items-center h-[46px] px-[24px] max-md:min-w-[220%] sticky top-0">
                  <p className="font-athitiMedium text-[18px] leading-[22px] flex-[3] text-[#181B31] max-md:flex-[1]">
                    รายชื่อลูกค้า
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] flex-[1] text-[#181B31]">
                    ทะเบียนรถยนต์
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] flex-[1] text-[#181B31]">
                    สถานะ
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] flex-[1] text-[#181B31]">
                    ยอดรวม (บาท)
                  </p>
                </div>
                {customerTableData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#FFFFFF] font-athitiMedium flex flex-row items-center px-[24px] h-[72px] max-md:min-w-[220%] border-b"
                  >
                    <p className="text-[16px] leading-[22px] flex-[3] text-[#181B31] max-md:flex-[1]">
                      {item.name}
                    </p>
                    <div className="flex-[1]">
                      <p className="text-[16px] leading-[22px] text-left pr-5 text-[#6B7280]">
                        {item.plate}
                      </p>
                    </div>
                    {item.status == "สำเร็จ" && (
                      <div className="flex-[1]">
                        <p className="pl-2 pr-2 rounded-full bg-[#D1FAE5] text-[#065F46] inline-block">
                          สำเร็จ
                        </p>
                      </div>
                    )}
                    {item.status == "รอจ่ายเงิน" && (
                      <div className="flex-[1]">
                        <p className="pl-2 pr-2 rounded-full bg-[#FEE2E2] text-[#991B1B] inline-block">
                          รอจ่ายเงิน
                        </p>
                      </div>
                    )}
                    {item.status == "รอตรวจสภาพ" && (
                      <div className="flex-[1]">
                        <p className="pl-2 pr-2 rounded-full bg-[#FEF3C7] text-[#181B31] inline-block">
                          รอตรวจสภาพ
                        </p>
                      </div>
                    )}
                    <p className="text-[16px] leading-[22px] flex-[1] text-left text-[#6B7280]">
                      {item.total}
                    </p>
                  </div>
                ))}
              </div>
              <div className="relative p-[24px] bg-[#FFFFFF] mt-[-10px] z-10 rounded-b-[12px]">
                <CustomPagination
                  props={{ total: total, page: page }}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    </>
  );
}
