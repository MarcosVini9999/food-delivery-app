import useAuth from "@/context/AuthContext";
import useCart from "@/context/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import apiFood from "@/services/apiFood";
import { capitalizeOnlyFirstLetter } from "@/utils/utils";
import { FC, useEffect, useState } from "react";

export const GridProducts: FC = () => {
  const { user } = useAuth();
  const { postNewProductOnCart } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    if (!user.token) return;

    try {
      const response = await apiFood.get("/products", {
        headers: {
          Authorization: user.token,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {products.map((product, index) => (
        <div key={index}>
          <img
            src={`${apiFood.defaults.baseURL}/${product.image_url}`}
            alt={`Imagem do ${product.name}`}
            style={{
              height: "300px",
            }}
          />
          <h1>{capitalizeOnlyFirstLetter(product.name)}</h1>
          <p>{capitalizeOnlyFirstLetter(product.description)}</p>
          <p>R$ {product.price}</p>
          <button onClick={() => alert("Em breve...")}>Comprar</button>
          <button onClick={() => postNewProductOnCart(product)}>Adicionar ao carrinho</button>
        </div>
      ))}
    </>
  );
};
