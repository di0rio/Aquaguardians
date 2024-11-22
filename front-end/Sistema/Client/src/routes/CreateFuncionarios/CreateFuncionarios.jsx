import styles from "./CreateFuncionarios.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonSubmit from "../../Components/ButtonSubmit/ButtonSubmit";

const CreateFuncionarios = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Adicionado estado para email
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState(""); // Corrigido para address
  const [dateOfBirth, setDateOfBirth] = useState(""); // Adicionado estado para data de nascimento
  const [hireDate, setHireDate] = useState(""); // Adicionado estado para data de contratação
  const [salary, setSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await axios.post(
        "https://aquaguardians.somee.com/api/Employes",
        {
          department,
          position,
          name,
          email, // Adicionado email
          phoneNumber,
          address, // Corrigido para address
          dateOfBirth, // Adicionado data de nascimento
          hireDate, // Adicionado data de contratação
          salary,
        }
      );
      console.log("Funcionário criado:", resposta.data);
      // Limpar os campos após o envio
      setDepartment("");
      setPosition("");
      setName("");
      setEmail(""); // Limpa o email
      setPhoneNumber("");
      setAddress(""); // Limpa o endereço
      setDateOfBirth(""); // Limpa a data de nascimento
      setHireDate(""); // Limpa a data de contratação
      setSalary("");
    } catch (erro) {
      console.error("Erro ao criar o funcionário:", erro);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Retorna à página anterior
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2> Cadastrar Funcionário </h2>
        <div className={styles.iconVoltar}>
          <ion-icon
            name="arrow-back-outline"
            type="button"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <hr />
      <div className={styles.container}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Corrigido para email
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Telefone"
          required
        />
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="Departamento"
          required
        />
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Cargo"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Corrigido para address
          placeholder="Endereço"
          required
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)} // Corrigido para data de nascimento
          placeholder="Data de Nascimento"
          required
        />
        <input
          type="date"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)} // Corrigido para data de contratação
          placeholder="Data de Contratação"
          required
        />
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="Salário"
          required
        />
        <ButtonSubmit text="Adicionar Item" />
      </div>
    </form>
  );
};

export default CreateFuncionarios;
