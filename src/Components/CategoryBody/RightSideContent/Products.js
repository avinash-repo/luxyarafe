import React, { useContext, useEffect, useRef, useState } from "react";
import Product from "../../Common/Product/Product";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../../Loading/Loader";
import { environmentVar } from "../../../config/environmentVar";
import { FilterContext } from "../../../context/FilterContext";
import AuthContext from "../../../context/AuthContext";
import TablePagination from "@mui/material/TablePagination";

const ProductsShowMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    margin-bottom: 90px;
  }
  @media screen and (max-width: 576px) {
    padding: 0 20px;
    background-color: #f2f6f4;
    margin-bottom: 80px;
  }
`;

const Products = ({ setResponseData }) => {
  const { catid, genderid } = useParams();
  const { userInfo } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalCount, setTotalCount] = useState();
  const {
    colorIds,
    shapeIds,
    materialIds,
    sizeIds,
    weightGroupIds,
    MinPricingIds,
    MaxPricingIds,
    selectedSort,
    currencyRate,
    country_code,
    updateStateWishlist,
  } = useContext(FilterContext);

  const queryRef = useRef();
  const [updateState, setUpdateState] = useState(false);
  const fetchCategoriesData = async ({ queryKey }) => {
    const [
      ,
      catid,
      genderid,
      shapeIds,
      colorIds,
      materialIds,
      sizeIds,
      weightGroupIds,
      MinPricingIds,
      MaxPricingIds,
      selectedSort,
      currencyRate,
      country_code,
      size,
      page,
    ] = queryKey;
    let apiUrl = `${
      environmentVar?.apiUrl
    }/api/product/fetch_all_product?cat_id=${catid}&gender=${genderid}&currencyRate=${currencyRate}&sort=${selectedSort}&country_code=${
      country_code || "IN"
    }&page=${page + 1}&limit=${size}`;

    const data = {
      shape_id: shapeIds,
      color_id: colorIds,
      material_id: materialIds,
      size_id: sizeIds,
      weight_group_id: weightGroupIds,
      minPrice: MinPricingIds,
      maxPrice: MaxPricingIds,
    };

    const config = {
      method: "post",
      url: apiUrl,
      data: data,
    };

    const response = await axios(config);
    setResponseData(response.data.data);
    setTotalCount(response.data.pagination.totalCount);
    return response?.data?.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    [
      "products",
      catid,
      genderid,
      shapeIds,
      colorIds,
      materialIds,
      sizeIds,
      weightGroupIds,
      MinPricingIds,
      MaxPricingIds,
      selectedSort,
      currencyRate,
      country_code,
      size,
      page,
    ],
    fetchCategoriesData
  );

  useEffect(() => {
    queryRef.current = {
      queryKey: [
        "products",
        catid,
        genderid,
        shapeIds,
        colorIds,
        materialIds,
        sizeIds,
        weightGroupIds,
        MinPricingIds,
        MaxPricingIds,
        selectedSort,
        currencyRate,
        country_code,
        size,
        page,
      ],
    };
  }, [
    catid,
    genderid,
    shapeIds,
    colorIds,
    materialIds,
    sizeIds,
    weightGroupIds,
    MinPricingIds,
    MaxPricingIds,
    selectedSort,
    currencyRate,
    country_code,
    size,
    page,
  ]);

  const handleRefetch = () => {
    refetch(queryRef.current);
  };
  useEffect(() => {
    handleRefetch();
  }, [updateState, userInfo, updateStateWishlist]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <Loader />;

  if (error) {
    return <h3>Something Went Wrong...</h3>;
  }

  if (!data?.length) {
    return <h3>Coming Soon...</h3>;
  }

  return (
    <>
      <ProductsShowMain className="row">
        {data?.map((item, index) => {
          return (
            <Product
              item={item}
              index={index}
              setUpdateState={setUpdateState}
              updateState={updateState}
            />
          );
        })}
        <TablePagination
          className="all_product_pagination"
          component="div"
          rowsPerPage={size}
          rowsPerPageOptions={[1, 10, 30, 80, 100, 150]}
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </ProductsShowMain>
    </>
  );
};

export default Products;
