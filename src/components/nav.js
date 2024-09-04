import { useState, useEffect } from "react";
import { useStored } from "../useStored";
import { useCart } from "../useCart";

import "../styles/nav.css";
import { Button, Dropdown, Space } from "antd";
import IonIcon from "@reacticons/ionicons";

export default function Nav({ data, navCart }) {
  return (
    <nav className="defaultWidth defaultFlex flexJustifyBetween flexAlignCenter">
      <p>
        <a href="/">LOGO</a>
      </p>
      <div>
        <ul>
          <li>
            <a href="/pages/store?i=1">store</a>
          </li>
        </ul>
        <div className="positionRelative searchContainer">
          <SearchBar data={data} />
          <IonIcon
            className="cart_icon positionAbsolute magnifier"
            name="search"
          />
          <DropDown />
        </div>
      </div>

      <a href="/pages/Cart" className="positionRelative cart">
        <IonIcon className="cart_icon" name="bag-outline" />
        <p className="positionAbsolute cartNumber">{navCart}</p>
      </a>
    </nav>
  );
}

function DropDown() {
  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=action">
          Action
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=adventure">
          Adventure
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=simulation">
          Simulation
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=horror">
          Horror
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=puzzle">
          Puzzle
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=RPG">
          RPG
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <a rel="noopener noreferrer" href="/pages/store?n=sport">
          Sport
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      className="positionAbsolute dropDownComponent"
      menu={{
        items,
      }}
      placement="bottom"
    >
      <Button>Categories</Button>
    </Dropdown>
  );
}

function SearchBar({ data }) {
  const [results, setResults] = useState([]);

  const initiateResults = function (e) {
    const searchValue = e.target.value;

    if (!searchValue) return setResults([]);

    if (searchValue.length >= 3) {
      setResults(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else setResults(null);
    return results;
  };
  return (
    <div className="defaultWidth defaultFlex flexColumn">
      <input
        type="text"
        className="defaultWidth"
        placeholder="search games"
        onChange={initiateResults}
      />
      <div className="defaultWidth defaultFlex flexColumn resultSuggestContainer">
        {results &&
          results.map(
            (item, id) =>
              id < 5 && (
                <div key={item + " " + id}>
                  <a
                    href={`/pages/product?id=${item.id}`}
                    className="defaultFlex flexAlignCenter"
                  >
                    <img
                      src={"../images/" + item.image + ".webp"}
                      alt={item.name}
                    />
                    <p>{item.name}</p>
                  </a>
                </div>
              )
          )}
      </div>
    </div>
  );
}
