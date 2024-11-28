import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import CustomPagination from "@/app/components/pagination";
import NavLink from "../../app/components/navLink";

const mySaletMockData = [
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

const teamSaleMockData = [
  {
    month: "ม.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.พ.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 13000,
    target: 33000,
  },
  {
    month: "มี.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 43000,
    target: 53000,
  },
  {
    month: "เม.ษ.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 63000,
  },
  {
    month: "พ.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 33000,
    target: 53000,
  },
  {
    month: "มิ.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 13000,
    target: 73000,
  },
  {
    month: "ก.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ส.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ต.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "พ.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ธ.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
];

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

const pieChartMockData = [100, 80];

const myLineChartOptions = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "line",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 6,
  },
  series: [
    {
      name: "Total",
      data: [],
      color: "#3DCEB2",
    },
    {
      name: "Target",
      data: [],
      color: "#1A56DB",
    },
  ],
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ษ.", "พ.ค.", "มิ.ย."],
  },
  yaxis: {
    show: true,
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 10,
    },
  },
};

const teamLineChartOptions = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "line",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 6,
  },
  series: [
    {
      name: "Total",
      data: [],
      color: "#3DCEB2",
    },
    {
      name: "Target",
      data: [],
      color: "#1A56DB",
    },
  ],
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ษ.", "พ.ค.", "มิ.ย."],
  },
  yaxis: {
    show: true,
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 10,
    },
  },
};

const pieChartOptions = {
  chart: {
    type: "donut",
  },
  series: pieChartMockData,
  labels: ["ลูกค้าเก่า", "ลูกค้าใหม่"],
  colors: ["#FFCD0B", "#2D5A7A"],
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
      },
    },
  },
  legend: {
    position: "bottom",
    fontSize: "16px",
    labels: {
      colors: ["#00000061", "#00000061"],
    },
    itemMargin: {
      horizontal: 30,
      vertical: 20,
    },
  },
};

export default function Sale() {
  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยรถยนต์ TOYOTA C-HR 1.8cc 4 Door ปี2023", link: "#" },
  ];

  const [selectedMonth, setSelectedMonth] = useState(6);
  const [myChartoptions, setMyChartOptions] = useState(myLineChartOptions);
  const [teamChartoptions, setTeamChartOptions] =
    useState(teamLineChartOptions);
  const [mySaleTableData, setMySaleTableData] = useState([]);
  // const [teamSaleableData, setteamSaleableData] = useState([]);
  const [customerTableData, setCustomerTableData] = useState(customerMockData);
  const lineChartRefmy = useRef(null);
  const lineChartRefTeam = useRef(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);

  const handleChange = (event) => {
    if (event && event.target) {
      setSelectedMonth(Number(event.target.value));
    }
  };

  useEffect(() => {
    fetchTeamSaleChart();
    fetchPieChartData();
  }, []);

  useEffect(() => {
    // fetchTeamSaleChart();
    fetchMySaleChart();
    fetchMySaleTableData();
    // fetchteamSaleableData();
  }, [selectedMonth]);

  const fetchPieChartData = () => {
    if (
      document.getElementById("pie-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      const chart = new ApexCharts(
        document.getElementById("pie-chart"),
        pieChartOptions
      );
      chart.render();
    }
  };

  const fetchMySaleChart = () => {
    const totalList = [];
    const targetLits = [];
    const categories = [];
    for (let i = 0; i < selectedMonth; i++) {
      totalList.push(mySaletMockData[i].total);
      targetLits.push(mySaletMockData[i].target);
      categories.push(mySaletMockData[i].month);
    }
    myChartoptions.series[0].data = totalList;
    myChartoptions.series[1].data = targetLits;
    myChartoptions.xaxis.categories = categories;
    if (lineChartRefmy.current) {
      lineChartRefmy.current.destroy();
    }
    if (
      document.getElementById("line-chart-my") &&
      typeof ApexCharts !== "undefined"
    ) {
      console.log("11111");
      lineChartRefmy.current = new ApexCharts(
        document.getElementById("line-chart-my"),
        myChartoptions
      );
      lineChartRefmy.current.render();
    }
  };

  const fetchTeamSaleChart = () => {
    const totalList = [];
    const targetLits = [];
    const categories = [];
    for (let i = 0; i < 6; i++) {
      totalList.push(teamSaleMockData[i].total);
      targetLits.push(teamSaleMockData[i].target);
      categories.push(teamSaleMockData[i].month);
    }
    teamChartoptions.series[0].data = totalList;
    teamChartoptions.series[1].data = targetLits;
    teamChartoptions.xaxis.categories = categories;
    console.log(typeof teamChartoptions);
    if (lineChartRefTeam.current) {
      lineChartRefTeam.current.destroy();
    }
    if (
      document.getElementById("line-chart-team") &&
      typeof ApexCharts !== "undefined"
    ) {
      console.log("2222");
      lineChartRefTeam.current = new ApexCharts(
        document.getElementById("line-chart-team"),
        teamChartoptions
      );
      lineChartRefTeam.current.render();
    }
  };

  // const fetchteamSaleableData = () => {
  //     const data = [];
  //     for (let i = 0; i < selectedMonth; i++) {
  //         const item = {
  //             fullMonth: mySaletMockData[i].fullMonth,
  //             total: mySaletMockData[i].total,
  //             target: mySaletMockData[i].target
  //         }
  //         data.push(item)
  //     }
  //     setteamSaleableData(data)
  // }

  const fetchMySaleTableData = () => {
    const data = [];
    for (let i = 0; i < selectedMonth; i++) {
      const item = {
        fullMonth: mySaletMockData[i].fullMonth,
        total: mySaletMockData[i].total,
        target: mySaletMockData[i].target,
      };
      data.push(item);
    }
    setMySaleTableData(data);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center pt-[48px] pb-[36px]">
            <p className="font-athitiBold pb-[24px] text-[36px] leading-[48px] text-[#181B31] text-center max-mp:leading-[38px] max-mp:text-[30px]">
              ระบบงานขาย
            </p>
            <div className="flex flex-col p-[24px] shadow-md bg-[#FFFFFF] rounded-[24px] gap-y-[24px] w-full">
              <div>
                <p className="font-athitiSemiBold text-[22px] py-[16px] px-[20px] leading-[30px] text-[#181B31 bg-[#F1F5D8] rounded-t-[12px] max-mp:w-full">
                  งานขายของฉัน
                </p>
                <div className="flex flex-row bg-[#FBFCF3] px-[44px] py-[48px] gap-[30px] rounded-[12px] max-mp:p-5 max-mp:flex-col">
                  <div className="flex flex-col justify-center items-center w-full gap-y-[24px] max-mp:w-full max-mp:flex-col">
                    <div className="flex bg-white p-[24px] shadow-md border rounded-[12px] items-center w-full h-[128px] max-mp:w-full max-mp:h-full max-mp:mb-5">
                      <div className="w-full">
                        <div className="flex flex-row justify-between h-[38px] max-md:flex-col">
                          <p className="flex font-athitiRegular text-[18px] text-[#111827] items-center max-md:pl-0 max-md:pb-[12px]">
                            ยอดขายทั้งหมด
                          </p>
                          <div className="relative inline-block w-[140px] max-md:w-full">
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
                            <div className="flex absolute h-[20px] w-[20px] right-[12px] top-[10px] items-center justify-center pointer-events-none">
                              <svg
                                className="w-4 h-4 text-[#6B7280]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-content max-md:mt-[39px]">
                          <p className="font-athitiSemiBold text-[#3DCEB2] text-[30px] leading-[40px] max-mp:pl-0 max-mp:pt-2">
                            76,000
                          </p>
                          <p className="flex items-end font-athitiRegular text-[#6B7280] text-[18px] leading-[22px] pl-[8px] max-mp:pt-4">
                            จาก 600,400
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full h-[38px] justify-end">
                      <div className="flex flex-row w-[310px] h-[20px] justify-end items-center">
                        <hr className="h-1 w-[73px] bg-[#2D5A7A] border-0 rounded" />
                        <div className="pl-[16px] pr-[25px] font-athitiRegular text-[#667085] text-[16px] leadinf-[20px]">
                          เป้าหมาย
                        </div>
                        <hr className="h-1 w-[73px] bg-[#3DCEB2] border-0 rounded" />
                        <div className="pl-[16px] font-athitiRegular text-[#667085] text-[16px] leadinf-[20px]">
                          ยอดขาย
                        </div>
                      </div>
                    </div>
                    <div className="max-mp:w-full h-[500px] w-full">
                      <div className="bg-white" id="line-chart-my"></div>
                    </div>
                  </div>
                  <div className="flex flex-col max-mp:flex-col items-center w-full max-mp:w-full gap-y-7">
                    <div className="flex flex-row justify-center items-center shadow-md bg-white border rounded-[12px] w-full h-[128px] max-mp:w-full">
                      <div className="flex flex-col flex-1 justify-center items-center border-r h-full p-[24px]">
                        <p className="font-athitiSemiBold text-[30px] leading-[40px]">
                          76,000
                        </p>
                        <p className="font-athitiRegular flex justify-center w-[78px] h-[24px] border rounded-[12px] bg-[#0288D133] text-[#2D5A7A] text-[16px] leading-[20px] px-[10px] py-[2px] mt-[8px]">
                          เป้าหมาย
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 justify-center items-center md:border-r h-full p-[24px]">
                        <p className="font-athitiSemiBold text-[30px] leading-[40px]">
                          600,400
                        </p>
                        <p className="font-athitiRegular flex justify-center w-[78px] h-[24px] border rounded-[12px] text-[16px] leading-[20px] px-[10px] py-[2px] bg-[#3DCEB2] text-[#FFFFFF]  mt-[8px]">
                          ยอดขาย
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-auto max-h-[500px] bg-white rounded-[8px] border overflow-y-auto overflow-x-auto max-mp:min-w-[100%]">
                      <div className="font-athitiMedium text-[18px] text-left bg-[#E7E5E4] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[150%]">
                        <p className="leading-[22px] flex-[1]">เดือน</p>
                        <p className="leading-[22px] flex-[1]">ยอดรวม (บาท)</p>
                        <p className="leading-[22px] flex-[1]">
                          เป้าหมาย (บาท)
                        </p>
                      </div>
                      {mySaleTableData.map((item, index) => (
                        <div
                          key={index}
                          className="font-athitiMedium text-[16px] text-left text-[#6B7280] bg-[#FFFFFF] flex flex-row items-center h-[72px] px-[24px] border-b max-md:min-w-[150%]"
                        >
                          <p className="leading-[20px] flex-[1] text-[#111827]">
                            {item.fullMonth}
                          </p>
                          <p className="leading-[20px] flex-[1]">
                            {item.total}
                          </p>
                          <p className="leading-[20px] flex-[1]">
                            {item.target}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-athitiSemiBold text-[22px] py-[16px] px-[20px] leading-[30px] text-[#181B31 bg-[#FED7AA] rounded-t-[12px] max-mp:w-full">
                  ลูกค้าของฉัน
                </p>
                <div className="flex flex-row bg-[#FFF7ED] py-[48px] rounded-[12px] max-mp:p-5 max-mp:flex-col">
                  <div className="flex flex-[1] h-[432px] w-full mx-auto max-xl:w-[500px] max-mp:flex-col max-md:w-full">
                    <div
                      className="flex flex-grow items-center"
                      id="pie-chart"
                    ></div>
                  </div>
                  <div className="flex flex-[1.5] flex-col mr-[44px] max-mp:flex-col justify-center flex flex-row max-mp:mr-0">
                    <div className="bg-white font-athitiMedium  border rounded-[12px] justify-center shadow-md w-full h-[128px] flex flex-row max-md:w-full max-md:pt-[20px] max-md:pb-[20px] max-md:flex-col max-md:h-full">
                      <div className="flex flex-col flex-1 items-center justify-center border-r max-md:border-r-0 max-md:pb-[20px]">
                        <p className="font-athitiSemiBold text-[48px] leading-[48px] text-[#3DCEB2]">
                          250
                        </p>
                        <p className="mt-[8px] px-[12px] py-[2px] text-[16px] leading-[20px] rounded-[12px] bg-[#D1FAE5] text-[#065F46]">
                          สำเร็จ
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 min-h-full items-center justify-center border-r max-md:border-r-0 max-md:pb-[20px]  max-md:pt-[20px]">
                        <p className="font-athitiSemiBold text-[48px] leading-[48px] text-[#181B31]">
                          2
                        </p>
                        <p className="mt-2 pl-2 pr-2 rounded-[12px] bg-[#FEF3C7] text-[#181B31]">
                          รอตรวจสภาพ
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 min-h-full items-center justify-center  max-md:pt-[20px]">
                        <p className="font-athitiSemiBold text-[48px] leading-[48px] text-[#984333]">
                          5
                        </p>
                        <p className="mt-2 pl-2 pr-2 rounded-[12px] bg-[#FEE2E2] text-[#991B1B]">
                          รอจ่ายเงิน
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-auto max-h-[776px] max-mp:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[8px] border-2 mt-5">
                      <div className="font-athitiMedium text-[18px] bg-[#E7E5E4] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                        <p className="leading-[22px] flex-[1.3]">
                          รายชื่อลูกค้า
                        </p>
                        <p className="leading-[22px] flex-[1]">ทะเบียนรถยนต์</p>
                        <p className="leading-[22px] flex-[1]">สถานะ</p>
                        <p className="leading-[22px] flex-[1]">ยอดรวม (บาท)</p>
                      </div>
                      {customerTableData.map((item, index) => (
                        <div
                          key={index}
                          className="text-[16px] bg-[#FFFFFF] font-athitiMedium flex flex-row p-5 pl-10 max-md:min-w-[220%] border-b-2"
                        >
                          <p className="leading-[20px] flex-[1.3]">
                            {item.name}
                          </p>
                          <p className="leading-[20px] flex-[1] text-left text-[#6B7280]">
                            {item.plate}
                          </p>
                          {item.status == "สำเร็จ" && (
                            <div className="flex-[1]">
                              <p className="px-[10px] py-[2px] rounded-[10px] bg-[#D1FAE5] text-[#065F46] inline-block">
                                สำเร็จ
                              </p>
                            </div>
                          )}
                          {item.status == "รอจ่ายเงิน" && (
                            <div className="flex-[1]">
                              <p className="px-[10px] py-[2px] rounded-[10px] bg-[#FEE2E2] text-[#991B1B] inline-block">
                                รอจ่ายเงิน
                              </p>
                            </div>
                          )}
                          {item.status == "รอตรวจสภาพ" && (
                            <div className="flex-[1]">
                              <p className="px-[10px] py-[2px] rounded-[10px] bg-[#FEF3C7] text-[#181B31] inline-block">
                                รอตรวจสภาพ
                              </p>
                            </div>
                          )}
                          <p className="leading-[20px] flex-[1] text-[#6B7280]">
                            {item.total}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-[24px]">
                      <CustomPagination
                        props={{ total: total, page: page }}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-athitiSemiBold text-[22px] py-[16px] px-[20px] leading-[30px] text-[#181B31] max-mp:w-full bg-[#FDE68A] rounded-t-[12px]">
                  ลูกทีมของฉัน
                </p>
                <div className="w-full max-mp:w-full bg-[#FFFBEB] pt-[48px] pb-[112px] px-[44px] gap-[30px] max-mp:p-5 flex flex-row max-mp:flex-col max-mp:gap-0">
                  <div className="flex flex-[1] ">
                    <div className="flex-grow flex flex-col gap-[40px] max-mp:w-full h-[554px] max-mp:mb-[7rem]">
                      <div className="flex flex-row w-full justify-end items-center">
                        <hr className="h-1 w-[73px] bg-[#2D5A7A] border-0 rounded" />
                        <div className="pl-[16px] pr-[25px] font-athitiRegular text-[#667085]">
                          เป้าหมาย
                        </div>
                        <hr className="h-1 w-[73px] bg-[#3DCEB2] border-0 rounded" />
                        <div className="pl-[16px] font-athitiRegular text-[#667085]">
                          ยอดขาย
                        </div>
                      </div>
                      <div className="bg-white" id="line-chart-team"></div>
                    </div>
                  </div>
                  <div className="flex flex-[1.4] flex-col max-mp:flex-col max-mp:w-full gap-[28px]">
                    <div className="flex flex-row h-[36px] justify-between items-center max-mp:flex-col max-mp:items-start max-mp:mb-2">
                      <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#181B31] max-mp:mb-4">
                        ลูกทีมของฉัน
                      </p>
                      <div className="flex flex-row h-[36px] gap-[12px] font-athitiSemiBold max-mp:w-full max-md:justify-between">
                        <p className="flex text-nowrap items-center px-[18px] py-[6px] text-[14px] leading-[20px] border border-[#984333] bg-[#FFFFFF] text-[#984333] rounded-[32px] max-mp:mr-0 max-mp:pl-7 max-mp:pr-7 max-md:w-full max-mp:justify-center">
                          ดูลูกทีมทั้งหมด
                        </p>
                        <div className="flex flex-row border px-[18px] py-[6px] bg-[#984333] items-center justify-center rounded-[32px] max-mp:pl-7 max-mp:pr-7 max-md:w-full gap-[6px]">
                          <Image
                            src="/icon-16.svg"
                            width={15}
                            height={15}
                            alt=""
                            priority={true}
                          />
                          <p className="text-[14px] leading-[20px] text-[#FFFFFF]">
                            เพิ่มลูกทีม
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow w-full h-auto max-h-[500px] max-mp:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[8px] border-2 max-xl:mt-[30px]">
                      <div className="font-athitiMedium text-[18px] h-[68px] py-[23px] px-[24px] bg-[#E7E5E4] flex flex-row sticky top-0 items-center max-md:min-w-[220%] pr-0 max-mp:py-3 max-mp:pr-[10px]">
                        <p className="leading-[22px] flex-[2]">
                          ชื่อ - นามสกุล
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] flex-[1] text-center max-md:text-left">
                          เป้าหมาย
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] flex-[1] text-center max-md:text-left">
                          ยอดสะสมเดือนมิถุนายน
                        </p>
                      </div>
                      {teamSaleMockData.map((item, index) => (
                        <div
                          key={index}
                          className="bg-[#FFFFFF] h-[72px] flex flex-row border-b max-mp:py-3 max-md:min-w-[220%]"
                        >
                          <div className="flex flex-row flex-[2] items-center">
                            <div className="my-[16px] ml-[24px] h-[40px] w-[40px]">
                              <Image
                                src={item.image}
                                width={40}
                                height={40}
                                alt=""
                                priority={true}
                              />
                            </div>
                            <div className="p-[16px] pr-[42px] flex flex-col">
                              <p className="font-athitiMedium text-[16px] leading-[20px] break-word">
                                {item.name}
                              </p>
                              <p className="font-athitiRegular text-[16px] leading-[20px] break-word text-[#6B7280]">
                                {item.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-[1] items-center justify-center max-mp:justify-start">
                            <p className="font-athitiRegular text-[16px] leading-[20px] text-[#6B7280]">
                              {item.target}
                            </p>
                          </div>
                          <div className="flex flex-[1] items-center justify-center max-mp:justify-start">
                            <p className="font-athitiRegular text-[16px] leading-[20px] text-[#6B7280]">
                              {item.total}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      </div>
    </>
  );
}
