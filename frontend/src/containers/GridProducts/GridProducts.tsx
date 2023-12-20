import useAuth from "@/context/AuthContext";
import { IProduct } from "@/interfaces/IProduct";
import apiFood from "@/services/apiFood";
import { capitalizeOnlyFirstLetter } from "@/utils/utils";
import { FC, useEffect, useState } from "react";

export const GridProducts: FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);

  const checkLogin = async () => {
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
    checkLogin();
  }, []);

  return (
    <>
      {products.map((item, index) => (
        <div key={index}>
          <img
            src={`${apiFood.defaults.baseURL}/${item.image_url}`}
            alt={`Imagem do ${item.name}`}
            style={{
              height: "300px",
            }}
          />
          <h1>{capitalizeOnlyFirstLetter(item.name)}</h1>
          <p>{capitalizeOnlyFirstLetter(item.description)}</p>
          <p>R$ {item.price}</p>
        </div>
      ))}
    </>
  );
};
