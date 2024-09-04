import Nav from "../components/nav.js";
import { useProducts } from "../useProducts";
import { useState, useEffect } from "react";
import "../styles/product.css";
import { useCart } from "../useCart";

export default function Product() {
  const { data, loading, error } = useProducts();
  const { cart, addToCart } = useCart();
  const curUrl = window.location.href;
  const urlObj = new URL(curUrl);
  const pageValue = urlObj.searchParams.get("id");
  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);

  let fetchCategories =
    data && data.filter((data, id) => data.id === pageValue && data.category);
  let separateCategories =
    fetchCategories && fetchCategories[0].category.split(",");
  console.log(data && separateCategories);

  return (
    <>
      <Nav data={data} navCart={navCart} />
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
                      <p>
                        <span>
                          <a
                            href={`/pages/store?i=1&p=${Math.ceil(
                              parseFloat(data.price)
                            )}`}
                          >
                            ${data.price}
                          </a>
                        </span>
                      </p>
                      <p>
                        Category:
                        {separateCategories.map((cat, id) => (
                          <span key={cat + id}>
                            <a
                              href={`/pages/store?n=${cat.trim()}`}
                              style={{ color: "red" }}
                            >
                              {" "}
                              {cat}
                            </a>
                          </span>
                        ))}
                      </p>
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
