import "../globals.css";
import Navbar from "./navbar";
import Footer from "./footer";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/logoipsum-242.svg" />
      </Head>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <div className={`pt-[63px] max-md:pt-[73px]`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
