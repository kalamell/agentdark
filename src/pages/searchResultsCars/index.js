import NavLink from "../../app/components/navLink";
import SearchResults from "../../app/components/searchResults";
import useStore from "@/store/store";
import usePackageStore from "@/store/packageStore";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ComparesCar() {
  const { packages, fetchPackages } = usePackageStore();
  const searchParams = useSearchParams();
  const submodel = searchParams.get("submodel");
  const title = searchParams.get("label");
  const [sortOrder, setSortOrder] = useState("asc");
  const [mydata, setMyData] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (submodel) {
      fetchPackages(submodel);
      setMyData(packages);
    }
    console.log("---");
    sortInsurances();
    console.log("ok");
  }, [fetchPackages, submodel, sortOrder]);

  const sortInsurances = () => {
    /*let sortedInsurances = [...packages];
    if (sortOrder === 'asc') {
      sortedInsurances.sort((a, b) => a.packages[0].price.sum - b.packages[0].price.sum);
    } else if (sortOrder === 'desc') {
      sortedInsurances.sort((a, b) => b.packages[0].price.sum - a.packages[0].price.sum);
    }

    console.log(' >>>> ', sortedInsurances);
    return sortedInsurances;
    */

    const sortedData = [...packages].sort((a, b) => {
      console.log(".. : ", sortOrder, " ddd ");
      if (sortOrder === "asc") {
        console.log(a.packages[0].price.sum, " - ", b.packages[0].price.sum);
        return a.packages[0].price.sum - b.packages[0].price.sum;
      } else {
        console.log(b.packages[0].price.sum, " - ", a.packages[0].price.sum);
        return b.packages[0].price.sum - a.packages[0].price.sum;
      }
    });

    console.log("FFFFFFF : ", sortedData);

    return sortedData;
  };

  const handleFilter = (value) => {
    setSortOrder(value.value);
    console.log(value.value);
  };

  const { user } = useStore();

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: title, link: "#" },
  ];

  const sort = [
    { value: "asc", label: "ราคาน้อยไปมาก" },
    { value: "desc", label: "ราคามากไปน้อย" },
  ];

  const data = [
    {
      logo: "/vib.svg",
      insuranceCompany: "วิริยะประกันภัย - Test1",
      packages: 1,
      startingPrice: "25,500",
      allPackages: [
        {
          name: "MTI 1 Easy SUV DG (ตจว.)  - Test1",
          capital: "ทุน ฿730,000",
          class: "ชั้น 1",
          repair: "ซ่อมห้าง",
          priceReduced: "29,000",
          price: "26,700.00",
          link1: "#1",
          link2: "#2",
          damageToCars: [
            {
              protection: "ความเสียหายต่อรถยนต์ - Test1",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
              insuranceFund: "ไม่คุ้มครอง",
              sub: [],
            },
          ],
          thirdPartyLiability: [
            {
              protection:
                "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ. - Test1",
              insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
          protectedAccordingDocuments: [
            {
              protection: "อุบัติเหตุส่วนบุคคล - Test1",
              insuranceFund: "",
              sub: [
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
              ],
            },
            {
              protection: "ค่ารักษาพยาบาล",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "การประกันตัวผู้ขับขี่",
              insuranceFund: "300,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
        },
      ],
    },
    {
      logo: "/mit.svg",
      insuranceCompany: "เมืองไทยประกันภัย - Test2",
      packages: 2,
      startingPrice: "23,500",
      allPackages: [
        {
          name: "ssMTI 1 Easy SUV DG (ตจว.) - Test2",
          capital: "ทุน ฿730,000",
          class: "ชั้น 1",
          repair: "ซ่อมห้าง",
          priceReduced: "29,000",
          price: "26,700.00",
          link1: "#1",
          link2: "#2",
          damageToCars: [
            {
              protection: "ความเสียหายต่อรถยนต์ - Test2",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้ - Test2",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "ความเสียหายเกิดจากภัยธรรมชาติ - Test2",
              insuranceFund: "ไม่คุ้มครอง",
              sub: [],
            },
          ],
          thirdPartyLiability: [
            {
              protection:
                "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ. - Test2",
              insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
          protectedAccordingDocuments: [
            {
              protection: "อุบัติเหตุส่วนบุคคล - Test2",
              insuranceFund: "",
              sub: [
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
              ],
            },
            {
              protection: "ค่ารักษาพยาบาล",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "การประกันตัวผู้ขับขี่",
              insuranceFund: "300,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
        },
        {
          name: "MTI 1 Easy SUV DG (ตจว.)",
          capital: "ทุน ฿730,000",
          class: "ชั้น 1",
          repair: "ซ่อมห้าง",
          priceReduced: "29,000",
          price: "26,700.00",
          link1: "#1",
          link2: "#2",
          damageToCars: [
            {
              protection: "ความเสียหายต่อรถยนต์",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
              insuranceFund: "ไม่คุ้มครอง",
              sub: [],
            },
          ],
          thirdPartyLiability: [
            {
              protection:
                "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ.",
              insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
          protectedAccordingDocuments: [
            {
              protection: "อุบัติเหตุส่วนบุคคล",
              insuranceFund: "",
              sub: [
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
              ],
            },
            {
              protection: "ค่ารักษาพยาบาล",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "การประกันตัวผู้ขับขี่",
              insuranceFund: "300,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
        },
      ],
    },
    {
      logo: "/msig.svg",
      insuranceCompany: "เอ็ม เอส ไอ จี ประกันภัย (ประเทศไทย) - Test3",
      packages: 3,
      startingPrice: "27,000",
      allPackages: [
        {
          name: "ssMTI 1 Easy SUV DG (ตจว.) - Test3",
          capital: "ทุน ฿730,000",
          class: "ชั้น 1",
          repair: "ซ่อมห้าง",
          priceReduced: "29,000",
          price: "26,700.00",
          link1: "#1",
          link2: "#2",
          damageToCars: [
            {
              protection: "ความเสียหายต่อรถยนต์ - Test3",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
              insuranceFund: "ไม่คุ้มครอง",
              sub: [],
            },
          ],
          thirdPartyLiability: [
            {
              protection:
                "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ. - Test3",
              insuranceFund:
                "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง) - Test3",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
          protectedAccordingDocuments: [
            {
              protection: "อุบัติเหตุส่วนบุคคล - Test3",
              insuranceFund: "",
              sub: [
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
              ],
            },
            {
              protection: "ค่ารักษาพยาบาล",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "การประกันตัวผู้ขับขี่",
              insuranceFund: "300,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
        },
        {
          name: "ssMTI 1 Easy SUV DG (ตจว.)",
          capital: "ทุน ฿730,000",
          class: "ชั้น 1",
          repair: "ซ่อมห้าง",
          priceReduced: "29,000",
          price: "26,700.00",
          link1: "#1",
          link2: "#2",
          damageToCars: [
            {
              protection: "ความเสียหายต่อรถยนต์",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
              insuranceFund: "ไม่คุ้มครอง",
              sub: [],
            },
          ],
          thirdPartyLiability: [
            {
              protection:
                "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ.",
              insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
          protectedAccordingDocuments: [
            {
              protection: "อุบัติเหตุส่วนบุคคล",
              insuranceFund: "",
              sub: [
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
              ],
            },
            {
              protection: "ค่ารักษาพยาบาล",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "การประกันตัวผู้ขับขี่",
              insuranceFund: "300,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
        },
        {
          name: "ssMTI 1 Easy SUV DG (ตจว.)",
          capital: "ทุน ฿730,000",
          class: "ชั้น 1",
          repair: "ซ่อมห้าง",
          priceReduced: "29,000",
          price: "26,700.00",
          link1: "#1",
          link2: "#2",
          damageToCars: [
            {
              protection: "ความเสียหายต่อรถยนต์",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "ความเสียหายเกิดจากภัยธรรมชาติ",
              insuranceFund: "ไม่คุ้มครอง",
              sub: [],
            },
          ],
          thirdPartyLiability: [
            {
              protection:
                "ความเสียหายต่อชีวิต ร่างกาย หรืออนามัยเฉพาะส่วนเกินวงเงินสูงสุดตาม พ.ร.บ.",
              insuranceFund: "1,000,000 บาท (ต่อคน) 10,000,000 บาท (ต่อครั้ง)",
              sub: [
                { protection: "ความเสียหายส่วนแรก", insuranceFund: "ไม่มี" },
              ],
            },
            {
              protection: "ความเสียหายต่อทรัพย์สินบุคคลภายนอก",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
          protectedAccordingDocuments: [
            {
              protection: "อุบัติเหตุส่วนบุคคล",
              insuranceFund: "",
              sub: [
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
                {
                  protection:
                    "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (ผู้ขับขี่ 1 คน)",
                  insuranceFund: "100,000 บาท (ต่อคน)",
                },
              ],
            },
            {
              protection: "ค่ารักษาพยาบาล",
              insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
              sub: [],
            },
            {
              protection: "การประกันตัวผู้ขับขี่",
              insuranceFund: "300,000 บาท (ต่อครั้ง)",
              sub: [],
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9   min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto md:p-[24px]">
          <SearchResults
            selectedSort={sort}
            filter={handleFilter}
            data={data}
            packages={packages}
          />
        </div>
      </div>
    </>
  );
}
