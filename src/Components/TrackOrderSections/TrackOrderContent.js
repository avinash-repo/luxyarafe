import React from 'react'
import { Container, Table } from 'react-bootstrap'
import './TrackOrderContent.scss'
import orderPlacedImg from '../../Images/order-placed.webp'
import shippedImg from '../../Images/shipped.webp'
import deliveredImg from '../../Images/delivered.webp'

const TrackOrderContent = () => {
  return (
    <>
        <Container>
            <div className='track-flow-main'>
                <div className='order-placed'>
                    <img src={orderPlacedImg}/>
                    <h2>Order Placed</h2>
                </div>
                <div className='processing-time'>
                    <p>Processing Time</p>
                    <div className='processing-line'></div>
                    <p>3-7 business days</p>
                </div>
                <div className='order-placed'>
                    <img src={shippedImg}/>
                    <h2>Shipped</h2>
                </div>
                <div className='processing-time'>
                    <p>shipping time</p>
                    <div className='processing-line'></div>
                    <p>3-10 business days details</p>
                </div>
                <div className='order-placed'>
                    <img src={deliveredImg}/>
                    <h2>Delivered</h2>
                </div>
            </div>

            <div className='processing-time-main'>
                <h2>Processing Time</h2>
                <Table bordered hover className='processing-time-table-main'>
                    <tbody className='tablet-tbody'>
                        <tr className='tablet-tbody-row'>
                            <td className='processing-time-table-select'>Product Type</td>
                            <td>Frame Only/Non-Prescription</td>
                            <td>Single Vision</td>
                            <td>Bifocal/Progressive</td>
                            <td>Tint/Mirror</td>
                        </tr>
                        <tr className='tablet-tbody-row'>
                            <td className='processing-time-table-select'>Time</td>
                            <td>24 hours</td>
                            <td>3-5 business days</td>
                            <td>5-7 business days</td>
                            <td>5-7 business days</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className='processing-time-main'>
                <h2>Shipping Time</h2>
                <Table bordered hover className='processing-time-table-main'>
                    <tbody>
                        <tr>
                            <td className='processing-time-table-select'>Country/Region</td>
                            <td colSpan="2">All Countries</td>
                            <td>Dubai</td>
                        </tr>
                        <tr>
                            <td className='processing-time-table-select'>Shipping Method</td>
                            <td>Standard Shipping (USPS)</td>
                            <td>DHL Shipping</td>
                            <td>Advanced Shipping</td>
                        </tr>
                        <tr>
                            <td className='processing-time-table-select'>Estimated Delivery</td>
                            <td>14-18 business days</td>
                            <td>3-5 business days</td>
                            <td>7-10 business days</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Container>
    </>
  )
}

export default TrackOrderContent