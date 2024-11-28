import Layout from "../app/components/layout";
import { Head } from "next/document";


export default function MyApp({ Component, pageProps }) {
  // Use the page's `getLayout` function if available, otherwise default to <Layout>
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}