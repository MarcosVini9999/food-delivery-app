import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { FC, FormEvent, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ILogUser } from "@/interfaces/ILogUser";
import apiFood from "@/services/apiFood";
import useAuth from "@/context/AuthContext";

export const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (!email) return;
    if (!password) return;

    const postData = {
      email,
      password,
    };

    let userData: ILogUser = {} as ILogUser;

    try {
      const response = await apiFood.post("/login", postData);
      userData = response.data;
    } catch (error) {
      console.error(error);
    }

    if (!userData) return;

    authenticate(userData);

    navigate("/menu");
  };

  return (
    <>
      <Box>
        <TextField value={email} onChange={handleEmail} label="Email" variant="outlined" />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            value={password}
            onChange={handlePassword}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button onClick={handleLogin} variant="contained">
          Entrar
        </Button>
      </Box>
    </>
  );
};
