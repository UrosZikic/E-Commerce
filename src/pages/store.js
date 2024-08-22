import Nav from "../components/nav";
import { filter } from "../filter";
import SortMenu from "../components/SortMenu";
import ListProducts from "../components/ListProducts";
import Pag from "../components/Pag";
import { useProducts } from "../useProducts";
import "../styles/store.css";
import { useState, useEffect, useRef } from "react";

export default function Store() {
  const { data, loading, error } = useProducts();
  const [dataDisplay, setDataDisplay] = useState();

  const curUrl = window.location.href;
  const urlObj = new URL(curUrl);
  const id = parseInt(urlObj.searchParams.get("i"));
  const totalPageNum = data && data.length / 12;

  const pageId = id ? (id > 0 ? (id <= totalPageNum ? id : 1) : 1) : 1;

  const categoryName = urlObj.searchParams.get("n");
  const deviceName = urlObj.searchParams.get("d");
  const price = urlObj.searchParams.get("p");

  const startPage = [1, 13, 25, 37];
  const endPage = [12, 24, 36, 48];

  const filteredOut = useRef();

  useEffect(() => {
    if (categoryName || deviceName || price) {
      filter(
        categoryName,
        deviceName,
        price,
        filteredOut,
        data,
        setDataDisplay
      );
    } else {
      setDataDisplay(data && data);
    }
  }, [data, categoryName, deviceName]);

  return (
    <>
      <Nav data={data} />
      <SortMenu />
      <ListProducts
        dataDisplay={dataDisplay}
        startPage={startPage}
        pageId={pageId}
        endPage={endPage}
      />
      <Pag
        pageId={pageId}
        dataDisplay={dataDisplay}
        categoryName={categoryName}
        deviceName={deviceName}
        price={price}
      />
    </>
  );
}
