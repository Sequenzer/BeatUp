export const sessionOptions = {
  cookieName: "_session",
  password: process.env.SESSION_PASSWORD,
  cookieOptions: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
};
