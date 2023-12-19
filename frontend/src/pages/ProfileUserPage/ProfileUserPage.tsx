import { ImageUserUpload } from "@/components";
import useAuth from "@/context/AuthContext";
import { IUser } from "@/interfaces/IUser";
import apiFood from "@/services/apiFood";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import DefaultImageUser from "@/assets/icons/profile-default.svg";
import axios from "axios";

export const ProfileUserPage: FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({} as IUser);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [complement, setComplement] = useState("");

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpf(event.target.value);
  };

  const handleCellphone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCellphone(event.target.value);
  };

  const handleCep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };

  const handleCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(event.target.value);
  };

  const handleHouseNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(event.target.value);
  };

  const handleComplement = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComplement(event.target.value);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const updateUser = async () => {
    if (!user.token) return;

    try {
      const response = await apiFood.put(
        `/user/${user.id}`,
        {
          name,
          email,
          cpf,
          cep,
          phone: cellphone,
          city,
          street,
          number: houseNumber,
          address_complement: complement,
        },
        {
          headers: {
            Authorization: user.token,
          },
        }
      );

      alert("Dados atualizados com sucesso!");
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      alert("ERROR! Por favor preencha corretamenta os campos");
    }
  };

  const getUserData = async () => {
    if (!user.token) return;

    try {
      const response = await apiFood.get(`/user/${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const fetchCep = async () => {
    if (cep.length != 8) return;
    try {
      const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setCity(result.data.localidade);
      setStreet(result.data.logradouro);
      setComplement(result.data.complemento);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCep();
  }, [cep]);

  return (
    <>
      <h1>BEM VINDO {userData.name}</h1>
      <Box>
        <h2>Dados do usuário</h2>
        <img
          src={
            userData.avatar_url
              ? `${apiFood.defaults.baseURL}/${userData.avatar_url}`
              : DefaultImageUser
          }
          alt="avatar do usuário"
          style={{
            width: "200px",
          }}
        />
        <Typography>Email: {userData.email}</Typography>
        <Typography>Nome: {userData.name}</Typography>
        <Typography>CPF: {userData.cpf}</Typography>
        <Typography>Celular: {userData.phone}</Typography>
        <Typography>CEP: {userData.cep}</Typography>
        <Typography>Cidade: {userData.city}</Typography>
        <Typography>Rua: {userData.street}</Typography>
        <Typography>Número da casa: {userData.number}</Typography>
        <Typography>Complemento: {userData.address_complement}</Typography>
      </Box>
      <Box>
        <h2>Atualizar dados</h2>
        <TextField value={email} onChange={handleEmail} label="Email" variant="outlined" />
        <TextField value={name} onChange={handleName} label="Nome" variant="outlined" />
        <TextField value={cpf} onChange={handleCpf} label="CPF" variant="outlined" />
        <TextField
          value={cellphone}
          onChange={handleCellphone}
          label="Celular"
          variant="outlined"
        />
        <TextField value={cep} onChange={handleCep} label="CEP" variant="outlined" minRows={8} />
        <TextField value={city} onChange={handleCity} label="Cidade" variant="outlined" />
        <TextField value={street} onChange={handleStreet} label="Rua" variant="outlined" />
        <TextField
          value={houseNumber}
          onChange={handleHouseNumber}
          label="Número da casa"
          variant="outlined"
        />
        <TextField
          value={complement}
          onChange={handleComplement}
          label="Complemento"
          variant="outlined"
        />

        <Button onClick={updateUser} variant="contained">
          Atualizar
        </Button>
      </Box>
      <Box>
        <h2>Atualizar senha</h2>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
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
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirme sua Senha</InputLabel>
          <OutlinedInput
            value={confirmPassword}
            onChange={handleConfirmPassword}
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
        <Button onClick={() => alert("Em futuras atualizações")} variant="contained">
          Atualizar
        </Button>
      </Box>
      <ImageUserUpload />
    </>
  );
};
