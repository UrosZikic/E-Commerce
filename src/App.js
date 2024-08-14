import "./styles/App.css";
import { useState, useEffect } from "react";
import { useProducts } from "./useProducts";

function App() {
  const { data, loading, error } = useProducts();
  console.log(data);

  return (
    <>
      {data &&
        data.map((item, id) => (
          <div key={id}>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.device}</p>
            <p>{item.price}</p>
            <p>{item.special ? "true" : "false"}</p>

            <img src={"../images/" + item.image + ".webp"} alt={item.image} />
          </div>
        ))}
    </>
  );
}

export default App;
