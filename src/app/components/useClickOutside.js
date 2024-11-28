import { useEffect } from "react";

const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.srcElement.localName === "a"
      ) {
        return;
      }
      handler();
    };
    // document.addEventListener("touchstart", listener);
    document.addEventListener("mousedown", listener);

    return () => {
      // document.removeEventListener("touchstart", listener);
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
