import Nav from "../components/nav";
import Footer from "../components/footer";

import { filter } from "../filter";
import SortMenu from "../components/SortMenu";
import ListProducts from "../components/ListProducts";
import { useCart } from "../useCart";

import Pag from "../components/Pag";
import { useProducts } from "../useProducts";
import "../styles/store.css";
import { useState, useEffect, useRef } from "react";

export default function Store() {
  const { data, loading, error } = useProducts();
  const [dataDisplay, setDataDisplay] = useState();
  const { cart, addToCart, removeFromCart } = useCart();
  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);

  const curUrl = window.location.href;
  const urlObj = new URL(curUrl);
  const id = parseInt(urlObj.searchParams.get("i"));
  const totalPageNum = Math.ceil(data && data.length / 12);

  const pageId = id ? (id > 0 ? (id <= totalPageNum ? id : 1) : 1) : 1;

  const categoryName = urlObj.searchParams.get("n");
  const deviceName = urlObj.searchParams.get("d");
  const price = urlObj.searchParams.get("p");

  const startPage = [1, 13, 25, 37, 49];
  const endPage = [12, 24, 36, 48, 60];

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
      <Nav data={data} navCart={navCart} />
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
      <Footer dataDisplay={dataDisplay} />
    </>
  );
}
