import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import classes from "./main-navigation.module.css";
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log(status);
  console.log(session);

  const logoutHandler = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/auth" });
    router.push(data.url);
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && status === "unauthenticated" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
