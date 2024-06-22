import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import loginImg from '../../Images/login-img.webp'

const RightImg = () => {
  return (
    <>
        <Col md={5} lg={7} className='only-desktop'>
            <img src={loginImg} className='img-block-100'/>
        </Col>
    </>
  )
}

export default RightImg