/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAlert from "components/SoftAlert";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const handleSetAgremment = () => setAgremment(!agreement);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const validatePassword = (password) => {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (password.length < 8) {
        return "A senha deve ter pelo menos 8 caracteres.";
    }

    // Verifica se a senha contém pelo menos um número
    if (!/[0-9]/.test(password)) {
        return "A senha deve conter pelo menos um número.";
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
        return "A senha deve conter pelo menos uma letra maiúscula.";
    }

    return null;
};


  const handleSubmit = async (event) => {
    event.preventDefault();

    const passwordError = validatePassword(senha);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }
    

    const formData = {
        nomeCompleto,
        razaoSocial,
        email,
        senha,
        cep,
        numero
    };

    // Aqui você pode enviar formData para um servidor
    try {
        const response = await fetch('http://172.18.83.207:8000/api/seller', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
    }
};




  return (
    <BasicLayout
      title="Bem Vindo!"
      description="Esse é o Cadastro de Vendedor na Plataforma"
      image={curved6}
    >
      {errorMessage && <SoftAlert color="primary">{errorMessage}</SoftAlert>}
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Registro do Vendedor
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit} >
            <SoftBox mb={2}>
              <SoftInput type="text" placeholder="Nome Completo"  value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="text" placeholder="Razão Social" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
            <SoftInput type="number" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput type="number" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Checkbox checked={agreement} onChange={handleSetAgremment} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetAgremment}
                sx={{ cursor: "poiner", userSelect: "none" }}
              >
                &nbsp;&nbsp;Eu concordo com os&nbsp;
              </SoftTypography>
              <SoftTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Termos e Condições
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit" variant="gradient" color="dark" fullWidth>
                Inscrever-se
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
              Já possui uma conta?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Entrar
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
