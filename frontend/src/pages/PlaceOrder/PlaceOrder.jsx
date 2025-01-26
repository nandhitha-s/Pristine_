import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // State to control popup visibility

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent form submission

    // Check if all required fields are filled
    const form = e.target.form;
    if (form.checkValidity()) {
      setIsOrderPlaced(true); // Display the order placed popup if the form is valid
    } else {
      alert("Please fill in all required fields."); // Alert user if form is incomplete
    }
  };

  return (
    <>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>
          <input type="email" placeholder="Email address" required />
          <input type="text" placeholder="Street" required />
          <div className="multi-fields">
            <input type="text" placeholder="City" required />
            <input type="text" placeholder="State" required />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="Zip Code" required />
            <input type="text" placeholder="Country" required />
          </div>
          <input type="text" placeholder="Phone" required />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit" onClick={handlePlaceOrder}>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>

      {/* Popup Modal */}
      {isOrderPlaced && (
        <div className="order-placed-popup">
          <div className="popup-content">
            <h2>Order Placed</h2>
            <p>Your order has been successfully placed!</p>
            <button onClick={() => setIsOrderPlaced(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrder;
