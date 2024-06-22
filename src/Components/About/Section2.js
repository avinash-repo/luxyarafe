import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import whatImg from '../../Images/what-we-do.webp'
import './About.scss'


const Section2 = () => {
  return (
    <>
    <Container>
        <Row className='whatabout'>
            <Col lg={6} md={12}>
                <img src={whatImg} className='img-block-100'/>
            </Col>
            <Col lg={6} md={12}>
                <h3>Seeing beyond the ordinary</h3>
                <h2>Our Story</h2>
                <h4></h4>
                <p>Vuezen is not just a brand but a signature style. Our passion for eyewear goes beyond just frames and lenses; it's about embracing individuality, expressing your unique style, and seeing the world through a lens that reflects your personality. Discover the story behind our brand and why we're more than just an eyewear company.</p>
                <p>At Vuezen, we believe that eyewear is not just a necessity but a statement of self-expression. Our journey began with a simple idea – to create eyewear that not only enhances your vision but also complements your lifestyle. Founded in 2023, we set out to redefine the eyewear experience, blending fashion-forward designs with cutting-edge technology.</p>
            </Col>
        </Row>

    </Container>
    </>
  )
}

export default Section2