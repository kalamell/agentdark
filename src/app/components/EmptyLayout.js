// components/EmptyLayout.js
import { useEffect } from "react";
export default function EmptyLayout({ children }) {

    useEffect(() => {
        // Clear the body background when EmptyLayout is used
        document.body.style.backgroundColor = 'transparent';
    
        // Reset body background when unmounting EmptyLayout
        return () => {
          document.body.style.backgroundColor = '';
        };
      }, []);

    return <>{children}</>;
  }