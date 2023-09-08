import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { useRouter } from "next/router";

function UserProfile() {
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      console.log("not authenticated. will redirect here");
      router.push("/auth");
    },
  });

  console.log(session);

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p className={classes.profile}>Unauthenticated...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
