import Image from "next/image";
import { useRouter } from "next/router";
import ButtonBrown from "@/app/components/button/btn-brown";


export default function NotFound() {

  const router = useRouter();
  return (
    <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
      <div className="container mx-auto w-[512px] max-md:w-full py-9 px-5">
        
        <div className="pt-[24px] pb-6">
          <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 px-9shadow-md">
            <div className="bg-[#fff] rounded-xl p-6">
              <div className="flex flex-col gap-y-4">
                
                <h1 className="text-center font-athitiBold xl:text-[5rem] text-[6rem]">404</h1>
                <p className="text-center font-athitiSemiBold sm:text-[16px] text-[1.5rem] text-[#808291]">ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ</p>
                <ButtonBrown
                  text="กลับไปหน้าแรก"
                  onClick={() => router.push('/')}
                />

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
