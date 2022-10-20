import { getCookie, hasCookie } from "cookies-next";
import excuteQuery from "lib/db";
import { selectUserByEmail } from "lib/queries/users";

export const useLoggedUserCookie = async ({ req, res }) => {
  if (hasCookie("Token", { req, res })) {
    const userEmail = getCookie("UserEmail", {
      req,
      res,
    })?.toString();
    const userResponse = await excuteQuery({
      query: selectUserByEmail(userEmail),
    });

    return JSON.stringify(userResponse);
  } else {
    return null;
  }
};
