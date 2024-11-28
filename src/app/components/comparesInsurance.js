import Image from "next/image";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonOutlineBrown from "@/app/components/button/btn-outline-brown";
import useStore from "@/store/store";
import useCompareStore from "@/store/compareStore";
import { useRouter } from "next/router";

export default function ComparesInsurance({ data, compareLink }) {
  const router = useRouter();
  const { user, cc } = useStore();

  const { selectedItems, removeItem, clearItems } = useCompareStore();

  const calculatePrice = (price) => {
    if (user?.commission) {
      if (cc) {

        const fee = user.commission.fee;
        const rate = fee.default["default"];
        const commission = price.amt * rate;

        return Number(commission).toFixed(2);


      } else {
          const fee = user.commission.fee;
          const rate = fee.default["default"];
          const commission = price.amt * rate;
          const wht = commission * 0.03;
          const price_net = price.sum - (commission - wht);
          return Number(price_net).toFixed(2);
      }
    } else {
      return Number(price).toFixed(2);
    }
  };
  function formatNumber(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };

  const filters2 = [
    //{ value: "", label: "ทั้งหมด" },
    { value: "No", label: "ซ่อมห้าง" },
    { value: "Yes", label: "ซ่อมอู่" },
  ];

  const handleSelect = (item) => {
    if (selectedItems.find((i) => i._id.$oid === item._id.$oid)) {
      removeItem(item);
      //setError('');
    }
    //console.log(item);
  };

  return (
    <div className="fixed bg-[rgba(120,130,145,0.75)] bottom-0 z-50 w-full p-[24px] flex max-xl:flex-col gap-[16px] justify-center">
      <div className="container flex flex-wrap r w-full gap-[16px] max-md:h-[100vh] max-md:overflow-auto max-md:pt-[150px]">
        {data.map((item, inx) => {
          return (
            <div
              key={inx}
              className="bg-[#FFFFFF] rounded-[12px] px-[16px] pt-[24px] pb-[20px]  relative  xl:min-w-[calc(100%_/_3_-_16px)] max-xl:min-w-[calc(100%_/_2_-_8px)] max-md:min-w-[calc(100%)]"
            >
              <svg
                onClick={() => handleSelect(item)}
                class="cursor-pointer top-[18px] right-[30px] absolute"
                width="20"
                height="20"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13.5L13 1.5M1 1.5L13 13.5"
                  stroke="#9CA3AF"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>

              <div className="flex gap-x-[20px]">
                <Image
                  src={`/insurances/${item.master.code}.svg`}
                  width={50}
                  height={50}
                  alt=""
                  priority={true}
                  className="h-[50px] rounded-[12px]"
                />
                <div className="flex flex-col w-full">
                  <p className="font-athitiSemiBold text-[22px] leading-[30px]"></p>
                  <p className="font-athitiMedium text-[18px] leading-[24px] pb-[6px]">
                    {item.master.name}
                  </p>
                  <div className="flex justify-between">
                    <div className="flex gap-[10px]">
                      <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] border border-[#984333] rounded-md py-[3px] px-2.5">
                        ชั้น {filterclass[item.class]}
                      </p>
                      <p className="font-athitiSemiBold text-sm  text-[#984333] leading-[20px] bg-[#F1F6F7] rounded-md py-[3px] px-2.5">
                        ซ่อม{item.garage == "No" ? "อู่" : "ห้าง"}
                      </p>
                    </div>

                    { cc && (
                      <div className="justify-end">
                        <p className="font-athitiMedium text-sm leading-[20px] text-[#808291]">
                          คอมมิชชั่น ฿
                        {formatNumber(
                          Number(calculatePrice(item.price))
                        )}
                        </p>
                      </div>
                      )}
                      
                  </div>
                </div>
              </div>
              <hr className="h-px bg-[#D1D5DB] border-0 mb-3 mt-4" />
              <div class="flex items-center justify-center gap-x-3">
              {
                cc ? (
                  <>
                  <p className="font-athitiSemiBold text-3xl leading-[40px] text-center">
                    ฿{item.price.sum.toLocaleString()}
                  </p>
                  </>
              ) : (
                <>
                  <p className="font-athitiMedium  text-[#808291] text-xl leading-[30px] line-through">
                    ฿{item.price.sum.toLocaleString()}
                  </p>

                  <p className="font-athitiSemiBold text-3xl leading-[40px] text-center">
                    ฿
                    {formatNumber(
                      Number(calculatePrice(item.price))
                    )}
                  </p>
                </>
              ) }
                
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex xl:flex-col gap-[10px] self-center">
        <div className="min-w-[165px]">
          <ButtonBrown text="เปรียบเทียบเลย" link={compareLink} font={18} />
        </div>
        <div className="min-w-[165px]">
          <ButtonOutlineBrown
            onClick={clearItems}
            text="ล้างค่าเปรียบเทียบ"
            font={18}
          />
        </div>
      </div>
    </div>
  );
}
