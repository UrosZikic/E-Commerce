export function filter(
  categoryName,
  deviceName,
  price,
  filteredOut,
  data,
  setDataDisplay
) {
  const collectionCat = categoryName && categoryName.split(",");
  const collectionDev = deviceName && deviceName.split(",");
  const collectionPrice = price && parseInt(price);

  (function filterByCategory() {
    if (collectionCat) {
      filteredOut.current =
        data &&
        data.filter((item) =>
          item.category.split(",").some((i) => collectionCat.includes(i.trim()))
        );
    } else {
      filteredOut.current = data;
    }
    function filterByDevice(filtered) {
      if (collectionDev) {
        const placeholder =
          filtered &&
          filtered.filter((item) =>
            item.device.split(",").some((i) => collectionDev.includes(i.trim()))
          );
        filteredOut.current = placeholder;
      } else {
        if (!collectionCat) filteredOut.current = data;
      }
      function filterByPrice(filtered) {
        if (collectionPrice) {
          const placeholder =
            filtered &&
            filtered.filter((item) =>
              item.price
                .split(",")
                .some((i) => collectionPrice >= parseFloat(i))
            );
          filteredOut.current = placeholder;
        }
        return setDataDisplay(filteredOut.current);
      }

      return filterByPrice(filteredOut.current);
    }
    return filterByDevice(filteredOut.current);
  })();
}
