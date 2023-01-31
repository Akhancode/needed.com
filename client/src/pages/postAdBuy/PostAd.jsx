import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import "./PostAd.scss";
import Topbar from "../../components/topbar/Topbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/loading";
import { UserContext } from "../../Context";

const PostAd = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [file, setFile] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreated, setIsCreated] = useState(false);
  const [selected, setSelected] = useState("Mobiles");

  // const {user} = location.state
  const { authorised, setAuthorised, user, setUser } = useContext(UserContext);
  const error = null;

  const [allValues, setAllValues] = useState({
    name: "",
    fromPrice: "",
    toPrice: "",
    description: "",
    place: "",
    category: "",
    brand: "",
    place: "",
  });
  const changeHandler = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value });
  };
  const handleUpload = (e) => {
    setFile(e.target.files);
    console.log(e.target.files);
  };
  const createAd = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(file);

    const formData = new FormData();
    formData.append("name", allValues.name);
    formData.append("fromPrice", allValues.fromPrice);
    formData.append("toPrice", allValues.toPrice);
    formData.append("place", allValues.place);
    formData.append("description", allValues.description);
    formData.append("category", allValues.category);
    // formData.append('photos', file)
    _.forEach(file, (file) => {
      formData.append("photos", file);
    });

    // Display the values
    // for (const value of formData.values()) {
    // console.log(value);
    // }

    const res = await axios
      .post("http://localhost:8000/api/v1/buyers/ads/create", formData, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        changeUploadStatus(res.data.success);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const changeUploadStatus = (success) => {
    setIsCreated(success);
    setTimeout(() => {
      setIsCreated(false);
    }, 6000);
  };
  const getAllCategory = async () => {
    await axios
      .get("http://localhost:8000/api/v1/admin/category/all", {
        withCredentials: true,
      })
      .then((res) => {
        res.data.categoryList.map((item) => {
          category.push(item.category);
        });

        return res;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getAllCategory();
    console.log(user);
    setTimeout(() => {
      console.log(category);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="container">
      <Topbar />
      <div className="tileContainer">
        <div className="left">
          <div className="iconContainer">
            <img
              src={process.env.PUBLIC_URL + "/signin/icon.svg"}
              style={{ height: "100%", objectFit: "contain" }}
              alt=""
            />
          </div>
          {loading ? (
            <Loading type={"spinningBubbles"} color="red" />
          ) : (
            <div className="formContainer">
              {user ? (
                <form action="" method="POST">
                  <table>
                    <tr>
                      <td>
                        <h4>Product Name : </h4>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          placeholder="Eg. Monitor , Maruti Suzuki"
                          onChange={changeHandler}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Price : </h4>
                      </td>
                      <td>
                        <input
                          type="Number"
                          name="fromPrice"
                          placeholder="Eg.5000"
                          onChange={changeHandler}
                        />
                      </td>
                      <td className="to">to</td> &nbsp;&nbsp;&nbsp;
                      <td>
                        <input
                          type="Number"
                          name="toPrice"
                          placeholder="Eg. 10000"
                          onChange={changeHandler}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h4>Category : </h4>
                      </td>
                      <td>
                        <select
                          value={allValues.category}
                          name="category"
                          onChange={changeHandler}
                        >
                          {category?.map((item) => {
                            return <option value={item}>{item}</option>;
                          })}
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Place </h4>
                      </td>
                      <td>
                        <input
                          type="text"
                          name="place"
                          placeholder="Eg. Kochi , Mumbai"
                          onChange={changeHandler}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Description </h4>
                      </td>
                      <td>
                        <textarea
                          type="text"
                          rows={4}
                          name="description"
                          placeholder="Eg. About Products"
                          onChange={changeHandler}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Photo : </h4>
                      </td>
                      <td>
                        <input
                          multiple
                          name="photos"
                          type="file"
                          onChange={handleUpload}
                        />
                      </td>
                    </tr>
                    <tr style={{ display: "flex", flexDirection: "column" }}>
                      <div className="submit">
                        <button onClick={createAd}>Submit</button>
                      </div>
                      {isCreated ? <h1>Successfully Created ✨</h1> : null}
                    </tr>
                  </table>
                </form>
              ) : (
                <div className="loginALert">
                  <h3 onClick={() => navigate("/signin")}>Login to order</h3>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="right">
          <img src={process.env.PUBLIC_URL + "/signin/signin.png"} alt="" />
        </div>
      </div>
      {/* <div className="content">
         
        {
            loading?<Loading type={"spinningBubbles"} color="red"/>: <div className="formContainer">
            {
            user?(<form action="" method='POST'>
                <table>
                    <tr>
                        <td>
                            <h4>Product Name : </h4>
                        </td>
                        <td>
                            <input type="text" name='name' placeholder='Eg. Monitor , Maruti Suzuki' onChange={changeHandler}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Price : </h4>
                        </td>
                        <td>
                            <input type="Number" name='fromPrice' placeholder='Eg.5000' onChange={changeHandler} />
                        </td> 
                        <td className='to'>to</td> &nbsp;&nbsp;&nbsp;
                        <td>
                            <input type="Number" name='toPrice' placeholder='Eg. 10000' onChange={changeHandler} />
                        </td>
                    </tr>
                  
                    <tr>
                        <td>
                            <h4>Category : </h4>
                          
                        </td>
                        <td>
                            <select value={allValues.category} name='category' onChange={changeHandler}>
                            {
                                category?.map((item)=>{
                                    return(
                                        <option value={item}>{item}</option>
                                       
                                      
                                    )
                                })
                            }
                            </select>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <h4>Place </h4>
                        </td>
                        <td>
                            <input type="text" name='place' placeholder='Eg. Kochi , Mumbai' onChange={changeHandler} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Description </h4>
                        </td>
                        <td>
                            <textarea type="text" rows={4} name='description' placeholder='Eg. About Products' onChange={changeHandler} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Photo :  </h4>
                        </td>
                        <td>
                            <input multiple name='photos'  type="file" onChange={handleUpload} />
                        </td>
                    </tr>
                    <tr style={{display:'flex',flexDirection:"column"}}>
                        <div className="submit">
                            <button onClick={createAd}>Submit</button>
                        </div>
                        {
                            isCreated?<h1>Successfully Created ✨</h1>:null
                        }
                    </tr>
                </table>
            </form>):(<div className="loginALert">
                <h3  onClick={()=>navigate("/signin")}>Login to order</h3>
            </div>)
            }
        </div>
        }
        
        </div> */}
    </div>
  );
};

export default PostAd;
