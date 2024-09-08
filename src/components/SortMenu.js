import { useState } from "react";

export default function SortMenu() {
  const [price, setPrice] = useState();
  const [cat, setCat] = useState([]);
  const [device, setDevice] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const catOptions = [
    "Action",
    "Adventure",
    "Simulation",
    "Horror",
    "Puzzle",
    "RPG",
    "Sport",
  ];
  const devOptions = ["PC", "PS4", "XBOX", "nintendo"];

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
    let urlBase = "/pages/store?i=1";
    if (cat.length < 1 && device.length < 1 && price === undefined)
      return (window.location.href = urlBase);
    if (cat.length >= 1) {
      urlBase += "&n=" + cat.join();
    }
    if (device.length >= 1) {
      urlBase += `&d=${device.join()}`;
    }
    if (price) {
      urlBase += `&p=${price}`;
    }
    return (window.location.href = urlBase);
  }

  return (
    <div className="sortMenuContainer">
      <button className="sortBtn" onClick={() => setIsOpen((prev) => !prev)}>
        Sort Products
      </button>

      <menu
        className={`sortProductContainer positionAbsolute ${
          isOpen ? "load" : "unLoad"
        }`}
      >
        <p>Categories</p>

        <div className="categoriesMenu defaultGrid gridTemplateColumnTwo">
          {catOptions.map((item, id) => (
            <div key={id} style={{ gap: "0.2rem" }} className="defaultFlex">
              <input
                type="checkbox"
                id={item}
                name={item !== "RPG" ? item.toLowerCase() : item}
                onChange={handleCategory}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        <p>Devices</p>

        <div className="devicesMenu defaultGrid gridTemplateColumnTwo">
          {devOptions.map((item, id) => (
            <div key={id} style={{ gap: "0.2rem" }} className="defaultFlex">
              <input
                type="checkbox"
                id={item}
                name={item !== "nintendo" ? item.toUpperCase() : item}
                onChange={handleDevice}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        <p>Price</p>
        <div className="priceRange defaultGrid gridTemplateColumnTwo">
          <input
            type="range"
            name="priceRange"
            min="0"
            max="46"
            value={price ? price : 0}
            step="1"
            onChange={handlePriceRange}
            id="price"
          />
          <label htmlFor="price">{price}</label>
        </div>
        <button
          className="sortOutBtn"
          onClick={executeFilter}
          disabled={!parseInt(price) && cat.length <= 0 && device.length <= 0}
          style={{
            color:
              !parseInt(price) &&
              cat.length <= 0 &&
              device.length <= 0 &&
              "gray",
          }}
        >
          Search
        </button>
      </menu>
    </div>
  );
}
