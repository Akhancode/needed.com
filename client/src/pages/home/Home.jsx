import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BottomBar from "../../components/bottombar/BottomBar";
import PostContainer from "../../components/postContainer/PostContainer";
import Topbar from "../../components/topbar/Topbar";
import { UserContext } from "../../Context";
import "./home.scss";
const Home = (props) => {
  // const {user,setUser,setAuthorised} = props.state

  const { authorised, setAuthorised, user, setUser } = useContext(UserContext);
  return (
    <div className="home">
      <Topbar />
      <div className="bodyHome">
        <PostContainer state={{ user }} />
        <div className="featureBottom">
          <div className="left">
            <div className="subleft">
              <h3>See all Buyers Posts</h3>
            </div>
            <div className="subright">
              <Link to={"/sell"}>
                <button> SELL</button>
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="subleft">
              <h3>See all Sellers Posts</h3>
            </div>
            <div className="subright">
              <button> coming soon</button>
            </div>
          </div>
        </div>
      </div>
      {/* <BottomBar/> */}
    </div>
  );
};

export default Home;
