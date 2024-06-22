import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import missionImg from '../../Images/our-mission.webp'
import './About.scss'


const Section2 = () => {
  return (
    <>
    <Container className='mission-main'>
        <Row className='whatabout'>
            <Col lg={6} md={12}>
                <h3>More than just eyewear</h3>
                <h2>Vision and Values</h2>
                <h4></h4>
                <p>Our Vuezen is clear – to be more than just a brand; we aim to be a part of your daily life. We are committed to providing eyewear that seamlessly combines style, comfort, and functionality. Quality craftsmanship is at the core of everything we do, ensuring that each pair of glasses reflects our dedication to excellence.</p>
            </Col>
            <Col lg={6} md={12}>
                <img src={missionImg} className='img-block-100'/>
            </Col>
        </Row>

    </Container>
    </>
  )
}

export default Section2