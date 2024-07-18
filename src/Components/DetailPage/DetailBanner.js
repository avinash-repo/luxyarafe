import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import lensesImg from '../../Images/lenses.webp'

const DetailBanner = () => {
  return (
    <>
        <Container>
            <Row className='detailbanner-main'>
                <Col md={6}>
                    <h2>Genuine Quality for best comfort</h2>
                    <h3>Feel the freedom of light your choice</h3>
                </Col>
                <Col md={6} className='only-desktop'><img src={lensesImg}/></Col>
            </Row>
        </Container>
    </>
  )
}

export default DetailBanner