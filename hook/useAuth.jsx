
import { useQuery } from "@apollo/client/react";
import { ME } from "@/src/graphql/mutations/auth";
function useAuth() {
  const { data, loading, error } = useQuery(ME);

  return {
    user: data?.me,
    authloading: loading,
    error,
  };
}

export default useAuth;
