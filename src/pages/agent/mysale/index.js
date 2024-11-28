import { useEffect, useState, useRef } from "react";
import NavLink from "@/app/components/navLink";

import agentStore from "@/store/agentStore";

const mockData = [
  {
    month: "ม.ค.",
    fullMonth: "มกราคม",
    year: "2024",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.พ.",
    fullMonth: "กุมภาพันธ์",
    total: 46000,
    target: 56000,
  },
  {
    month: "มี.ค.",
    fullMonth: "มีนาคม",
    total: 23000,
    target: 25000,
  },
  {
    month: "เม.ษ.",
    fullMonth: "เมษายน",
    total: 12999,
    target: 18999,
  },
  {
    month: "พ.ค.",
    fullMonth: "พฤษภาคม",
    total: 6400,
    target: 16400,
  },
  {
    month: "มิ.ย.",
    fullMonth: "มิถุนายน",
    total: 7000,
    target: 9000,
  },
  {
    month: "ก.ค.",
    fullMonth: "กรกฎาคม",
    total: 23000,
    target: 53000,
  },
  {
    month: "ส.ค.",
    fullMonth: "สิงหาคม",
    total: 46000,
    target: 56000,
  },
  {
    month: "ก.ย.",
    fullMonth: "กันยายน",
    total: 23000,
    target: 18999,
  },
  {
    month: "ต.ค.",
    fullMonth: "ตุลาคม",
    total: 12999,
    target: 53000,
  },
  {
    month: "พ.ย.",
    fullMonth: "พฤศจิกายน",
    total: 6400,
    target: 16400,
  },
  {
    month: "ธ.ค.",
    fullMonth: "ธันวาคม",
    total: 7000,
    target: 9000,
  },
];

export default function Sale2() {
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [tableData, setTableData] = useState([]);
  const hasFetched = useRef(false);
  const { getSale, sale } = agentStore();

  useEffect(() => {
    if (!hasFetched.current) {
     
      //fetchTeamSaleChart();
      
      getSale();
      //fetchPieChartData();
      //fetchMySaleChart();

      hasFetched.current = true;
    }
  }, []);


  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ระบบงานขาย", link: "/agent" },
    { nav: "งานขายของฉัน", link: "#" },
  ];

  const handleChange = (event) => {
    if (event && event.target) {
      setSelectedMonth(Number(event.target.value));
    }
  };

  const monthsInThai = {
    "01": "มกราคม",
    "02": "กุมภาพันธ์",
    "03": "มีนาคม",
    "04": "เมษายน",
    "05": "พฤษภาคม",
    "06": "มิถุนายน",
    "07": "กรกฎาคม",
    "08": "สิงหาคม",
    "09": "กันยายน",
    "10": "ตุลาคม",
    "11": "พฤศจิกายน",
    "12": "ธันวาคม"
  };
  
  const convertDatesToThaiMonths = (date) => {
    const [year, month] = date.split("-");
    return `${monthsInThai[month]}`;
  };

  useEffect(() => {
    fetchTableData();
  }, [selectedMonth]);

  const fetchTableData = () => {
    const data = [];
    for (let i = 0; i < selectedMonth; i++) {
      const item = {
        fullMonth: mockData[i].fullMonth,
        total: mockData[i].total,
        target: mockData[i].target,
      };
      data.push(item);
    }
    console.log(data);
    setTableData(data);
  };

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[100%] max-md:w-full py-9 px-4">
          <p className="font-athitiBold text-[36px] leading-[48px] text-[#181B31] text-center max-mp:leading-[38px] max-mp:text-[30px]">
            งานขายของฉัน
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-[24px] shadow-md max-md:pb-[62px]">
              <div className="flex flex-row justify-between h-[38px] mb-[24px]">
                <p className="font-athitiSemiBold text-[22px] leading-[30px] pb-[32px] max-md:w-full">
                  งานขายของฉัน
                </p>
                <div className="relative inline-block w-[134px] max-md:w-[60%]">
                  <select
                    className="focus:outline-none py-[9px] px-[16px] shadow-sm font-athitiRegular text-[16px] text-[#6B7280] leading-[20px] bg-white border rounded-[40px] block w-[100%] appearance-none"
                    onChange={handleChange}
                    value={selectedMonth}
                  >
                    <option className="bg-white" value="6" selected>
                      6 เดือนล่าสุด
                    </option>
                    <option className="bg-white" value="12">
                      12 เดือนล่าสุด
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
              <div className="w-full h-auto max-h-[500px] shadow-md max-md:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[12px] border">
                <div className="bg-[#F1F5D8] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#181B31] flex-[3] max-md:flex-[1.5]">
                    เดือน
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#181B31] flex-[1.5] text-right ml-auto max-w-[250px]">
                    ยอดขาย (บาท)
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#181B31] flex-[1.5] text-right ml-auto max-w-[250px]">
                    ผลตอบแทน (บาท)
                  </p>
                  
                </div>
                {
                        sale?.sales.map((item, index) => (
                         
                          <div
                          key={index}
                          className="bg-[#FFFFFF] flex flex-row items-center px-[24px] h-[72px] max-md:min-w-[220%] border-b"
                          >
                          <p className="font-athitiMedium text-[16px] leading-[20px] flex-[3] text-[#181B31] max-md:flex-[1.5]">
                          {convertDatesToThaiMonths(item._id)}
                          </p>
                          <p className="font-athitiMedium text-[16px] leading-[20px] flex-[1.5] text-[#6B7280] text-right max-w-[250px]">
                          {Number(item.sale.toFixed(2)).toLocaleString()}
                          </p>
                          <p className="font-athitiMedium text-[16px] leading-[20px] flex-[1.5] text-[#6B7280] text-right max-w-[250px]">
                          {Number(item.comm.toFixed(2)).toLocaleString()}
                          </p>
                          
                          </div>


                        ))
                      }

               
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    </>
  );
}
