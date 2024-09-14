import { useProfiles } from "../useProfiles";
import { useState, useRef, useEffect } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { useProducts } from "../useProducts";
import { useCart } from "../useCart";
import { useOrders } from "../useOrders";
import { useReviews } from "../useReviews";
import "../styles/profile.css";
// import { button } from "@nextui-org/theme";

export default function Profile() {
  // localStorage.removeItem("review");

  const { data } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();

  const { orderData } = useOrders();
  const [navCart, setNavCart] = useState(cart.length);
  useEffect(() => setNavCart(cart.length), [cart]);

  const [activeForm, setActiveForm] = useState(false);
  const { dataProfile } = useProfiles();
  let profileData = JSON.parse(localStorage.getItem("profile"));
  let storeProfileData;

  if (dataProfile) {
    const latestData = dataProfile.find((item) => item.id === profileData.id);
    if (latestData) {
      const stringifyData = JSON.stringify(latestData);
      localStorage.setItem("profile", stringifyData);
      storeProfileData = JSON.parse(localStorage.getItem("profile"));
    }
  }

  // console.log(profileData, 23);
  delete profileData.password;
  // re-direct in case of no data
  if (!profileData) window.location.href = "/";
  // end

  const refs = {
    name: useRef(""),
    email: useRef(""),
    address: useRef(""),
    addressNumber: useRef(""),
    city: useRef(""),
    number: useRef(""),
  };

  function updateProductInfo(e, refName) {
    return (refs[refName].current = e.target.value);
  }

  function confirmUpdate(e) {
    e.preventDefault();
    for (const property in refs) {
      if (refs[property].current.length === 0) {
        return;
      }
    }
    window.location.href = `http://localhost:80/php/updateUserInfo.php?id=${profileData.id}&name=${refs.name.current}&email=${refs.email.current}&address=${refs.address.current}&addressNumber=${refs.addressNumber.current}&city=${refs.city.current}&number=${refs.number.current}`;
  }

  return (
    <>
      <Nav data={data} navCart={navCart} />

      <main className="defaultWidth defaultFlex flexJustifyAround mainProfile">
        <section>
          <h1>Profile info:</h1>
          {storeProfileData && (
            <div>
              <p>User id: {storeProfileData["id"]}</p>
              <p>Username: {storeProfileData["name"]}</p>
              <p>User full name: {storeProfileData["full name"]}</p>
              <p>User email address: {storeProfileData["email address"]}</p>
              <p>
                User physical address: {storeProfileData["address"]}{" "}
                {storeProfileData["address number"]}, {storeProfileData["city"]}
              </p>
              <p>User phone number: {storeProfileData["phone number"]}</p>
            </div>
          )}
          {activeForm && (
            <UpdateForm
              updateProductInfo={updateProductInfo}
              confirmUpdate={confirmUpdate}
            />
          )}
          <button onClick={() => setActiveForm((prev) => !prev)}>
            {activeForm ? "close update form" : "Update profile info"}
          </button>
          <button
            onClick={() => {
              localStorage.clear("profile");
              window.location.href = "/";
            }}
          >
            Log out
          </button>
        </section>

        {/* data = product data */}
        <PurchasedList
          orderData={orderData}
          data={data}
          storeProfileData={storeProfileData}
        />
      </main>
      <Footer />
    </>
  );
}

function UpdateForm({ updateProductInfo, confirmUpdate }) {
  return (
    <form className="defaultFlex flexColumn">
      <label htmlFor="fullName">Full name</label>
      <input
        type="text"
        id="fullName"
        onChange={(e) => updateProductInfo(e, "name")}
      />
      <label htmlFor="emailAddress">Email address</label>
      <input
        type="text"
        id="emailAddress"
        onChange={(e) => updateProductInfo(e, "email")}
      />
      <label htmlFor="address">address</label>
      <input
        type="text"
        id="address"
        onChange={(e) => updateProductInfo(e, "address")}
      />
      <label htmlFor="addressNumber">Address number</label>
      <input
        type="text"
        id="addressNumber"
        onChange={(e) => updateProductInfo(e, "addressNumber")}
      />
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        onChange={(e) => updateProductInfo(e, "city")}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        type="text"
        id="phoneNumber"
        onChange={(e) => updateProductInfo(e, "number")}
      />
      <button onClick={confirmUpdate}>Update</button>
    </form>
  );
}

function PurchasedList({ orderData = [], data = [], storeProfileData }) {
  const { reviewData } = useReviews();
  const retrieveUserReviews =
    reviewData &&
    storeProfileData &&
    reviewData.filter((item) => item.user_id === storeProfileData.id);

  const retrieveUserId = JSON.parse(localStorage.getItem("profile"));

  // Make sure retrieveUserId and orderData are valid before filtering
  const retrievePurchaseHistory =
    retrieveUserId &&
    orderData &&
    orderData.filter((data) => data.user_id === retrieveUserId.id);

  let retrieveOrders = [];

  // Check if retrievePurchaseHistory is an array before using map
  if (Array.isArray(retrievePurchaseHistory)) {
    retrievePurchaseHistory.forEach((item) => {
      if (item.ordered !== undefined) {
        retrieveOrders = [...retrieveOrders, item.ordered];
      }
    });
  }

  let orders = [];

  // Check if retrieveOrders is an array and if data exists
  if (Array.isArray(retrieveOrders) && Array.isArray(data)) {
    retrieveOrders.forEach((orderIndex) => {
      let isNumber;
      if (orderIndex.includes(",")) {
        isNumber = orderIndex.split(",");
        isNumber.forEach((index) => {
          const item = data[index - 1];
          orders.push(item);
        });
      } else {
        const item = data[orderIndex - 1];
        orders.push(item);
      }
    });
  }

  function reviewProduct(item, id, validate) {
    localStorage.setItem("review", [
      storeProfileData.id,
      id,
      item.id,
      validate,
    ]);
    window.location.href = `/pages/Product?id=${item.id}`;
  }
  function openReview(item, id, validate) {
    localStorage.setItem("review", [
      storeProfileData.id,
      id,
      item.id,
      validate,
    ]);
    window.location.href = `/pages/Product?id=${item.id}`;
  }
  return (
    <div>
      <h1>Purchase History</h1>
      {orders && orders.length > 0 ? (
        orders.map((item, id) => (
          <div
            className="purchaseHistoryContainer defaultFlex"
            key={Math.random() * 9999}
          >
            <img src={`../images/${item.image}.webp`} alt={item.name} />
            <div className="defaultFlex flexColumn">
              <p>{item.name}</p>
              {retrieveUserReviews && !retrieveUserReviews[id].review ? (
                <button onClick={() => reviewProduct(item, id, true)}>
                  review
                </button>
              ) : (
                <button onClick={() => openReview(item, id, false)}>
                  See review
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
}
