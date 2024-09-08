export default function ListProducts({
  dataDisplay,
  pageId,
  startPage,
  endPage,
}) {
  return (
    <div className="defaultWidth storeContainer defaultGrid gridTemplateColumns">
      {dataDisplay &&
        dataDisplay.map(
          (item, id) =>
            id + 1 >= startPage[pageId - 1] &&
            id < endPage[pageId - 1] && (
              <div
                key={id}
                className="justifySelfCenter storeProductContainer positionRelative"
                style={{ width: "250px" }}
              >
                <a href={`/pages/product?id=${item.id}`}>
                  <img
                    src={"../images/" + item.image + ".webp"}
                    alt={item.name}
                  />
                  <div style={{ padding: "0 0.5rem", border: "none" }}>
                    <p>{item.name}</p>
                    <p className="positionAbsolute price">{item.price}$</p>
                  </div>
                </a>
              </div>
            )
        )}
    </div>
  );
}
