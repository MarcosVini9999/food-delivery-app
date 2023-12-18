import useAuth from "@/context/AuthContext";
import { ILogUser } from "@/interfaces/ILogUser";
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
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register: FC = () => {
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
  const { authenticate } = useAuth();
  const navigate = useNavigate();

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

  const handleLogin = async () => {
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

  const handleUser = async () => {
    if (!email) {
      alert("Email não informado");
      return;
    }
    if (!name) {
      alert("Nome não informado");
      return;
    }
    if (!password) {
      alert("Senha não informada");
      return;
    }
    if (!confirmPassword) {
      alert("Confirmação de senha não informada");
      return;
    }
    if (!cpf) {
      alert("CPF não informado");
      return;
    }
    if (!cellphone) {
      alert("Celular não informado");
      return;
    }
    if (!cep) {
      alert("CEP não informado");
      return;
    }
    if (!city) {
      alert("Cidade não informada");
      return;
    }
    if (!street) {
      alert("Rua não informada");
      return;
    }
    if (!houseNumber) {
      alert("Número da casa não informado");
      return;
    }
    if (!complement) {
      alert("Complemento não informado");
      return;
    }
    if (password !== confirmPassword) {
      alert("Senhas não conferem");
      return;
    }

    const requestBody = {
      name,
      email,
      password,
      cpf,
      cep,
      phone: cellphone,
      city,
      street,
      number: houseNumber,
      address_complement: complement,
    };

    let result: string | undefined = undefined;

    try {
      result = await apiFood.post("/user", requestBody);
    } catch (error) {
      console.error(error);
    }

    if (result) handleLogin();
  };

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
    <Box>
      <TextField value={email} onChange={handleEmail} label="Email" variant="outlined" />
      <TextField value={name} onChange={handleName} label="Nome" variant="outlined" />
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
      <TextField value={cpf} onChange={handleCpf} label="CPF" variant="outlined" />
      <TextField value={cellphone} onChange={handleCellphone} label="Celular" variant="outlined" />
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
      <Button onClick={handleUser} variant="contained">
        Registrar
      </Button>
    </Box>
  );
};
