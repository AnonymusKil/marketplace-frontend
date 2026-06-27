import { gql } from "@apollo/client";

export const INITIALIZE_PAYMENT = gql`
  mutation InitializePayment($input: checkOutInput!) {
    initializePayment(input: $input) {
      message
      authorization_url
      reference
    }
  }
`;
