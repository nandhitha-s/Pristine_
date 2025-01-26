import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // State to control popup visibility

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent form submission
    setIsOrderPlaced(true); // Display the order placed popup
  };

  return (
    <>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
          <div className="multi-fields">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="Zip Code" />
            <input type="text" placeholder="Country" />
          </div>
          <input type="text" placeholder="Phone" />
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
            <button onClick={handlePlaceOrder}>PROCEED TO PAYMENT</button>
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
