import React from 'react'
import { Container, Table } from 'react-bootstrap';

const FrameSizes = () => {
  return (
    <>

    <Container className='frame-sizes-main'>
        <h2>Our Frame Sizes</h2>
        <Table bordered hover className='frame-sizes-table-main'>
            <tbody>
                <tr>
                    <td className='frame-sizes-bolder'>Frame Size</td>
                    <td className='frame-sizes-bolder'>Frame Width(mm)</td>
                </tr>
                <tr>
                    <td>Small</td>
                    <td>≤128mm</td>
                </tr>
                <tr>
                    <td>Medium</td>
                    <td>129mm - 138mm</td>
                </tr>
                <tr>
                    <td>Large</td>
                    <td>≥139mm</td>
                </tr>
            </tbody>
        </Table>
    </Container>
    </>
  )
}

export default FrameSizes