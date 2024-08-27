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
    <>
      <button onClick={() => setIsOpen((prev) => !prev)}>+</button>

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
                name={item !== "RPG" ? item.toLowerCase() : item}
                onChange={handleCategory}
              />
              <p>{item}</p>
            </div>
          ))}
        </div>
        <p>Devices</p>

        <div className="devicesMenu defaultGrid gridTemplateColumnTwo">
          {devOptions.map((item, id) => (
            <div key={id} style={{ gap: "0.2rem" }} className="defaultFlex">
              <input
                type="checkbox"
                name={item !== "nintendo" ? item.toUpperCase() : item}
                onChange={handleDevice}
              />
              <p>{item}</p>
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
          />
          <p>{price}</p>
        </div>
        <button
          onClick={executeFilter}
          disabled={!parseInt(price) && cat.length <= 0 && device.length <= 0}
        >
          Search
        </button>
      </menu>
    </>
  );
}
