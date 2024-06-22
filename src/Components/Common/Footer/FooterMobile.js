import { faInfoCircle, faPowerOff, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { environmentVar } from '../../../config/environmentVar';
import Swal from 'sweetalert2';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { BsInfoCircle, BsShieldLock, BsBoxArrowRight } from 'react-icons/bs';

const FooterMobile = () => {
  const { userInfo, setUserInfo, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate(null);
  const handleSignOut = () => {
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
                        setIsAuth(false);
                        setUserInfo(null);
                        // setProfilePopUp(false);
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
    return (
        <Card style={{ width: '100%',background:"transparent"  }} className='mobile-link'>
            <Card.Header>Others</Card.Header>
            <ListGroup variant="flush" style={{background:"transparent"}}>
                <ListGroup.Item onClick={() => navigate("/about")} style={{background:"transparent", padding:"10px 15px"}}>
                    {/* <Link to="/about"> */}
                    <span className='icon'>
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            size="2x"
                            className="personal-sidebar-icon"
                        />
                    </span>
                    <span className='text'>
                        About Vuezen
                    </span>
                    {/* </Link> */}
                </ListGroup.Item>
                <ListGroup.Item onClick={() => navigate("/privacypolicy")} style={{background:"transparent", padding:"10px 15px"}}>
                    {/* <Link to="/privacy-policy"> */}
                    <span className='icon'>
                        <FontAwesomeIcon
                            icon={faShieldAlt}
                            size="2x"
                            className="personal-sidebar-icon"
                        />
                    </span>
                    <span className='text'>
                        Privacy Policy
                    </span>
                    {/* </Link> */}
                </ListGroup.Item>
                <ListGroup.Item onClick={handleSignOut} style={{background:"transparent", padding:"10px 15px"}}>
                    {/* <Link to="/logout"> */}
                    <span className='icon'>
                        <FontAwesomeIcon
                            icon={faPowerOff}
                            size="2x"
                            className="personal-sidebar-icon"
                        />
                    </span>
                    <span className='text'>
                        Logout
                    </span>
                    {/* </Link> */}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
};

export default FooterMobile;
