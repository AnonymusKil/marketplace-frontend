import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      message
      product {
        id
        name
        description
        price
        images
        category
        publicId
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts($search: String) {
    products(search: $search) {
      id
      name
      description
      price
      category
      images
      publicId
      seller {
        id
        storeName
        description
        businessEmail
        businessPhone
        businessLogo
      }
    }
  }
`;
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($productId: ID!) {
    getProductsByProductId(productId: $productId) {
      id
      name
      description
      price
      category
      images
      publicId
      seller {
        id
        storeName
        description
        businessEmail
        businessPhone
        businessLogo
        businessAddress
        publicId
      }
    }
  }
`;
export const GENERATE_PRODUCT_DESCRIPTION_WITH_AI = gql`
   mutation GenarateProductDescriptionWithAi($name: String!) {
    generateProductDescription(name: $name) {
      success
      description
      message
    }
  }
`;
export const GET_MY_SELLER_PRODUCTS = gql`
  query GetMySellerProducts {
    mysellerProducts {
      id
      name
      description
      price
      category
      images
      publicId
      seller {
        id
        storeName
        description
        businessEmail
        businessPhone
        businessLogo
        businessAddress
        publicId
      }
    }
  }
`;
