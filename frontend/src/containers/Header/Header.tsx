import useAuth from "@/context/AuthContext";
import { FC } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  const { logout } = useAuth();

  return (
    <header>
      <h1>header</h1>
      <Link to="/menu">Menu</Link>
      <Link to="/profile">Perfil</Link>
      <button onClick={logout}>logout</button>
    </header>
  );
};
