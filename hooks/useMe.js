import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, LogUserOut } from "../apollo";

export const Me_Query = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;

const useMe = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(Me_Query, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      LogUserOut();
    }
  }, [data]);
  return { data };
};

export default useMe;
