import { useProducts } from "../useProducts";
import { useStored } from "../useStored";
import { useCart } from "../useCart";
import { useState } from "react";

import Nav from "../components/nav";
import "../styles/cart.css";
import IonIcon from "@reacticons/ionicons";

export default function Cart() {
  const { data, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();

  const { stored } = useStored();
  console.log(stored);
  const devices = {
    PC: "logo-windows",
    PS4: "logo-playstation",
    XBOX: "logo-xbox",
    nintendo: "logo-dropbox",
  };

  return (
    <>
      <Nav data={data} />

      <div className="cartContainer defaultWidth defaultFlex flexColumn">
        {stored &&
          stored.map((item, id) => (
            <CartProduct key={id} id={id} item={item} devices={devices} hand />
          ))}
      </div>
    </>
  );
}

export function CartProduct({ id, item, devices }) {
  console.log(id, item, devices);
  const { cart, addToCart, removeFromCart } = useCart();
  const [gift, setGift] = useState();
  function handleGift(e) {
    if (e.target.value === "gift") setGift(true);
    else setGift(false);
  }
  return (
    <div key={id} className="cartedProduct defaultFlex">
      <img src={"../images/" + item.image + ".webp"} alt={item.name} />
      <div className="cartedProductRight defaultFlex flexJustifyBetween">
        <div className="defaultFlex flexColumn flexJustifyBetween">
          <div>
            <a href={`/pages/product?id=${item.id}`}>{item.name}</a>
            <p>
              <IonIcon
                className="categoryIcon"
                name={
                  item.device.includes("PC")
                    ? devices.PC
                    : item.device.includes("PS4")
                    ? devices.PS4
                    : item.device.includes("XBOX")
                    ? devices.XBOX
                    : devices.nintendo
                }
              />
            </p>
          </div>
          <select name="" id="" onChange={(value) => handleGift(value)}>
            <option value="personal">For my account</option>
            <option value="gift">For a friend</option>
          </select>
          <button style={{ display: gift ? "block" : "none" }}>
            Select friend
          </button>
        </div>
        <div className="defaultFlex flexColumn flexJustifyEnd">
          <p>${item.price}</p>
          <div className="cartCommands defaultFlex flexJustifyBetween flexAlignEnd">
            <button
              style={{
                borderRight: "1px solid white",
                paddingRight: "0.5rem",
              }}
              onClick={() => {
                addToCart(parseInt(item.id));
                return (window.location.href = "/pages/cart");
              }}
            >
              add
            </button>
            <button
              onClick={() => {
                removeFromCart(id);
                return (window.location.href = "/pages/cart");
              }}
            >
              remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
