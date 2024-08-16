import { useState } from "react";
import "../styles/nav.css";
import IonIcon from "@reacticons/ionicons";

export default function Nav({ data }) {
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
    <nav className="defaultWidth">
      <p>LOGO</p>
      <a href="/pages/Cart">
        <IonIcon className="cart_icon" name="bag-outline" />
      </a>
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
    </nav>
  );
}
