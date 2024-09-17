import { useState, useRef, useEffect } from "react";
import CartProduct from "../components/CartProduct";
import { useStored } from "../useStored";
import { useProducts } from "../useProducts";
import { useCart } from "../useCart";
import { useOrders } from "../useOrders";

import "../styles/checkOut.css";
import Nav from "../components/nav";
import Footer from "../components/footer";

const profileId = JSON.parse(localStorage.getItem("profile"));

export default function CheckOut() {
  if (!profileId) window.location.href = "/";

  const { data, loading, error } = useProducts();
  const { stored } = useStored();

  const { cart, addToCart, removeFromCart } = useCart();

  if (!cart.length) window.location.href = "/";

  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);

  const totalPrice =
    stored &&
    stored.reduce((cur, acc) => parseFloat(cur) + parseFloat(acc.price), 0);

  const devices = {
    PC: "logo-windows",
    PS4: "logo-playstation",
    XBOX: "logo-xbox",
    nintendo: "logo-dropbox",
  };
  return (
    <>
      <Nav data={data} navCart={navCart} />
      <main className="defaultDisplay defaultGrid gridTemplateColumnTwo gap-m checkOutContainer">
        <section className="formSection">
          <FormComponent />
        </section>
        <div className="cartContainer defaultWidth defaultFlex flexColumn">
          <h2
            style={{
              color: "white",
              fontSize: "3rem",
              fontWeight: "300",
              margin: "0",
            }}
          >
            Stored Items
          </h2>
          {stored &&
            stored.map((item, id) => (
              <div
                key={id}
                className="defaultFlex gap-m flexJustifyBetween flexAlignCenter checkOutList"
              >
                <img
                  src={`../images/${item.image}.webp`}
                  alt={`logo of ${item.name}`}
                />
                <p>{item.name}</p>
                <p>${item.price}</p>
              </div>
            ))}
          <p style={{ color: "white" }}>Total price: ${totalPrice}</p>
        </div>
      </main>
      <Footer cartValidate={true} />
    </>
  );
}

const FormComponent = () => {
  const { orderData } = useOrders();

  const retrieveOrders = orderData && orderData;
  // filterOrders returns the length so it has to return +1 in the end so the new item receives a new number for the list.
  const filterOrders =
    retrieveOrders &&
    retrieveOrders.filter((data) => data.user_id === profileId.id);

  let getRealOrders = [];

  filterOrders &&
    filterOrders.forEach((item) => {
      if (item.ordered.includes(",")) {
        const splitItem = item.ordered.split(",");
        getRealOrders = [...getRealOrders, ...splitItem];
      } else {
        getRealOrders = [...getRealOrders, item];
      }
    });

  const retrieveProfileData = JSON.parse(localStorage.getItem("profile"));

  const refs = {
    name: useRef(""),
    email: useRef(""),
    address: useRef(""),
    addressNumber: useRef(""),
    city: useRef(""),
    number: useRef(""),
    ordered: useRef(""),
    date: useRef(""),
  };

  function updateProductInfo(e, refName) {
    return (refs[refName].current = e.target.value);
  }
  function orderProduct() {
    refs.date.current = new Date();
    refs.ordered.current = JSON.parse(localStorage.getItem("cart"));
    for (const value of Object.values(refs)) {
      if (value.current === "") return console.log("something wrong");
    }
    localStorage.removeItem("cart");
    return (window.location.href = `http://localhost:80/index.php?name=${refs.name.current}&email=${refs.email.current}&address=${refs.address.current}&addressNumber=${refs.addressNumber.current}&city=${refs.city.current}&number=${refs.number.current}&ordered=${refs.ordered.current}&date=${refs.date.current}&user_id=${retrieveProfileData.id}&order_num=${getRealOrders.length}`);
  }

  return (
    <form
      action=""
      method=""
      className="purchaseForm cartContainer defaultWidth"
    >
      <div className="defaultFlex gap-s">
        <div className="defaultFlex flexColumn gap-s">
          <label htmlFor="" style={{ color: "white" }}>
            Full name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => updateProductInfo(e, "name")}
            className="purchaseInput"
            required
          />
        </div>
        <div className="defaultFlex flexColumn gap-s">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => updateProductInfo(e, "email")}
            className="purchaseInput"
            required
          />
        </div>
      </div>
      {/* x */}
      <div className="defaultFlex gap-s">
        <div className="defaultFlex flexColumn gap-s">
          <label htmlFor="" style={{ color: "white" }}>
            Address
          </label>
          <input
            type="text"
            onChange={(e) => updateProductInfo(e, "address")}
            className="purchaseInput"
          />
        </div>
        <div className="defaultFlex flexColumn gap-s">
          <label htmlFor="">Address number</label>
          <input
            type="number"
            onChange={(e) => updateProductInfo(e, "addressNumber")}
            className="purchaseInput"
          />
        </div>
      </div>
      {/* x */}
      <div className="defaultFlex gap-s">
        <div className="defaultFlex flexColumn gap-s">
          <label htmlFor="" style={{ color: "white" }}>
            City
          </label>
          <input
            type="text"
            onChange={(e) => updateProductInfo(e, "city")}
            className="purchaseInput"
          />
        </div>
        <div className="defaultFlex flexColumn gap-s">
          <label htmlFor="">Phone number</label>
          <input
            type="number"
            onChange={(e) => updateProductInfo(e, "number")}
            className="purchaseInput"
          />
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          return orderProduct();
        }}
      >
        Order
      </button>
    </form>
  );
};
