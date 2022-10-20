import React, { useEffect } from "react";

import { useDispatch, useSelector } from "store/hooks";
import { setLoggedUser } from "store/users/usersSlice";

export const useLoggedUser = (props) => {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
  }, []);

  return {
    loggedUser,
  };
};
