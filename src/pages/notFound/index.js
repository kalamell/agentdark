import Image from "next/image";
export default function NotFound() {
  return (
    <>
      <div className="bg-singha max-xl:bg-[length:auto_40%] min-h-[calc(100vh_-_152px)] max-md:min-h-[calc(100vh_-_198px)] content-center">
        <div className="container mx-auto w-[512px] max-md:w-full py-9">
          <Image
            src="/logo-1.svg"
            width={300}
            height={189}
            alt="สมัครฟรี"
            priority={true}
            className="mx-auto my-auto max-md:w-[60%]"
          />
          <p className="font-athitiSemiBold text-[22px] max-md:text-[18px] leading-[30px] text-[#111827] text-center">
            404 <br />
            ขออภัย ไม่พบหน้าเว็บไซต์ที่คุณต้องการ
          </p>
        </div>
      </div>
    </>
  );
}
