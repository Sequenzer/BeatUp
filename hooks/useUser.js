import { useEffect } from "react";
import useSWR, { mutate } from "swr";
import fetchJson from "lib/fetch";
import { generateCombination } from "gfycat-style-urls";

export default function useUser() {
  var { data: user, mutate: mutateUser } = useSWR("/api/user");
  useEffect(() => {
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!user) {
      console.log("Fetching user data...");
      return;
    }
    // if user data is there, then check if it is logged in or not
    if (!user?.isLoggedIn) {
      console.log("User is not logged in");
      let body = {
        username: generateCombination(),
      };
      mutateUser(
        fetchJson("/api/login", {
          method: "POST",
          body: JSON.stringify(body),
          header: {
            "Content-Type": "application/json",
          },
        })
      );
    }
  }, [user]);
  return { user, mutateUser };
}
