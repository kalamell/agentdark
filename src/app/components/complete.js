import Image from "next/image";
import { useState, useEffect } from "react";

export default function Complete({ id, isOpenWarning, textWarning, closeModel }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpenWarning) {
      handleClick();
      setIsOpen(false);
    }
  }, [isOpenWarning]);

  const handleClick = () => {
    setIsOpen(true);
    document.getElementById(`popup-modal-${id}`).classList.remove("hidden");
  };

  const closeModal = (e) => {
    if (e.target.id === `popup-modal-${id}` || e.target.id === "close-button") {
      setIsOpen(false);
      document.getElementById(`popup-modal-${id}`).classList.add("hidden");
      closeModel(false);
    }
  };

  return (
    <div
      id={`popup-modal-${id}`}
      onClick={closeModal}
      tabIndex="-1"
      className="hidden fixed inset-0 flex justify-center items-center z-50 bg-zinc-900/40"
    >
      <div className="relative">
        <div className="relative bg-white rounded-lg shadow p-[24px] min-w-[456px] min-h-[134px] max-md:min-w-[90vw]">
          <button
            id="close-button"
            type="button"
            onClick={closeModal}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="flex flex-col items-center gap-[22px]">
          <Image
                        src="/icon-22.svg"
                        width={48}
                        height={48}
                        alt="เรียบร้อย"
                        priority={true}
                    />
            <p className="font-athitiSemiBold text-[22px] max-md:text-[20px]">
              {textWarning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
