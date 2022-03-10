import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
  //Get the user from the request body
  const { username } = JSON.parse(await req.body);
  const user = { isLoggedIn: true, username: username };
  req.session.user = user;
  await req.session.save();
  console.log("User is loggin in as: ", username, JSON.parse(req.body));
  res.json(user);
}
