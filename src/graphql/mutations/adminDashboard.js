import { gql } from "@apollo/client";

export const ADMIN_ANALYTICS = gql`
  query AdminAnalytics {
    adminAnalytics {
      totalProducts
      totalRevenue
      totalOrders
      totalStores
    }
  }
`;

export const ADMIN_PROFILE = gql`
  query AdminProfileDashboard {
    getAdminDashboardProfile {
      id
      name
      email
      role
    }
  }
`;
