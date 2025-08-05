import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetchAllProductsQuery } from "../redux/features/products/productApi";

function Product() {
  const {data : products = []} = useFetchAllProductsQuery();
  console.log(products)

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product._id || product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
