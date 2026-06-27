import { gql } from "@apollo/client";

export const SELLERORDERSTATS = gql`
  query sellerOrderStats {
    sellerOrderStats {
      totalOrders
      totalEarnings
      totalItemsSold
      totalProducts
    }
  }
`;
export const BEST_SELLING_PRODUCTS = gql`
  query bestSellingproducts($limit: Int) {
    getBestSellingProducts(limit: $limit) {
      product {
      id
        name
        description
        price
        category
        images
        publicId
      }
      totalSold
    }
  }
`;
