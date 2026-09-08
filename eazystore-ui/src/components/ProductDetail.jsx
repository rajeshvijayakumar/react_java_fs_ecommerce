

import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function ProductDetail() {

    const params = useParams();
    const location = useLocation();
    const product = location.state?.product;


  return (
    <>
      <div>{params.productId}</div>

      <div>{product.name}</div>
    </>
  );
}
