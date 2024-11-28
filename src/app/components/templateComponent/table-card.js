import Image from "next/image";

export default function TableCard({ props, title, bgTitle, bgContent, type }) {
  console.log('>> : table card : ', props);

  return (
    <div>
      <p className="font-athitiSemiBold text-[18px] leading-[22px] underline mb-[12px] print:text-[14px]">
        {title}
      </p>
      <div className="font-athitiMedium drop-shadow-[0_1px_2px_rgba(107,114,128,0.2)] rounded-t-lg print:text-[12px]">
        <div
          className={`flex  justify-between bg-[${bgTitle}] py-3 px-6  rounded-t-lg print:p-2 `}
        >
          <p>ความคุ้มครอง</p>
          <p className="max-md:hidden">ทุนประกัน (บาท)</p>
        </div>
        <div className={`bg-[${bgContent}] rounded-b-lg`}>

          {
            type == 'thirdparty' && (
              <div className="border-b last:border-0">
                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>1) ความเสียหายต่อชีวิต ร่างกาย ต่อ คน</p>
                  <p>{ Number(props.health_per_person).toLocaleString() } บาท</p>
                </div>

                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>2) ความเสียหายต่อชีวิต ร่างกาย ค่อ ครั้ง</p>
                  <p>{ Number(props.health_per_accident).toLocaleString() } บาท</p>
                </div>


                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>3) ความเสียหายต่อทรัพย์สิน ต่อ ครั้ง</p>
                  <p>{ Number(props.property).toLocaleString() } บาท</p>
                </div>
              </div>
            )
          }

          {
            type == 'vehicle' && (
              <div className="border-b last:border-0">
                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>1) ความเสียหายต่อรถยนต์
                  </p>
                  <p>{ props.damage == null ? 'ตามทุนประกัน' : 
                    props.damage == 0 ? 'ไม่คุ้มครอง' :
                    Number(props.damage).toLocaleString() + ' บาท'} </p>
                </div>

                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>• ความเสียหายส่วนแรก</p>
                  <p>{ props.deductible ? Number(props.deductible).toLocaleString() + ' บาท' : 'ไม่มี' }</p>
                </div>


                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>2) ความรับผิดชอบรถยนต์สูญหาย / ไฟไหม้</p>
                  <p>{ props.lossfire == null ? 'ตามทุนประกัน' : 
                    props.lossfire == 0 ? 'ไม่คุ้มครอง' :
                    Number(props.lossfire).toLocaleString() + ' บาท'} </p>
                </div>
              </div>
            )
          }

          {
            type == 'additional' && (
              <>
              <div className="border-b last:border-0">
                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>1) อุบัติเหตุส่วนบุคคล</p>
                  <p className="text-[#6B7280]"></p>
                </div>
                <div className="flex max-md:flex-col justify-between py-4 px-6  print:p-2 print:flex print:flex-row">
                    <p>{`• เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้ขับขี่ ${props.pa.driver} คน)`}</p>
                    <p className="text-[#6B7280]">{ Number(props.pa.expenses).toLocaleString() } บาท</p>
                </div>
                <div className="flex max-md:flex-col justify-between py-4 px-6  print:p-2 print:flex print:flex-row">
                    <p>{`• เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้โดยสาร ${props.pa.passenger} คน)`}</p>
                    <p className="text-[#6B7280]">{ Number(props.pa.expenses).toLocaleString() } บาท</p>
                </div>
              </div>

              <div className="border-b last:border-0">

                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>2) ค่ารักษาพยาบาล</p>
                  <p className="text-[#6B7280]"></p>
                </div>
                <div className="flex max-md:flex-col justify-between py-4 px-6  print:p-2 print:flex print:flex-row">
                    <p>{`• เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้ขับขี่ ${props.medical.driver} คน)`}</p>
                    <p className="text-[#6B7280]">{ Number(props.medical.expenses).toLocaleString() } บาท</p>
                </div>
                <div className="flex max-md:flex-col justify-between py-4 px-6  print:p-2 print:flex print:flex-row">
                    <p>{`• เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้โดยสาร ${props.medical.passenger} คน)`}</p>
                    <p className="text-[#6B7280]">{ Number(props.medical.expenses).toLocaleString() } บาท</p>
                </div>
              </div>

              <div className="border-b last:border-0">

                <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px] print:p-2 print:flex print:flex-row">
                  <p>3) การประกันตัวผู้ขับขี่</p>
                  <p className="text-[#6B7280]">{ Number(props.lg).toLocaleString()} บาท</p>
                </div>

              </div>
            </>


            )
          }


          
          {
          /*props.map((item, index) => (
            <div key={index} className="border-b last:border-0">
              <div className="flex max-md:flex-col justify-between py-4 px-6 border-b last:border-0 md:gap-[20px]">
                <p>{` ${index + 1}) ${item.protection}`}</p>
                <p className="text-[#6B7280]">{item.insuranceFund}</p>
              </div>

              {item.sub.map((item, index) => (
                <div key={index}>
                  <div className="flex max-md:flex-col justify-between py-4 px-6">
                    <p>{`• ${item.protection}`}</p>
                    <p className="text-[#6B7280]">{item.insuranceFund}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
            */}
        </div>
      </div>
    </div>
  );
}
