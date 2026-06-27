import { gql } from "@apollo/client";

export const CREATE_COUPON_CODE = gql`
  mutation createCoupon($input: createCouponInput!) {
    createCoupon(input: $input) {
      message
      couponCode
    }
  }
`;

export const GET_COUPON = gql`
  query getCoupon {
    getCoupons {
      id
      couponCode
      expiryDate
      couponDescription
      discountType
      discountValue
      isActive
    }
  }
`;

export const GET_BEST_COUPON = gql`
  query getBestCoupon {
    getBestCoupon {
      couponCode
      discountType
      discountValue
    }
  }
`;
