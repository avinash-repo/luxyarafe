import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import lensesImg from '../../Images/lenses.webp'

const DetailBanner = () => {
  return (
    <>
        <Container>
            <Row className='detailbanner-main'>
                <Col md={6}>
                    <h2>Light Frames for best comfort</h2>
                    <h3>Feel the freedom of light weight frames</h3>
                </Col>
                <Col md={6} className='only-desktop'><img src={lensesImg}/></Col>
            </Row>
        </Container>
    </>
  )
}

export default DetailBanner