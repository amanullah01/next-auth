import { getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: session };
};

export default ProfilePage;
