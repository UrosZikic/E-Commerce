import Nav from "../components/nav";
import { useProducts } from "../useProducts";
import { Pagination } from "antd";
import "../styles/store.css";
import { useState, useEffect } from "react";

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
      setDataDisplay(
        () =>
          data && data.filter((item) => item.category.includes(categoryName))
      );
    } else {
      setDataDisplay(data && data);
    }
  }, [data, categoryName]);

  // console.log(
  //   data && data.filter((item) => item.category.includes(categoryName))
  // );

  return (
    <>
      <Nav data={data} />
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
