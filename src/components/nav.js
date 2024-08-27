import { useState } from "react";
import { useStored } from "../useStored";

import "../styles/nav.css";
import { Button, Dropdown, Space } from "antd";
import IonIcon from "@reacticons/ionicons";

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

export default function Nav({ data }) {
  const { stored } = useStored();

  return (
    <nav className="defaultWidth">
      <p>LOGO</p>
      <a href="/pages/Cart">
        <IonIcon className="cart_icon" name="bag-outline" />
      </a>
      <p>{stored.length}</p>
      <div className="positionRelative searchContainer">
        <SearchBar data={data} />
        <IonIcon
          className="cart_icon positionAbsolute magnifier"
          name="search"
        />
        <Dropdown
          className="positionAbsolute dropDownComponent"
          menu={{
            items,
          }}
          placement="bottom"
        >
          <Button>Categories</Button>
        </Dropdown>
      </div>

      <a href="/pages/store?i=1">store</a>
    </nav>
  );
}
function NavLinks() {}

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
    }
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
