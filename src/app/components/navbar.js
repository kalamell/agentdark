import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import useClickOutside from "./useClickOutside";
import useStore from "@/store/store";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user, setUser, setToken, setCom } = useStore();
  const [navMoblie, setnavMoblie] = useState(false);
  const [navDesktop, setnavDesktop] = useState(false);
  const [login, setLogin] = useState(true);
  const [out, setOut] = useState(false);

  const closeDropdown = () => setnavDesktop(!navDesktop);

  const selectRef = useRef(null);
  useClickOutside(selectRef, closeDropdown);


  const router = useRouter();

  const handleSelect = () => {
    closeDropdown();
  };

  /*useEffect(() => {
    if (out) {
        console.log("OUT : ", out);

        // Perform necessary actions based on user state
        if (!user) {
            // Add any additional logic if needed
        }

        // Batch state updates
        setOut(false);
        setUser(null);
        setToken(null);

        // Use router.replace to prevent adding a new entry in the history stack
        router.replace('/');
    }
}, [out, user, router, setOut, setUser, setToken]);
*/

  const logOut = async () => {

    try {
      const response = await fetch('/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
          // Clear user state and token in Zustand
          setUser(null);
          setToken(null);

          // Redirect to login or home page
          router.push('/');
      } else {
          console.error('Failed to log out:', response.statusText);
      }
  } catch (error) {
      console.error('Logout error:', error);
  }
  };


  useEffect(() => {

    if (
      router.asPath !== "/login" &&
      router.asPath !== "/register" &&
      router.asPath !== "/notRegister" &&
      router.asPath !== "/forgotPassword"
    ) {
      sessionStorage.setItem("prevPath", router.asPath);
    }

    //console.log(user);
  }, [router, user]);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    /*if (window.innerWidth < 768) {
      router.push(
        "line://oaMessage/@245prkiq/%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88"
      );
    } else {
      setIsOpen(true);
      document.getElementById("popup-modal").classList.remove("hidden");
    }
      */

    router.push(
      "line://oaMessage/@611jhbvg/%E0%B8%95%E0%B8%B4%E0%B8%94%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88"
    );
  };

  const closeModal = (e) => {
    console.log(e.target.id);
    if (e.target.id === "popup-modal" || e.target.id === "close-button") {
      setIsOpen(false);
      document.getElementById("popup-modal").classList.add("hidden");
    }
  };

  return (
    <>
      <div className="bg-[#ffffff] drop-shadow-[0_1px_3px_rgba(0,0,0,0.20)] px-6 max-md:px-5">
        <div className="container mx-auto">
          <div className="flex justify-between py-[7px] max-md:py-[12px]">
            <Link href="/">
              <Image
                src="/logoipsum-242.svg"
                width={73}
                height={50}
                alt="logo"
                priority={true}
                quality={100}
              />
            </Link>

            <div className="flex items-center gap-x-3 ">
              <p className="font-athitiSemiBold text-[#000000] text-base max-md:hidden">
                สนใจทำประกัน โทร.
                <span className="underline">
                  <Link href="tel:">02-999-9999</Link>
                </span>
              </p>

              <button
                type="button"
                onClick={handleClick}
                className="bg-white max-md:bg-[#000000] max-md:border-[#0000000] border-[#000000] border-2 rounded-[32px] font-athitiSemiBold text-sm flex gap-x-1.5 items-center px-[18px] py-[6px] text-[#000000] max-md:text-[#FFFFFF] hover:border-[#777777]  transition-all duration-300 ease-in-out"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 14"
                  fill="none"
                  className="stroke-[#000000] max-md:stroke-[#FFFFFF] 
              "
                >
                  <path
                    d="M5 7H5.0075M8 7H8.0075M11 7H11.0075M14.75 7C14.75 10.3136 11.7279 13 6 13C6.84555 13 5.75879 12.7424 4.8085 12.2883L1.25 13L2.29624 10.21C1.63366 9.28176 1.25 8.18071 1.25 7C1.25 3.68629 4.27208 1 6 1C11.7279 1 14.75 3.68629 14.75 7Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                คุยกับเรา
              </button>

              {user ? (
                <>
                  <div
                    className="flex items-center gap-x-1.5 max-md:hidden cursor-pointer"
                    onClick={() => handleSelect()}
                  >
                    {
                      user?.line && user?.line?.pictureUrl ? (

                        <>
                      <img 
                         src={`${user.line.pictureUrl}`} alt="Profile Avatar" 
                          className="w-[38px] h-[38px] rounded-full border-2 border-black " />
                      </>
                      
                      ) : (
                        <>
                        
                       
                        <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M31.9999 16C31.9999 24.8366 24.8365 32 16 32C7.16343 32 0 24.8366 0 16C0 7.16344 7.16343 0 16 0C24.8365 0 31.9999 7.16344 31.9999 16ZM20 10C20 12.2091 18.2091 14 16 14C13.7908 14 12 12.2091 12 10C12 7.79086 13.7908 6 16 6C18.2091 6 20 7.79086 20 10ZM15.9998 18C11.9648 18 8.48787 20.3899 6.90745 23.8314C9.10804 26.3841 12.3653 28 15.9999 28C19.6345 28 22.8917 26.3841 25.0923 23.8316C23.5119 20.39 20.035 18 15.9998 18Z"
                          fill="#181B31"
                        />
                        </svg>
                        </>
                      )}

                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${
                        navDesktop ? "scale-y-[-1]" : "scale-y-[1]"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.292893 0.292893C0.683416 -0.097631 1.31658 -0.097631 1.7071 0.292893L4.99999 3.58579L8.29288 0.292893C8.6834 -0.0976311 9.31656 -0.0976311 9.70709 0.292893C10.0976 0.683416 10.0976 1.31658 9.70709 1.70711L5.7071 5.70711C5.31656 6.09763 4.68341 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683418 0.292893 0.292893Z"
                        fill="#181B31"
                      />
                    </svg>
                  </div>
                </>
              ) : (
                <Link href={`/login`}>
                  <button
                    type="button"
                    className="rounded-[32px] transition duration-500 font-athitiSemiBold text-sm flex px-[20px] py-[8px] bg-[#000000] text-white hover:bg-[#cccccc] max-md:hidden"
                  >
                    เข้าสู่ระบบ
                  </button>
                </Link>
              )}

              <svg
                width="24"
                height="24"
                viewBox="0 0 18 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="md:hidden cursor-pointer"
                onClick={() => {
                  setnavMoblie(!navMoblie);
                }}
              >
                <path
                  d="M1 1H17M1 7H17M1 13H17"
                  stroke="#181B31"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {navMoblie && (
          <div className="bg-white w-full h-full fixed z-10 top-0 left-0 min-h-screen">
            <div className="flex justify-between items-center py-[7px] max-md:py-[12px] px-5">
              <Link
                href="/"
                onClick={() => {
                  setnavMoblie(!navMoblie);
                }}
              >
                <Image
                  src="/logo-1.svg"
                  width={73}
                  height={50}
                  alt="logo"
                  priority={true}
                />
              </Link>

              <svg
                className="cursor-pointer"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setnavMoblie(!navMoblie);
                }}
              >
                <path
                  d="M6.5 18L18.5 6M6.5 6L18.5 18"
                  stroke="#A7A9B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <hr className="h-px bg-[#E5E7EB] border-0" />

            <div
              className="flex flex-col gap-y-3  py-4 px-5"
              onClick={() => {
                setnavMoblie(!navMoblie);
              }}
            >
              <div className="flex items-center gap-x-3">
              {
                      user?.line && user?.line?.pictureUrl ? (

                        <>
                      <img 
                         src={`${user.line.pictureUrl}`} alt="Profile Avatar" 
                          className="w-[38px] h-[38px] rounded-full border-2 border-black " />
                      </>
                      
                      ) : (
                        <>
                        
                       
                        <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M31.9999 16C31.9999 24.8366 24.8365 32 16 32C7.16343 32 0 24.8366 0 16C0 7.16344 7.16343 0 16 0C24.8365 0 31.9999 7.16344 31.9999 16ZM20 10C20 12.2091 18.2091 14 16 14C13.7908 14 12 12.2091 12 10C12 7.79086 13.7908 6 16 6C18.2091 6 20 7.79086 20 10ZM15.9998 18C11.9648 18 8.48787 20.3899 6.90745 23.8314C9.10804 26.3841 12.3653 28 15.9999 28C19.6345 28 22.8917 26.3841 25.0923 23.8316C23.5119 20.39 20.035 18 15.9998 18Z"
                          fill="#181B31"
                        />
                        </svg>
                        </>
                      )}

                <p className="font-athitiSemiBold text-xl leading-[40px]">
                  {user ? user.name : <Link href={`/login`}>เข้าสู่ระบบ</Link>}
                </p>
              </div>

              {user && (
                <div className="flex flex-col px-3">
                  {
                    !user.approve_at && (
                  <Link
                    href="/myInsurances"
                    className="font-athitiSemiBold text-xl leading-[40px]"
                  >
                    ประกันของฉัน
                  </Link>
                    ) }

{
                  (user.agent && user.approve_at) && (
                  <Link
                    href="/agent"
                    className="font-athitiSemiBold text-xl leading-[40px]"
                  >
                    ระบบงานขาย
                  </Link>
                  )}

                  <Link
                    href="/forgotPassword"
                    className="font-athitiSemiBold text-xl leading-[40px]"
                  >
                    เปลี่ยนรหัสผ่าน
                  </Link>
                  <Link
                    href="#"
                    onClick={logOut}
                    className="font-athitiSemiBold text-xl leading-[40px]"
                  >
                    ออกจากระบบ
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {navDesktop && (
        <div className="px-6 max-md:hidden" ref={selectRef}>
          <div className="container mx-auto">
            <div
              onClick={() => {
                setnavDesktop(!navDesktop);
              }}
              className="bg-white flex flex-col w-max text-[#181B31] float-right font-athitiMedium py-1.5 border rounded-lg leading-[32px] drop-shadow-[0_1px_3px_rgba(0,0,0,0.20)]"
            >
               {
                    !user.approve_at && (
              <Link
                className="pl-6 pr-10 hover:text-[#984333]"
                href="/myInsurances"
              >
                ประกันของฉัน
              </Link>
                    )}


              {
                  (user.agent && user.approve_at) && (
              <Link className="pl-6 pr-11 hover:text-[#984333]" href="/agent">
                ระบบงานขาย
              </Link>
                  )}

              <Link className="pl-6 pr-11 hover:text-[#984333]" href="/forgotPassword">
                เปลี่ยนรหัสผ่าน
              </Link>
              <Link
                className="pl-6 pr-11 hover:text-[#984333]"
                href="#"
                onClick={logOut}
              >
                ออกจากระบบ
              </Link>
            </div>
          </div>
        </div>
      )}

      <div
        id="popup-modal"
        onClick={closeModal}
        tabIndex="-1"
        className="hidden fixed inset-0 flex justify-center items-center z-50 bg-zinc-900/40"
      >
        <div className="relative">
          <div className="relative bg-white rounded-lg shadow  h-full w-full">
            <button
              id="close-button"
              type="button"
              onClick={closeModal}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
            >
              <svg
                id="close-button"
                className="w-3 h-3"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  id="close-button"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-[50px] max-md:px-[30px] max-md:py-[30px] flex flex-col items-center gap-[22px]">
              <Image
                src="/qr-line@.png"
                width={200}
                height={200}
                alt="ติดต่อเจ้าหน้าที่"
                priority={true}
              />
              <div className="flex gap-[8px] font-athitiSemiBold text-[22px] max-md:text-[20px]">
                <p>Scen QR Code</p>
                <Image
                  src="/logo-3.svg"
                  width={20}
                  height={20}
                  alt="ติดต่อเจ้าหน้าที่"
                  priority={true}
                />
                <p>เพื่อซื้อผ่านไลน์</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
