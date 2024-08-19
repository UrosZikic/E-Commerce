import Nav from "../components/nav";
import { useProducts } from "../useProducts";
import { Pagination } from "antd";
import "../styles/store.css";
import { useState, useEffect } from "react";
import { input, menu } from "@nextui-org/theme";

export default function Store() {
  const { data, loading, error } = useProducts();
  const [dataDisplay, setDataDisplay] = useState();
  const curUrl = window.location.href;
  const urlObj = new URL(curUrl);
  const pageId = parseInt(urlObj.searchParams.get("i"))
    ? parseInt(urlObj.searchParams.get("i"))
    : 1;
  const categoryName = urlObj.searchParams.get("n");
  const startPage = [1, 13, 25, 37];
  const endPage = [12, 24, 36, 48];

  useEffect(() => {
    if (categoryName) {
      const collection = categoryName.split(",");
      console.log(collection);
      setDataDisplay(() => {
        return (
          data &&
          data.filter((item) => {
            const categories = item.category
              .split(",")
              .map((cat) => cat.trim());
            return categories.some((cat) => collection.includes(cat));
          })
        );
      });
    } else {
      setDataDisplay(data && data);
    }
  }, [data, categoryName]);

  // console.log(
  // );

  return (
    <>
      <Nav data={data} />
      <SortMenu />
      <div className="defaultWidth storeContainer defaultGrid gridTemplateColumns">
        {dataDisplay &&
          dataDisplay.map(
            (item, id) =>
              id + 1 >= startPage[pageId - 1] &&
              id < endPage[pageId - 1] && (
                <div
                  key={id}
                  className="justifySelfCenter storeProductContainer"
                  style={{ width: "250px" }}
                >
                  <a href={`/pages/product?id=${item.id}`}>
                    <img
                      src={"../images/" + item.image + ".webp"}
                      alt={item.name}
                    />
                    <div
                      className="defaultFlex flexJustifyBetween"
                      style={{ padding: "0 0.5rem" }}
                    >
                      <p>{item.name}</p>
                      <p>{item.price}$</p>
                    </div>
                  </a>
                </div>
              )
          )}
      </div>
      <Pag
        pageId={pageId}
        dataDisplay={dataDisplay}
        categoryName={categoryName}
      />
    </>
  );
}

const SortMenu = () => {
  const [price, setPrice] = useState();
  const [cat, setCat] = useState([]);
  const [device, setDevice] = useState([]);

  const catOptions = [
    "Action",
    "Adventure",
    "Simulation",
    "Horror",
    "Puzzle",
    "RPG",
    "Sport",
  ];
  const devOptions = ["PC", "PS4", "XBOX", "NINTENDO"];

  function handlePriceRange(e) {
    const currentPrice = e.target.value;
    return setPrice(currentPrice);
  }
  function handleCategory(e) {
    const currentCat = e.target.name;
    setCat((prev) => {
      if (!prev.includes(currentCat)) {
        return [...prev, currentCat];
      } else {
        return prev.filter((item) => item !== currentCat);
      }
    });
  }

  function handleDevice(e) {
    const currentDev = e.target.name;
    setDevice((prev) => {
      if (!prev.includes(currentDev)) {
        return [...prev, currentDev];
      } else {
        return prev.filter((item) => item !== currentDev);
      }
    });
  }

  function executeFilter() {
    let urlBase = "/pages/store?";
    if (cat) {
      urlBase += "n=" + cat.join();
    }
    return (window.location.href = urlBase);
  }

  return (
    <menu>
      <div className="categoriesMenu defaultGrid gridTemplateColumnTwo">
        {catOptions.map((item, id) => (
          <div key={id} style={{ gap: "0.2rem" }} className="defaultFlex">
            <input
              type="checkbox"
              name={item !== "RPG" ? item.toLowerCase() : item}
              onChange={handleCategory}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="devicesMenu defaultGrid gridTemplateColumnTwo">
        {devOptions.map((item, id) => (
          <div key={id} style={{ gap: "0.2rem" }} className="defaultFlex">
            <input
              type="checkbox"
              name={item.toLowerCase()}
              onChange={handleDevice}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div className="priceRange defaultGrid gridTemplateColumnTwo">
        <input
          type="range"
          name="priceRange"
          min="0"
          max="46"
          value={price ? price : 0}
          step="1"
          onChange={handlePriceRange}
        />
        <p>{price}</p>
      </div>
      <button onClick={executeFilter}>Search</button>
    </menu>
  );
};

const Pag = ({ pageId, dataDisplay, categoryName }) => (
  <Pagination
    className={`defaultWidth defaultFlex flexJustifyCenter ${
      dataDisplay ? (dataDisplay.length < 13 ? "noShow" : "") : ""
    }`}
    defaultCurrent={pageId}
    total={dataDisplay && dataDisplay.length}
    showSizeChanger={false}
    pageSize={12}
    itemRender={(page, type, originalElement) => {
      if (type === "page") {
        return (
          <a
            href={
              `/pages/store?` +
              (categoryName ? `n=${categoryName}&` : "") +
              `i=${page}`
            }
            className={`paginationLink`}
          >
            {page}
          </a>
        );
      }
      if (type === "prev") {
        return (
          pageId >= 2 && (
            <a
              href={
                `/pages/store?` +
                (categoryName ? `n=${categoryName}&` : "") +
                `i=${pageId - 1}`
              }
              className="paginationLink"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {"<"}
            </a>
          )
        );
      }
      if (type === "next") {
        return (
          pageId < (dataDisplay && dataDisplay.length / 12) && (
            <a
              href={
                `/pages/store?` +
                (categoryName ? `n=${categoryName}&` : "") +
                `i=${pageId + 1}`
              }
              className="paginationLink"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {">"}
            </a>
          )
        );
      }
      return originalElement;
    }}
  />
);
