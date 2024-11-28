import NavLink from "@/app/components/navLink";
import SearchResults from "@/app/components/searchResults";
import useStore from "@/store/store";
import usePackageStore from "@/store/packageStore";
import useCarStore from "@/store/carStore";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ComparesInsurance from "@/app/components/comparesInsurance";
import useCompareStore from '@/store/compareStore';
import Head from "next/head";
import { useRouter } from "next/router";
import Warning from "@/app/components/warning";

export default function ComparesCar({ brand, model, year, id }) {
  const { selectedItems } = useCompareStore();
  const { packages, fetchPackages } = usePackageStore();
  const [loading, setLoading] = useState(true); 
  const { car, fetchCarId } = useCarStore();
  const [mydata, setMyData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [total, setTotal] = useState(0);
  const { setCarId, setCar } = useCompareStore();

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState('');

  const { clearItems } = useCompareStore();


  const hasFetched = useRef(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    class: ['1', '2', '3', '4', '5', '6'],
    garage: '',
    sort: 'price_asc',
  });

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true); // Set loading to true before fetching
        await fetchCarId(id);
       // await fetchPackages(id, formData); 
        //console.log("WHAT");
        //console.log('pack : ', packages);
        setLoading(false); // Set loading to true before fetching
        clearItems();
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true); // Start loading
        
        const x = await fetchPackages(id, formData); // Fetch packages
        if (x == false) {
          router.push('/login');

        }

        setLoading(false); // Stop loading after fetching
      }
    };

    setTimeout(() => {
      if (packages.length === 0 && loading) { // Only fetch if packages are empty and not loading
        //console.log('fetch first');
        fetchData();
      }
    }, 1000);
  }, [id, formData]); // Run only when `id` or `formData` changes


  
  
  const handleFilter = (value) => {
    //setSortOrder(value.value);
    fetchPackages(id, value);
    console.log('handle filter');
    
  };


  useEffect(() => {
    if (car) {
        const carname = car?.brand + ' ' + car?.model?.main + ' ' + car?.model?.sub;
       
    }
  }, [car]);


  const { user, token } = useStore();

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: brand, link: "/" },
    { nav: model, link: "/" },
    { nav: year, link: "/" },
    { nav: `${car.model?.sub}`, link: "#" },
  ];

  const comparelink = `/car/insure/results/${brand}/${model}/${year}/${id}/compare`

  const sort = [
    { value: "asc", label: "ราคาน้อยไปมาก" },
    { value: "desc", label: "ราคามากไปน้อย" },
  ];

  
  return (
    <>
      <Head>
        <title>ประกันภัยสำหรับคุณ</title>
      </Head>
       

      
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9  min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto max-w-[1300px]  sm:px-4 max-md:px-4">
          
          <SearchResults
            filter={handleFilter}
            packages={packages}
            data={packages}
            brand={brand}
            model={model}
            year={year}
            carid={id}
            token={token}
            car={car}
            loading={loading}
          />
          
        </div>
        {selectedItems.length > 0 && (
          <ComparesInsurance 
            data={selectedItems}
            compareLink={comparelink}
          />
        )}

      </div>
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  // Assuming params.slug is something like '123-car-model'
  const { brand, model, year, id } = params;
  return {
    props: {
      brand,
      model,
      year,
      id,
    },
  };
};
