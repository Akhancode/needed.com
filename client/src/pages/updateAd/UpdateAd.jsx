import React from "react";
import { useLocation } from "react-router-dom";
import Carousal from "../../components/carousal/Carousal";
import Topbar from "../../components/topbar/Topbar";
import "./UpdateAd.scss";
const UpdateAd = () => {
    const location = useLocation()
    const data = location.state
    console.log(location.state)

  const demoDetails = {
    name: "Alto",
    fromPrice: 40000,
    toPrice: 60000,
    category: "Automobiles",
    place: "Malabar",
    description: "blah blah blah",
    photo: [

        {
            id: "ineed/orders/akhan.code@gmail.com_63b257dcd36c3213b99b9ffd/cmcfxvhdijhlcqzlqj8d",
            secure_url:
              "https://res.cloudinary.com/dprfq9pjc/image/upload/v1674381524/ineed/orders/akhan.code%40gmail.com_63b257dcd36c3213b99b9ffd/cmcfxvhdijhlcqzlqj8d.webp",
          }

    ],
  };
  return (
    <div className="updateContainer">
        <Topbar />
        <div className="leftUpdate">
        <h2>Edit The Post</h2>
        <form action="" className="form">
            <table>
            <tr>
                <td>Product Name</td>
                <input type="text" value={data.name} />
            </tr>
            <tr>
                <td>Price</td>
                <td>
                <label className="labelForm">FROM</label>
                <input type="text" value={data.fromPrice} />
                <label className="labelForm">TO</label>
                <input type="text" value={data.toPrice} />
                </td>           
            </tr>
            <tr>
                <td>Category</td>
                <select
                            value={data.category}
                            name="Select One"
                            //   onChange={changeHandler}
                            >
                            {/* {category?.map((item) => {
                                return <option value={item}>{item}</option>;
                            })} */}
                            <option value={data.category}>{data.category}</option>;
                            </select>
            </tr>
            <tr>
                <td>Place</td>
                <input type="text" value={data.place} />
            </tr>
            <tr>
                <td>Description </td>
                <textarea type="text" value={data.description} />
            </tr>
            <tr>
                <td>Photo</td>
                <input
                            multiple
                            name="photos"
                            type="file"
                            //   onChange={handleUpload}
                            />
            </tr>
            <tr>
                <td></td>
                <button className="submitBtn">Submit</button>
            </tr>
            </table>
        </form>
        </div>

        <div className="rightUpdate">
            
            <Carousal photos={data.photos}/>

        </div>

    </div>

  );
};

export default UpdateAd;
