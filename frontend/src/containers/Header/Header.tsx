import useAuth from "@/context/AuthContext";
import useCart from "@/context/CartContext";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  const { logout } = useAuth();
  const { cartListMemo } = useCart();
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    let total = 0;
    cartListMemo?.forEach((cartProduct) => {
      total += cartProduct.quantity;
    });
    setTotalProducts(total);
  }, [cartListMemo]);

  return (
    <header>
      <h1>header</h1>
      <Link to="/menu">Menu</Link>
      <Link to="/profile">Perfil</Link>
      <Link to="/cart">{`Seu carrinho (${totalProducts})`}</Link>
      <button onClick={logout}>logout</button>
    </header>
  );
};
