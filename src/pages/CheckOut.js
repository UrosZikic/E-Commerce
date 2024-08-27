import { useState, useRef, useEffect } from "react";
import CartProduct from "../components/CartProduct";
import { useStored } from "../useStored";
import { useProducts } from "../useProducts";
import "../styles/checkOut.css";
import Nav from "../components/nav";
import Cookies from "universal-cookie";

export default function CheckOut() {
  const { data, loading, error } = useProducts();
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
      <main className="defaultDisplay defaultGrid gridTemplateColumnTwo">
        <section className="formSection">
          <FormComponent />
        </section>
        <div className="cartContainer defaultWidth defaultFlex flexColumn">
          {stored &&
            stored.map((item, id) => (
              <CartProduct
                key={id}
                id={id}
                item={item}
                devices={devices}
                hand
              />
            ))}
        </div>
      </main>
    </>
  );
}

const FormComponent = () => {
  const cookies = new Cookies();

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
    refs.ordered.current = localStorage.getItem("cart");
    for (const value of Object.values(refs)) {
      if (value === "") return console.log("something wrong");
    }

    return (window.location.href = `http://localhost:80/index.php?name=${refs.name.current}&email=${refs.email.current}&address=${refs.address.current}&addressNumber=${refs.addressNumber.current}&city=${refs.city.current}&number=${refs.number.current}&ordered=${refs.ordered.current}&date=${refs.date.current}`);
  }

  return (
    <form
      action=""
      method=""
      className="purchaseForm cartContainer defaultWidth"
    >
      <div className="defaultFlex">
        <div className="defaultFlex flexColumn">
          <label htmlFor="" style={{ color: "white" }}>
            Full name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => updateProductInfo(e, "name")}
          />
        </div>
        <div className="defaultFlex flexColumn">
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            onChange={(e) => updateProductInfo(e, "email")}
          />
        </div>
      </div>
      {/* x */}
      <div className="defaultFlex">
        <div className="defaultFlex flexColumn">
          <label htmlFor="" style={{ color: "white" }}>
            Address
          </label>
          <input
            type="text"
            onChange={(e) => updateProductInfo(e, "address")}
          />
        </div>
        <div className="defaultFlex flexColumn">
          <label htmlFor="">Address number</label>
          <input
            type="number"
            onChange={(e) => updateProductInfo(e, "addressNumber")}
          />
        </div>
      </div>
      {/* x */}
      <div className="defaultFlex">
        <div className="defaultFlex flexColumn">
          <label htmlFor="" style={{ color: "white" }}>
            City
          </label>
          <input type="text" onChange={(e) => updateProductInfo(e, "city")} />
        </div>
        <div className="defaultFlex flexColumn">
          <label htmlFor="">Phone number</label>
          <input
            type="number"
            onChange={(e) => updateProductInfo(e, "number")}
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
