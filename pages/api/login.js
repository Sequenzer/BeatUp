import { withIronSessionApiRoute } from "iron-session/next";

const sessionOptions = {
  cookieName: "_session",
  password: "Y1BMWvkbFon71UXVHadbvhNiQLafzdJ3",
  cookieOptions: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
};

export default withIronSessionApiRoute(loginRoute,sessionOptions);

async function loginRoute(req, res) {
    req.session.user = {
        
    }
