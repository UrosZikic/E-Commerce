import { useState } from "react";
import { useCart } from "../useCart";
import IonIcon from "@reacticons/ionicons";

export default function CartProduct({ id, item, devices }) {
  const { cart, addToCart, removeFromCart } = useCart();
  const [gift, setGift] = useState();
  function handleGift(e) {
    if (e.target.value === "gift") setGift(true);
    else setGift(false);
  }
  return (
    <>
      <div key={id} className="cartedProduct defaultFlex">
        <img
          src={"../images/" + item.image + ".webp"}
          alt={item.name}
          className="cartGameImg"
        />
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
            {/* x */}
            <div className="defaultFlex flexColumn flexJustifyEnd flexAlignEnd">
              <p>${item.price}</p>
              <div className="cartCommands defaultFlex flexJustifyEnd flexAlignEnd">
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
            {/* x */}
            {/* <select name="" id="" onChange={(value) => handleGift(value)}>
              <option value="personal">For my account</option>
              <option value="gift">For a friend</option>
            </select> */}
            {/* <button style={{ display: gift ? "block" : "none" }}>
              Select friend
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
