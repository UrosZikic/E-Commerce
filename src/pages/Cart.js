import { useProducts } from "../useProducts";
import { useStored } from "../useStored";
import { useCart } from "../useCart";

import Nav from "../components/nav";
import "../styles/cart.css";
import IonIcon from "@reacticons/ionicons";

export default function Cart() {
  const { data, loading, error } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();
  const { stored } = useStored();
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
            <div key={id} className="cartedProduct defaultFlex">
              <img src={"../images/" + item.image + ".webp"} alt={item.name} />
              <div className="cartedProductRight defaultFlex flexJustifyBetween">
                <div className="defaultFlex flexColumn flexJustifyBetween">
                  <div>
                    <p>{item.name}</p>
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
                  </div>
                  <select name="" id="">
                    <option value="personal">For my account</option>
                    <option value="personal">For a friend</option>
                  </select>
                  <button>Select friend</button>
                </div>
                <div className="defaultFlex flexColumn flexJustifyEnd">
                  <p>${item.price}</p>
                  <div className="cartCommands defaultFlex flexJustifyBetween flexAlignEnd">
                    <button
                      onClick={() => {
                        addToCart(parseInt(item.id));
                        return (window.location.href = "/pages/cart");
                      }}
                    >
                      add
                    </button>
                    <p>|</p>
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
          ))}
      </div>
    </>
  );
}
