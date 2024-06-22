import logo from "./logo.svg";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  // useNavigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Payment from "./Components/Checkoutform/Payment";
import Homepage from "./Pages/Homepage/Homepage";

import About from "./Pages/About/About";
import Header from "./Components/Common/Header/Header";
import Footer from "./Components/Common/Footer/Footer";
import Login from "./Pages/Login/Login";
import Forgot from "./Components/Login/Forgot";
import SignUp from "./Pages/SignUp/SignUp";
import WomenEyeglasses from "./Pages/Eyeglasses/WomenEyeglasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DetailPage from "./Components/DetailPage/DetailPage";
import AuthContext from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { environmentVar } from "./config/environmentVar";
import axios from "axios";

import Wishlist from "./Pages/Wishlist/Wishlist";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import TermsConditions from "./Pages/TermsPrivacy/TermsConditions";
import PrivacyPolicy from "./Pages/TermsPrivacy/PrivacyPolicy";
import TrackOrder from "./Pages/TrackOrder/TrackOrder";
import OrdersTrack from "./Pages/OrderTrack/OrdersTrack";
import Contact from "./Pages/Contact/Contact";
import { FilterContext, FilterProvider } from "./context/FilterContext";
import { ProductDetailProvider } from "./context/ProductDetailContext";
import { CartDetailProvider } from "./context/CartDetailContext";
import TryOn3d from "./Components/3dtryon/TryOn3d";
import TryOn from "./Components/TryOn/TryOn";
import LinkPage from "./Pages/LinkPage/LinkPage";
import Explore from "./Pages/Explore/Explore";
import Redirect from "./Pages/Redirect/Redirect";
import Faq from "./Components/FAQ/FAQ";
import ShippingPolicy from "./Components/ShippingPolicy/ShippingPolicy";
import CancellationPolicy from "./Components/CancellationPolicy/CancellationPolicy";
// import Payment from "./Components/Checkoutform/Payment";

function App() {
  // const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [Loading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [userLocationObj, setUserLocationObj] = useState(null);
  const [userSocialLoginInfo, setUserSocialLoginInfo] = useState(null);
  const [isUserSocialLoginInfo, setIsUserSocialLoginInfo] = useState(false);
  const [profilePopUp, setProfilePopUp] = useState(false);
  const { setCountryCode, setSymbol } = useContext(FilterContext);
  const [landingPageData, setLandingPageData] = useState(null);
  const [userName, setUserName] = useState(null);
  const getLandingPageData = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/ui/get_landing_page_data `,
    };

    axios
      .request(config)
      .then((response) => {
        setLandingPageData(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isAuthenticateUser = () => {
    axios.defaults.withCredentials = true;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/check_user_logged_in`,
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => {
        setIsAuth(true);
        setUserInfo(response?.data?.data);
        setCountryCode(response?.data?.data?.country);
        setSymbol(
          response?.data?.data?.country === "US"
            ? "$"
            : response?.data?.data?.country === "IN"
            ? "₹"
            : response?.data?.data?.country === "AE"
            ? "د.إ"
            : "$"
        );
        getLandingPageData();
      })
      .catch((error) => {
        setIsAuth(false);
        setUserInfo(null);
      });
  };

  useEffect(() => {
    getLandingPageData();
    isAuthenticateUser();
  }, []);

  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleUserData = async (userData) => {
    setIsUserSocialLoginInfo(true);

    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/social/user/getuserdata?id=${userData?.sub}`,
    };

    axios
      .request(config)
      .then((response) => {
        setIsAuth(true);
        isAuthenticateUser();
        setUserSocialLoginInfo(response?.data);
        toast.success("Login Successful", {
          autoClose: 2000,
        });
        setIsUserSocialLoginInfo(false);
        const stateGet = localStorage.getItem("statevalue");
        window.location.href = stateGet ? `/${stateGet}` : "/";
        localStorage.removeItem("statevalue")
      }
    )
      .catch((error) => {
        setUserSocialLoginInfo(null);
        setIsUserSocialLoginInfo(false);
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      if (!isAuth) {
        handleUserData(user);
      }
    }
  }, [isAuthenticated]);

  const getLocationWiseData = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/user/get_user_location`,
    };
    axios
      .request(config)
      .then((response) => {
        setCountryCode(response?.data?.data?.country);
        setSymbol(
          response?.data?.data?.country === "US"
            ? "$"
            : response?.data?.data?.country === "IN"
            ? "₹"
            : response?.data?.data?.country === "AE"
            ? "د.إ"
            : "₹"
        );
        setUserLocationObj(response?.data?.data);
      })
      .catch((error) => {
        setUserLocationObj(null);
      });
  };

  useEffect(() => {
    getLocationWiseData();
  }, []);

  return (
    <div onClick={() => setProfilePopUp(false)}>
      <CartDetailProvider>
        <ProductDetailProvider>
          <AuthContext.Provider
            value={{
              isAuth,
              setIsAuth,
              userInfo,
              setUserInfo,
              userLocationObj,
              setUserLocationObj,
            }}
          >
            <ToastContainer />
            <Router>
              <Header
                setIsAuth={setIsAuth}
                isAuth={isAuth}
                profilePopUp={profilePopUp}
                setProfilePopUp={setProfilePopUp}
                isUserSocialLoginInfo={isUserSocialLoginInfo}
                socialLoginLoading={isLoading}
                userName={userName}
              />

              <Routes>
                <Route
                  path="/"
                  exact
                  element={
                    <Homepage
                      landingPageData={landingPageData}
                      title="Welcome To Vuezen"
                    />
                  }
                />
                <Route
                  path="/explore"
                  element={
                    <Explore
                      landingPageData={landingPageData}
                      title="Explore Eyeglasses, Sunglasses, Computer glasses"
                    />
                  }
                />
                <Route
                  path="/subscribe"
                  exact
                  element={<LinkPage title="Welcome To Vuezen" />}
                />
                <Route path="/about" element={<About title="About Vuezen" />} />
                <Route
                  path="/contact"
                  element={<Contact title="Contact Vuezen" />}
                />
                <Route path="/faqs" element={<Faq title="FAQs" />} />
                <Route
                  path="/shipping-policy"
                  element={<ShippingPolicy title="Shipping Policy" />}
                />
                <Route
                  path="/return-exchange-policy"
                  element={
                    <CancellationPolicy title="Return Exchange Policy" />
                  }
                />
                <Route
                  path="/login"
                  element={<SignUp type={"login"} setUserName={setUserName} />}
                />
                <Route path="/signup" element={<SignUp type={"signup"} />} />
                <Route
                  path="/forgot"
                  element={<Forgot title={"Forgot Password"} />}
                />
                <Route
                  path="reset-password"
                  element={<SignUp type={"reset-password"} />}
                />
                <Route path="/detailpage/:id" element={<DetailPage />} />
                <Route
                  path="/glasses/:category/:catid/:gender/:genderid"
                  element={<WomenEyeglasses />}
                />
                <Route
                  path="/glasses/:category/:catid/:gender"
                  element={<WomenEyeglasses />}
                />
                <Route path="/tryon" element={<TryOn3d title="3d Tryon" />} />
                <Route
                  path="/myaccount"
                  element={<Wishlist path={"myaccount"} title="My Account" />}
                />
                <Route
                  path="/accountinfo"
                  element={
                    <Wishlist path={"accountinfo"} title="Account Info" />
                  }
                />
                <Route
                  path="/orderhistory"
                  element={
                    <Wishlist path={"orderhistory"} title="Order History" />
                  }
                />
                <Route
                  path="/wishlist"
                  element={<Wishlist path={"wishlist"} title="Wishlist" />}
                />
                <Route
                  path="/coupons"
                  element={<Wishlist path={"coupons"} title="Coupons" />}
                />
                <Route
                  path="/address"
                  element={<Wishlist path={"address"} title="User Address" />}
                />
                <Route
                  path="/helpcenter"
                  element={<Wishlist path={"helpcenter"} title="HelpCenter" />}
                />
                <Route path="/payment" element={<Payment title="Payment" />} />

                <Route path="/cart" element={<Cart title="Cart" />} />
                <Route
                  path="/checkout"
                  element={<Checkout title="Checkout" />}
                />

                <Route
                  path="/orderstrack/:id"
                  element={<OrdersTrack title="Track Order" />}
                />

                <Route
                  path="/termsandconditions"
                  element={<TermsConditions title="Terms and Conditions" />}
                />
                <Route
                  path="/privacypolicy"
                  element={<PrivacyPolicy title="Privacy policy" />}
                />
                <Route
                  path="/trackorder"
                  element={<TrackOrder title="Track Order" />}
                />
                <Route
                  path="/redirect"
                  element={<Redirect title="Redirect" />}
                />
              </Routes>
              <Footer />
            </Router>
          </AuthContext.Provider>
        </ProductDetailProvider>
      </CartDetailProvider>
    </div>
  );
}

export default App;
