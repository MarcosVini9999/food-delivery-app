import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFood from "@/services/apiFood";
import useAuth from "@/context/AuthContext";
import { Login, Register } from "@/containers";
import { Box, Typography } from "@mui/material";

export const LoginPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isToRegister, setIsToRegister] = useState(false);

  const handleRegisterInterface = () => setIsToRegister((isToRegister) => !isToRegister);

  const checkLogin = async () => {
    if (!user.token) return;

    let isLogged = false;

    try {
      const response = await apiFood.get("/users", {
        headers: {
          Authorization: user.token,
        },
      });

      if (response.status === 200) isLogged = true;
    } catch (error) {
      console.error(error);
    }

    if (isLogged) navigate("/menu");
  };

  useEffect(() => {
    checkLogin();
  }, []);
  // comentario legal
  return (
    <>
      {isToRegister ? (
        <Box>
          <Typography>Registre-se</Typography>
          <Register />
          <button onClick={handleRegisterInterface}>Você já tem uma conta ?</button>
        </Box>
      ) : (
        <Box>
          <Login changeLoginType={handleRegisterInterface} />
        </Box>
      )}
    </>
  );
};
