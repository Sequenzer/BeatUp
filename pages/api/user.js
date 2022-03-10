import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
  if (await req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      username: "",
      isLoggedIn: false,
      login: "",
    });
  }
}
