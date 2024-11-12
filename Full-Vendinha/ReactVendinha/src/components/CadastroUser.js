import './CadastroUser.css';
import logo from "../imagens/teste.png";
import { useState, useEffect } from 'react';

function CadastroUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários
    const [usuarioId, setUsuarioId] = useState(null); // ID do usuário a ser editado
    const [mostrarUsuarios, setMostrarUsuarios] = useState(false); // Controle de exibição

    async function salvar() {
        const userData = {
            name,
            email,
            password,
            cpf,
            cnpj,
        };

        try {
            let response = await fetch("http://localhost:8000/api/users/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Erro ao salvar usuário");
            }

            alert("Usuário salvo com sucesso");
            fetchUsuarios(); // Atualiza a lista de usuários
            resetForm();
        } catch (error) {
            console.error("Erro:", error);
            alert(error.message);
        }
    }

    async function fetchUsuarios() {
        const response = await fetch("http://localhost:8000/api/users/findAll");
        const data = await response.json();
        setUsuarios(data);
    }

    async function buscarUsuarioPorId(id) {
        const response = await fetch(`http://localhost:8000/api/users/findById/${id}`);
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setCpf(data.cpf);
        setCnpj(data.cnpj);
        setUsuarioId(id);
    }

    async function atualizarUsuario() {
        const userData = {
            name,
            email,
            password,
            cpf,
            cnpj,
        };

        try {
            let response = await fetch(`http://localhost:8000/api/users/update/${usuarioId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar usuário");
            }

            alert("Usuário atualizado com sucesso");
            fetchUsuarios(); // Atualiza a lista de usuários
            resetForm();
        } catch (error) {
            console.error("Erro:", error);
            alert(error.message);
        }
    }

    function resetForm() {
        setName("");
        setEmail("");
        setPassword("");
        setCpf("");
        setCnpj("");
        setUsuarioId(null);
    }

    function toggleMostrarUsuarios() {
        setMostrarUsuarios(!mostrarUsuarios); // Alterna entre true e false
        if (!mostrarUsuarios) {
            fetchUsuarios(); // Busca os usuários apenas ao abrir a lista
        }
    }

    return (
        <div id="formulario">
            <form id="form">
                <img src={logo} alt="Logo" type="image" />
                <h2>{usuarioId ? "Atualizar Usuário" : "Cadastrar-se"}</h2>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="senha">Senha</label>
                <input
                    type="password"
                    name="senha"
                    id="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="cpf">CPF</label>
                <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />

                <label htmlFor="cnpj">CNPJ</label>
                <input
                    type="text"
                    name="cnpj"
                    id="cnpj"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                />

                <input onClick={usuarioId ? atualizarUsuario : salvar} type="button" value={usuarioId ? "Atualizar Usuário" : "Cadastrar-se"} className="btn-editar" />
                <input onClick={toggleMostrarUsuarios} type="button" value={mostrarUsuarios ? "Ocultar Usuários" : "Mostrar Usuários"} className="btn-editar" />
            </form>

            {mostrarUsuarios && (
                <div>
                    <h3>Usuários Cadastrados:</h3>
                    <ul>
                        {usuarios.map((usuario) => (
                            <li key={usuario.id}>
                                {usuario.name} - Email: {usuario.email} - CPF: {usuario.cpf} - CNPJ: {usuario.cnpj}
                                <button onClick={() => buscarUsuarioPorId(usuario.id)} className="btn-editar">Editar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default CadastroUser;
