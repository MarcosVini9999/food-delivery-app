import { FC } from "react";
import { Footer, Header } from "@/containers";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};
