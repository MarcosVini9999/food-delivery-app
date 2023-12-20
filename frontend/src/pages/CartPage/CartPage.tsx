import useCart from "@/context/CartContext";
import apiFood from "@/services/apiFood";
import { Button, Typography } from "@mui/material";
import { FC } from "react";

export const CartPage: FC = () => {
  const { cartListMemo, removeProductFromCart } = useCart();

  return (
    <>
      {cartListMemo && cartListMemo.length > 0 ? (
        <>
          <Typography>Seu carrinho</Typography>
          {cartListMemo?.map((item, key) => (
            <div key={key}>
              <img
                src={`${apiFood.defaults.baseURL}/${item.product.image_url} `}
                alt={`Imagem do ${item.product.name}`}
                style={{
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
              <h1>{item.product.name}</h1>
              <p>{item.product.description}</p>
              <p>R$ {item.product.price}</p>
              <p>Quantidade: {item.quantity}</p>
              <Button onClick={() => removeProductFromCart(item.product)} variant="contained">
                Remover
              </Button>
            </div>
          ))}

          <Button onClick={() => alert("Em breve...")} variant="contained">
            Comprar
          </Button>
        </>
      ) : (
        <Typography>Seu carrinho está vazio</Typography>
      )}
    </>
  );
};
