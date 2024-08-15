import Nav from "../components/nav.js";
import { useProducts } from "../useProducts";
import { useState } from "react";
import "../styles/product.css";
import { useCart } from "../useCart";

export default function Product() {
  const { data, loading, error } = useProducts();
  const { cart, addToCart } = useCart();
  console.log(data && data[0]);
  const curUrl = window.location.href;
  const urlObj = new URL(curUrl);
  const pageValue = urlObj.searchParams.get("id");

  return (
    <>
      <Nav data={data} />
      <div className="defaultWidth productContainer">
        {data &&
          data.map(
            (data, id) =>
              data.id === pageValue && (
                <div key={data.name} className="defaultFlex">
                  <div className="productLeft">
                    <img
                      src={"../images/" + data.image + ".webp"}
                      alt={data.name}
                    />
                    <p>{data.description}</p>
                  </div>
                  <div className="productRight">
                    <p>{data.name}</p>
                    <div>
                      <p>${data.price}</p>
                      <p>Category: {data.category}</p>
                    </div>
                    <button onClick={() => addToCart(parseInt(data.id))}>
                      Add to cart
                    </button>
                  </div>
                </div>
              )
          )}
      </div>
    </>
  );
}
