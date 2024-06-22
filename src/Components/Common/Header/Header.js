import React, { useState, useContext, useEffect } from "react";
import "./Header.scss";
import Logo from "../../../Images/vuezen-logo.webp";
import { Container } from "react-bootstrap";
import shopping_icon from "../../../Images/Bag.webp";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import heart_icon from "../../../Images/Heart.webp";
import search_icon from "../../../Images/Magnifer.webp";
import user_icon from "../../../Images/User.webp";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { environmentVar } from "../../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import AuthContext from "../../../context/AuthContext";
import { Modal } from "react-bootstrap";
import { FilterContext } from "../../../context/FilterContext";
import HomeIcon from "../../../Images/home.svg";
import ProfileIcon from "../../../Images/profile.svg";
import CategoryIcon from "../../../Images/explore.svg";
import OrderIcon from "../../../Images/orders.svg";
import TryonIcon from "../../../Images/3dview.svg";
import styled from "styled-components";
import { Loader2 } from "../Loader/Loader";

const HighlightIcon = styled.div`
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 50px;
  position: absolute;
  top: -10px;
  left: 10px;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
`;
const HighlightIconCart = styled.div`
  width: 20px;
  height: 20px;
  color: white;
  border-radius: 50px;
  position: absolute;
  background-color: red;
  top: -10px;
  left: 10px;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  @media screen and (max-width: 992px) {
    left: 20px;
  }
`;

const Header = ({
  setIsAuth,
  isAuth,
  profilePopUp,
  setProfilePopUp,
  isUserSocialLoginInfo,
  socialLoginLoading,
  userName,
}) => {
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [searchKey, setSearchKey] = useState("");
  const [show, setShow] = useState(false);
  const { updateStateWishlist, updateStateCart } = useContext(FilterContext);
  const [expanded, setExpanded] = useState(false);
  const handleToggleNavbar = () => {
    setExpanded(!expanded);
  };
  const [searchData, setSearchData] = useState(null);
  const [isHomePage, setIsHomePage] = useState(false);
  const [menueShowM, setMenueShowM] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate(null);
  const location = useLocation();
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [offerData, setOfferData] = useState();
  const [wishListCount, setWishListCount] = useState();
  const [cartCount, setCartCount] = useState();
  const { isAuthenticated, logout } = useAuth0();
  const getRecentAndPopularSearches = () => {
    let config = {
      method: "get",
      url: `${environmentVar?.apiUrl}/api/product/fetch_search_params_data`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setRecentSearches(response.data.orderByCreatedAt);
        setPopularSearches(response.data.orderBySearchCount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getOfferDataTop = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/offer/get`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.data.length > 0) {
          setOfferData(response?.data?.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (location?.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
    const paths = ["/", "/explore", "/myaccount", "/orderhistory", "/tryon"];
    const currentPath = location?.pathname;

    if (paths.includes(currentPath)) {
      setMenueShowM(true);
    } else {
      setMenueShowM(false);
    }
  }, [location, menueShowM]);
  useEffect(() => {
    getRecentAndPopularSearches();
    getOfferDataTop();
    setSearchKey("");
    setSearchData(null);
  }, [show]);
  const handleChangeSearch = (value) => {
    setSearchKey(value);
    if (value.length >= 2) {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/product/get_all_product_by_search?searchString=${value}&country_code=IN`,
        withCredentials: true,
      };
      axios
        .request(config)
        .then((response) => {
          setSearchData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchData([]);
    }
  };
  const handleClickNavSearch = (id) => {
    let data = {
      searchString: searchKey,
    };

    let config = {
      method: "post",
      url: `${environmentVar?.apiUrl}/api/product/search_params_data`,
      withCredentials: true,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        navigate(`/detailpage/${id}`);
      })
      .catch((error) => {
        toast.error("Unable to set search key", {
          autoClose: 2000,
        });
        navigate(`/detailpage/${id}`);
      });
  };
  const getSearchComponents = (searchData) => {
    if (searchData == null || searchData == undefined) {
      return <></>;
    } else if (searchData.length == 0) {
      return <div className="search-items-container">No Data Found</div>;
    } else if (searchData.length > 0) {
      return (
        <>
          {searchData.map((val) => (
            <div
              onClick={() => handleClickNavSearch(val?.id)}
              className="search-items-container"
            >
              <div className="search-items-img-wrapper">
                <img
                  src={`${environmentVar?.cdnUrl}/uploads/${val?.thumbnail_img}`}
                />
              </div>
              <div onClick={() => handleClose()}>
                <div className="search-item-details">{val?.title}</div>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <></>;
    }
  };
  const handleSignOut = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Sign Out",
      text: "Are you sure you want to sign out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${environmentVar?.apiUrl}/api/user/user_logout`,
        };

        axios
          .request(config)
          .then((response) => {
            if (isAuthenticated) {
              logout({ logoutParams: { returnTo: window.location.origin } });
            }
            setIsAuth(false);
            setUserInfo(null);
            setProfilePopUp(false);
            navigate("/");
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };
  const getUserInitials = (name) => {
    if (name == null || name == undefined) {
      return "";
    }
    if (typeof name !== "string") {
      return "";
    }
    const userNameArr = name.split(" ");
    let initials;
    if (userNameArr?.length > 1) {
      return `${userNameArr[0].slice(0, 1)}${userNameArr[1].slice(0, 1)}`;
    } else {
      return `${userNameArr[0].slice(0, 1)}`;
    }
  };
  const fetchCategoriesData = async () => {
    const response = await axios.get(
      `${environmentVar?.apiUrl}/api/category/get_category`
    );
    return response?.data?.data;
  };

  const { data, isLoading, error } = useQuery(
    "categories",
    fetchCategoriesData
  );

  useEffect(() => {
    if (isAuth) {
      let config = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/wishlist/get_wishlist_data`,
        withCredentials: true,
      };

      axios
        .request(config)
        .then((response) => {
          setWishListCount(response?.data?.data);
        })
        .catch((error) => {
          setWishListCount();
        });

      let configforcart = {
        method: "get",
        url: `${environmentVar?.apiUrl}/api/cart/get_count_from_cart`,
        withCredentials: true,
      };

      axios
        .request(configforcart)
        .then((response) => {
          setCartCount(response?.data?.data);
        })
        .catch((error) => {
          setCartCount();
        });
    }
  }, [isAuth, updateStateWishlist, updateStateCart]);

  return (
    <>
      <div className="headerstrip">
        <h4>{offerData?.description}</h4>
      </div>
      <Container className="header">
        <div className="header-left">
          <Navbar expanded={expanded} expand="lg">
            <Navbar.Brand onClick={() => navigate("/")}>
              <img src={Logo} alt="Logo" />
            </Navbar.Brand>

            <div className="header-icons-for-mobile">
              <div className="mob-head-icon-main">
                <img src={search_icon} onClick={handleShow} />
                <Modal
                  show={show}
                  onHide={handleClose}
                  className="search-modal-main"
                >
                  <Modal.Body
                    className="modal-inputs-search"
                    dialogClassName="modal-dialog-right"
                  >
                    <input
                      onChange={(e) => handleChangeSearch(e.target.value)}
                      type="text"
                      value={searchKey}
                      placeholder="What are you looking for?"
                    />

                    <div className="search-items-box">
                      {/* <h2>Top Searches</h2> */}
                      {getSearchComponents(searchData)}
                    </div>
                    <h2>Recent Searches</h2>
                    <div className="flex-flexwrap">
                      {recentSearches ? (
                        <>
                          {recentSearches.map((val) => (
                            <h3
                              onClick={(e) =>
                                handleChangeSearch(val?.search_params)
                              }
                            >
                              {val?.search_params}
                            </h3>
                          ))}
                        </>
                      ) : (
                        <div>No Recent Searches Found</div>
                      )}
                    </div>
                    <h2>Popular Searches</h2>
                    {popularSearches ? (
                      <>
                        {popularSearches.map((val) => (
                          <p
                            onClick={() =>
                              handleChangeSearch(val?.search_params)
                            }
                          >
                            {val?.search_params}
                          </p>
                        ))}
                      </>
                    ) : (
                      <>No Popular Searches Found</>
                    )}
                  </Modal.Body>
                </Modal>

                <img
                  src={heart_icon}
                  className="cart-icon-for-mobile"
                  onClick={() => {
                    if (isAuth) navigate("/wishlist");
                    else navigate("/login");
                  }}
                />
                {isAuth && (
                  <HighlightIcon
                    WishListCount
                    style={{
                      zIndex: "50",
                      backgroundColor: wishListCount > 0 ? "red" : "#585858",
                    }}
                  >
                    {wishListCount}
                  </HighlightIcon>
                )}
              </div>
              <div className="mob-head-icon-main">
                <img
                  src={shopping_icon}
                  className="cart-icon-for-mobile"
                  onClick={() => {
                    if (isAuth) navigate("/cart");
                    else navigate("/login");
                  }}
                />
                {isAuth && (
                  <HighlightIconCart
                    style={{
                      zIndex: "50",
                      backgroundColor: cartCount > 0 ? "red" : "#585858",
                    }}
                  >
                    {cartCount}
                  </HighlightIconCart>
                )}
              </div>

              <img
                src={user_icon}
                className="cart-icon-for-mobile user-only-desktop"
                onClick={(e) => {
                  if (isAuth) setProfilePopUp(!profilePopUp);
                  else navigate("/login");
                  e.stopPropagation();
                }}
                onMouseOver={() => {
                  if (isAuth) setProfilePopUp(true);
                }}
              />
              {profilePopUp ? (
                <>
                  {" "}
                  <div className="profile-popup-container">
                    <div className=".profile-popup-main">
                      <div className="profile-info-container">
                        <div className="profile-initials">{userName}</div>
                        <div className="profile-name">{`Hi ${userInfo?.name}`}</div>
                      </div>
                      <hr className="profile-horizontal-line" />
                      <div className="profile-options">
                        <div
                          onClick={() => navigate("/myaccount")}
                          className="profile-option"
                        >
                          My Account
                        </div>
                        <div
                          onClick={() => navigate("/orderhistory")}
                          className="profile-option"
                        >
                          My Order
                        </div>
                        <div
                          onClick={() => navigate("/wishlist")}
                          className="profile-option"
                        >
                          My Wishlist
                        </div>
                      </div>
                      <hr className="profile-horizontal-line" />
                      <div className="profile-signout" onClick={handleSignOut}>
                        Sign Out
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <Navbar.Toggle
                onClick={handleToggleNavbar}
                aria-controls="basic-navbar-nav"
              />
            </div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <div className="mobile-logo-toggle">
                  <Navbar.Brand href="/">
                    <img src={Logo} />
                  </Navbar.Brand>
                  <Navbar.Toggle
                    onClick={handleToggleNavbar}
                    aria-controls="basic-navbar-nav"
                  />
                </div>
                {data?.map((item, index) => {
                  return item?.genderData.length > 0 ? (
                    <NavDropdown
                      title={item?.title}
                      id="basic-nav-dropdown"
                      key={index}
                    >
                      {item?.genderData?.map((innerItem, innerIndex) => {
                        return (
                          <NavDropdown.Item
                            key={innerIndex}
                            onClick={() => {
                              handleToggleNavbar();
                              navigate(
                                `/glasses/${item?.title?.replace(/ /g, "")}/${
                                  item?.id
                                }/${innerItem?.value}/${innerItem?.id}`
                              );
                            }}
                          >
                            <img
                              src={`${environmentVar?.cdnUrl}/uploads/filterProduct/gender/${innerItem?.image}`}
                            />{" "}
                            {innerItem?.value}
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={item?.title}
                      id="basic-nav-dropdown"
                      key={index}
                      onClick={() =>
                        navigate(
                          `/glasses/${item?.title?.replace(/ /g, "")}/${
                            item?.id
                          }/${item?.title?.split(" ")?.[0]}`
                        )
                      }
                    ></NavDropdown>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        <div className="header-right">
          <ul>
            <li className="navbar-right-icons">
              <img src={search_icon} onClick={handleShow} />
              <Modal
                show={show}
                onHide={handleClose}
                className="search-modal-main"
              >
                <Modal.Body
                  className="modal-inputs-search"
                  dialogClassName="modal-dialog-right"
                >
                  <input
                    onChange={(e) => handleChangeSearch(e.target.value)}
                    type="text"
                    value={searchKey}
                    placeholder="What are you looking for?"
                  />

                  <div className="search-items-box">
                    {/* <h2>Top Searches</h2> */}
                    {getSearchComponents(searchData)}
                  </div>
                  <h2>Recent Searches</h2>
                  <div className="flex-flexwrap">
                    {recentSearches ? (
                      <>
                        {recentSearches.map((val) => (
                          <h3
                            onClick={(e) =>
                              handleChangeSearch(val?.search_params)
                            }
                          >
                            {val?.search_params}
                          </h3>
                        ))}
                      </>
                    ) : (
                      <div>No Recent Searches Found</div>
                    )}
                  </div>
                  <h2>Popular Searches</h2>
                  {popularSearches ? (
                    <>
                      {popularSearches.map((val) => (
                        <p
                          onClick={() => handleChangeSearch(val?.search_params)}
                        >
                          {val?.search_params}
                        </p>
                      ))}
                    </>
                  ) : (
                    <>No Popular Searches Found</>
                  )}
                </Modal.Body>
              </Modal>
            </li>
            {isUserSocialLoginInfo ? (
              <Loader2 size={25} />
            ) : (
              <>
                <li
                  onClick={() => {
                    if (isAuth) navigate("/wishlist");
                    else navigate("/login");
                  }}
                  className="navbar-right-icons"
                >
                  <img src={heart_icon} />
                  {isAuth && (
                    <HighlightIcon
                      WishListCount
                      style={{
                        zIndex: "50",
                        backgroundColor: wishListCount > 0 ? "red" : "#585858",
                      }}
                    >
                      {wishListCount}
                    </HighlightIcon>
                  )}
                </li>
                <li
                  onClick={() => {
                    if (isAuth) navigate("/cart");
                    else navigate("/login");
                  }}
                  className="navbar-right-icons"
                >
                  <img src={shopping_icon} />
                  {isAuth && (
                    <HighlightIconCart
                      style={{
                        zIndex: "50",
                        backgroundColor: cartCount > 0 ? "red" : "#585858",
                      }}
                    >
                      {cartCount}
                    </HighlightIconCart>
                  )}
                </li>
                <li
                  onClick={(e) => {
                    if (isAuth) setProfilePopUp(!profilePopUp);
                    else navigate("/login");
                    e.stopPropagation();
                  }}
                  onMouseOver={() => {
                    if (isAuth) setProfilePopUp(true);
                  }}
                  className="navbar-right-icons logincls"
                >
                  <img src={user_icon} style={{ marginRight: "5px" }} />{" "}
                  {isAuth ? userInfo?.name : "Login"}
                  <div>
                    {profilePopUp ? (
                      <>
                        {" "}
                        <div className="profile-popup-container">
                          <div className=".profile-popup-main">
                            <div className="profile-info-container">
                              <div className="profile-initials">{`${getUserInitials(
                                userInfo?.name
                              )}`}</div>
                              <div className="profile-name">{`Hi ${userInfo?.name}`}</div>
                            </div>
                            <hr className="profile-horizontal-line" />
                            <div className="profile-options">
                              <div
                                onClick={() => navigate("/myaccount")}
                                className="profile-option"
                              >
                                My Account
                              </div>
                              <div
                                onClick={() => navigate("/orderhistory")}
                                className="profile-option"
                              >
                                My Order
                              </div>
                              <div
                                onClick={() => navigate("/wishlist")}
                                className="profile-option"
                              >
                                My Wishlist
                              </div>
                            </div>
                            <hr className="profile-horizontal-line" />
                            <div
                              className="profile-signout"
                              onClick={handleSignOut}
                            >
                              Sign Out
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </li>
                {/* <li
              className="button"
              onClick={() => {
                if (isAuth) {
                  navigate("/tryon");
                } else {
                  navigate("/login");
                }
              }}
            >
              Try On
            </li> */}
              </>
            )}
          </ul>
        </div>
      </Container>
      {menueShowM && (
        <div className="bottom-menu">
          <ul>
            <li
              onClick={() => navigate("/")}
              className={location.pathname === "/" ? "active" : ""}
            >
              <img src={HomeIcon} />
              Home
            </li>
            <li
              onClick={() => navigate("/explore")}
              className={location.pathname === "/explore" ? "active" : ""}
            >
              <img src={CategoryIcon} />
              Explore
            </li>
            {/* <li
              onClick={() => {
                if (isAuth) {
                  navigate("/tryon");
                } else {
                  navigate("/login");
                }
              }}
              className={location.pathname === "/tryon" ? "active" : ""}
            >
              <img src={TryonIcon} className="try-pop" />
              3D
            </li> */}
            <li
              onClick={() =>
                isAuth ? navigate("/orderhistory") : navigate("/login")
              }
              className={location.pathname === "/orderhistory" ? "active" : ""}
            >
              <img src={OrderIcon} />
              Orders
            </li>
            <li
              onClick={() =>
                isAuth ? navigate("/myaccount") : navigate("/login")
              }
              className={location.pathname === "/myaccount" ? "active" : ""}
            >
              <img src={ProfileIcon} />
              Profiles
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
