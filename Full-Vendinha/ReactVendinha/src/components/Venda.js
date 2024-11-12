import './Venda.css';
import logo from "../imagens/teste.png"; // Logo para o formulário de vendas
import { useState, useEffect } from 'react';

function Venda() {
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários
    const [produtos, setProdutos] = useState([]); // Lista de produtos
    const [usuarioId, setUsuarioId] = useState(""); // ID do usuário selecionado
    const [produtoId, setProdutoId] = useState(""); // ID do produto selecionado
    const [quantidade, setQuantidade] = useState(""); // Quantidade do produto a ser vendido
    const [vendas, setVendas] = useState([]); // Lista de vendas
    const [mostrarVendas, setMostrarVendas] = useState(false); // Controle de exibição das vendas

    useEffect(() => {
        fetchUsuarios(); // Busca usuários ao carregar o componente
        fetchProdutos(); // Busca produtos ao carregar o componente
    }, []);

    async function fetchUsuarios() {
        const response = await fetch("http://localhost:8000/api/users/findAll");
        const data = await response.json();
        setUsuarios(data);
    }

    async function fetchProdutos() {
        const response = await fetch("http://localhost:8000/api/produtos/findAll");
        const data = await response.json();
        setProdutos(data);
    }

    async function realizarVenda() {
        const vendaData = {
            usuarioId,
            produtoId,
            quantidade,
        };

        try {
            let response = await fetch("http://localhost:8000/api/vendas/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vendaData),
            });

            if (!response.ok) {
                throw new Error("Erro ao realizar venda");
            }

            alert("Venda realizada com sucesso");
            fetchVendas(); // Atualiza a lista de vendas
            resetForm();
        } catch (error) {
            console.error("Erro:", error);
            alert(error.message);
        }
    }

    async function fetchVendas() {
        const response = await fetch("http://localhost:8000/api/vendas/findAll");
        const data = await response.json();

        // Mapeia os dados para incluir informações do usuário e do produto
        const vendasComDetalhes = await Promise.all(data.map(async (venda) => {
            const usuarioResponse = await fetch(`http://localhost:8000/api/users/findById/${venda.usuarioId}`);
            const usuario = await usuarioResponse.json();

            const produtoResponse = await fetch(`http://localhost:8000/api/produtos/findById/${venda.produtoId}`);
            const produto = await produtoResponse.json();

            return {
                ...venda,
                usuarioName: usuario.name,
                produtoName: produto.name,
            };
        }));

        setVendas(vendasComDetalhes);
        setMostrarVendas(true);
    }

    function resetForm() {
        setUsuarioId("");
        setProdutoId("");
        setQuantidade("");
    }

    return (
        <div id="formulario">
            <form id="form">
                <img src={logo} alt="Logo" type="image" />
                <h2>Realizar Venda</h2>

                <label htmlFor="usuario">Selecionar Usuário</label>
                <select
                    id="usuario"
                    value={usuarioId}
                    onChange={(e) => setUsuarioId(e.target.value)}
                >
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.name} - {usuario.email}
                        </option>
                    ))}
                </select>

                <label htmlFor="produto">Selecionar Produto</label>
                <select
                    id="produto"
                    value={produtoId}
                    onChange={(e) => setProdutoId(e.target.value)}
                >
                    <option value="">Selecione um produto</option>
                    {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                            {produto.name} - Preço: {produto.preco.toFixed(2)}
                        </option>
                    ))}
                </select>

                <label htmlFor="quantidade">Quantidade</label>
                <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />

                <input onClick={realizarVenda} type="button" value="Realizar Venda" className="btn-editar" />
                <input onClick={fetchVendas} type="button" value="Mostrar Vendas" className="btn-editar" />
            </form>

            {mostrarVendas && (
                <div>
                    <h3>Vendas Realizadas:</h3>
                    <ul>
                        {vendas.map((venda) => (
                            <li key={venda.id}>
                                Usuário: {venda.usuarioName} - Produto: {venda.produtoName} - Quantidade: {venda.quantidade}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Venda;
