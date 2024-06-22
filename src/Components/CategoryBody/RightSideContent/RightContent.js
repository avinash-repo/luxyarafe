import React from 'react'
import RightFilters from './RightFilters'
import Products from './Products'

const RightContent = ({setResponseData}) => {
  return (
    <>
        <RightFilters/>
        <Products setResponseData={setResponseData}/>
    </>
  )
}

export default RightContent