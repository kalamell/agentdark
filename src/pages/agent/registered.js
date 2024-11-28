import Image from "next/image";
import useStore from "@/store/store";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function agentRegistered() {
    const [ isLoading, setIsLoading ] = useState(true);
    const { user, token } = useStore();

    const router = useRouter();

    

    useEffect(() => {
        let timer;
        
        
        if (user) {
            if (user.agent) {
                if (user.approve_at) {
                    router.push('/agent/dashboard')
                } else {
                    setIsLoading(false);
                }

            } else {
                router.push('/agent/register');
            }
        } else if (user === null) {
        // Set a 10-second delay before redirecting to login
            timer = setTimeout(() => {
                router.push('/login');
            }, 500);
        }

        return () => clearTimeout(timer);

      }, [user, router]);

    return (
         !isLoading ? (
        <>
        <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
            <div className="container mx-auto w-[582px] max-md:w-full py-9 max-md:px-4">
            <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
                สมัครสมาชิก เดโมโบรกเกอร์
            </p>
            <div className="pt-[24px] pb-6">
                <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
                <div className="bg-[#fff] rounded-xl p-6 flex flex-col gap-y-9">
                    <div className="flex flex-col gap-y-4 items-center">
                    <Image
                        src="/icon-22.svg"
                        width={48}
                        height={48}
                        alt="ประกันการเดินทาง"
                        priority={true}
                    />
                    <p className="font-athitiSemiBold text-center text-[22px] leading-[30px]">
                    ลงทะเบียนสมาชิกเรียบร้อย
                    </p>
                    <p className="font-athitiSemiBold text-[22px] leading-[30px]">
                    รอเจ้าหน้าที่ตรวจสอบ
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </>
        )
        : (
            <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
                <div className="container mx-auto w-[582px] max-md:w-full py-9">
                <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
                    สมัครสมาชิก เดโมโบรกเกอร์
                </p>
                <div className="pt-[24px] pb-6">
                    <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 shadow-md">
                    <div className="bg-[#fff] rounded-xl p-10 flex flex-col gap-y-9">
                        <div className="flex flex-col gap-y-4 items-center">
                        
                        <p className="font-athitiSemiBold text-[2rem] leading-[30px]">
                            กรุณารอสักครู่
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        ) 

    );
}
