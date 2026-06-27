import { gql } from "@apollo/client";

export const BECOME_SELLER = gql`
  mutation BecomeSeller(
    $storeName: String!
    $description: String!
    $businessEmail: String!
    $businessPhone: String!
    $businessAddress: String!
    $businessLogo: String!
    $publicId: String!
  ) {
    becomeASeller(
      input: {
        storeName: $storeName
        description: $description
        businessEmail: $businessEmail
        businessPhone: $businessPhone
        businessAddress: $businessAddress
        businessLogo: $businessLogo
        publicId: $publicId
      }
    ) {
      message
      sellerStatus
    }
  }
`;

export const APPROVE_SELLER = gql`
  mutation ApproveSeller($sellerId: ID!, $sellerStatus: String!) {
    approveSeller(input: { sellerId: $sellerId, sellerStatus: $sellerStatus }) {
      sellerStatus
      message
    }
  }
`;

export const sellerDataAdmin = gql`
  query sellerDataAdmin($status: String!) {
    sellers(status: $status) {
      id
      storeName
      description
      businessEmail
      businessPhone
      businessAddress
      businessLogo
      user {
        name
        email
        createdAt
        sellerStatus
      }
    }
  }
`;

export const PublicSellerData = gql`
  query publicSellerData {
    sellerProfile {
      id
      storeName
      description
      businessEmail
      businessPhone
      businessAddress
      businessLogo
    }
  }
`;

export const getSellerFrontsWithProducts = gql`
  query getSellerFrontsWithProducts($storeName: String!) {
    getSellerDetailsWithProducts(storeName: $storeName) {
      seller {
        id
        storeName
        description
        businessEmail
        businessPhone
        businessLogo
        businessAddress
      }

      products {
        id
        name
        description
        price
        category
        images
        publicId
      }
    }
  }
`;
