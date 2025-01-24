import React, { useEffect, useState } from "react";
import "./add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  // const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="add-static-container">
      <div className="add-card">
        <h1 className="add-title">Add New Product</h1>
        <form className="add-form" onSubmit={onSubmitHandler}>
          <div className="add-section">
            <h2>Upload Image</h2>
            <label htmlFor="image" className="add-image-label">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>
          <div className="add-section">
            <h2>Product Information</h2>
            <div className="add-input-group">
              <label>Product Name</label>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Type Here"
              />
            </div>
            <div className="add-input-group">
              <label>Product Description</label>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                name="description"
                rows="4"
                placeholder="Write Content Here"
                required
              ></textarea>
            </div>
          </div>
          <div className="add-section">
            <h2>Category & Price</h2>
            <div className="add-category-price">
              <div className="add-input-group">
                <label>Category</label>
                <select onChange={onChangeHandler} name="category">
                  <option value="Burfi">Burfi</option>
                  <option value="Candies">Candies</option>
                  
                </select>
              </div>
              <div className="add-input-group">
                <label>Price</label>
                <input
                  onChange={onChangeHandler}
                  value={data.price}
                  type="number"
                  name="price"
                  placeholder="Enter price"
                />
              </div>
            </div>
          </div>
          <button type="submit" className="add-button">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
