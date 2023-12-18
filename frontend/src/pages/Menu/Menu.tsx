import { ImageUpload } from "@/components";
import useAuth from "@/context/AuthContext";
import { FC } from "react";

export const Menu: FC = () => {
  const { logout } = useAuth();

  return (
    <>
      <h1>Menu</h1>
      <button onClick={() => logout()}>Logout</button>
      <ImageUpload />
    </>
  );
};
