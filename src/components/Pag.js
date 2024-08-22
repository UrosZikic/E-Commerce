import { Pagination } from "antd";

export default function Pag({
  pageId,
  updatePageId,
  dataDisplay,
  categoryName,
  deviceName,
  price,
}) {
  const generateHref = (page) => {
    return (
      `/pages/store?i=${page}` +
      (categoryName ? `&n=${categoryName}` : "") +
      (deviceName ? `&d=${deviceName}` : "") +
      (price ? `&p=${price}` : "")
    );
  };
  return (
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
            <a href={generateHref(page)} className="paginationLink">
              {page}
            </a>
          );
        }
        if (type === "prev" && pageId >= 2) {
          return (
            <a
              href={generateHref(pageId - 1)}
              className="paginationLink"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {"<"}
            </a>
          );
        }
        if (
          type === "next" &&
          pageId < (dataDisplay && dataDisplay.length / 12)
        ) {
          return (
            <a
              href={generateHref(pageId + 1)}
              className="paginationLink"
              style={{ display: "block", width: "100%", height: "100%" }}
            >
              {">"}
            </a>
          );
        }
        return originalElement;
      }}
    />
  );
}
