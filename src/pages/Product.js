import Nav from "../components/nav.js";
import Reviews from "../components/Reviews.js";
import Footer from "../components/footer";
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
  let fetchDevices =
    data && data.filter((data, id) => data.id === pageValue && data.device);

  let separateCategories =
    fetchCategories && fetchCategories[0].category.split(",");
  let separateDevices = fetchCategories && fetchCategories[0].device.split(",");

  return (
    <>
      <Nav data={data} navCart={navCart} />
      <div className="defaultWidth productContainer">
        {data &&
          data.map(
            (data, id) =>
              data.id === pageValue && (
                <div key={data.name} className="defaultFlex flexJustifyAround">
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
                          Price:
                          <a
                            href={`/pages/store?p=${Math.ceil(
                              parseFloat(data.price)
                            )}`}
                          >
                            {" "}
                            ${data.price}
                          </a>
                        </span>
                      </p>
                      <p>
                        Available on:
                        {separateDevices.map((dev, id) => (
                          <span key={dev + id}>
                            <a
                              href={`/pages/store?d=${dev.trim()}`}
                              style={{ color: "red" }}
                            >
                              {" "}
                              {dev}
                            </a>
                          </span>
                        ))}
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
                    <div style={{ marginTop: "4.5rem" }}>
                      <p style={{ fontSize: "1.7rem" }}>
                        <strong style={{ fontWeight: "400" }}>
                          Gameplay:{" "}
                        </strong>
                        Immersive mechanics, diverse challenges, and endless
                        entertainment for players.
                      </p>
                      <p style={{ fontSize: "1.7rem" }}>
                        <strong style={{ fontWeight: "400" }}>
                          Graphics:{" "}
                        </strong>
                        Stunning visuals with lifelike detail, enhancing
                        immersion and visual delight.
                      </p>
                      <p style={{ fontSize: "1.7rem" }}>
                        <strong style={{ fontWeight: "400" }}>
                          Replay value:{" "}
                        </strong>
                        Dynamic content ensures hours of enjoyment, with
                        captivating storylines.
                      </p>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>

      <Reviews pageValue={pageValue} />
      <Footer />
    </>
  );
}
