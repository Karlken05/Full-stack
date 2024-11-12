import './CadastroProduto';
import logo from "../imagens/teste.png";
import { useState, useEffect } from 'react';

function CadastroProduto() {
  const [name, setName] = useState("");          // Nome do produto
  const [quantidade, setQuantidade] = useState(""); // Quantidade do produto
  const [preco, setPreco] = useState("");         // Preço do produto
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [produtoId, setProdutoId] = useState(null); // ID do produto a ser editado
  const [mostrarProdutos, setMostrarProdutos] = useState(false); // Controle de exibição

  async function salvar() {
    const productData = {
      name,
      quantidade,
      preco,
    };

    try {
      let response = await fetch("http://localhost:8000/api/produtos/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar produto");
      }

      alert("Produto salvo com sucesso");
      fetchProdutos(); // Atualiza a lista de produtos
      resetForm();
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    }
  }

  async function fetchProdutos() {
    const response = await fetch("http://localhost:8000/api/produtos/findAll");
    const data = await response.json();
    setProdutos(data);
    setMostrarProdutos(true);
  }

  async function buscarProdutoPorId(id) {
    const response = await fetch(`http://localhost:8000/api/produtos/findById/${id}`);
    const data = await response.json();
    setName(data.name);
    setQuantidade(data.quantidade);
    setPreco(data.preco);
    setProdutoId(id);
  }

  async function atualizarProduto() {
    const productData = {
      name,
      quantidade,
      preco,
    };

    try {
      let response = await fetch(`http://localhost:8000/api/produtos/update/${produtoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar produto");
      }

      alert("Produto atualizado com sucesso");
      fetchProdutos(); // Atualiza a lista de produtos
      resetForm();
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message);
    }
  }

  function resetForm() {
    setName("");
    setQuantidade("");
    setPreco("");
    setProdutoId(null);
  }

  return (
    <div id="formulario">
      <form id="form">
        <img src={logo} alt="Logo" type="image" />
        <h2>{produtoId ? "Atualizar Produto" : "Cadastrar Produto"}</h2>

        <label htmlFor="nome">Nome do Produto</label>
        <input
          type="text"
          name="nome"
          id="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="quantidade">Quantidade</label>
        <input
          type="number"
          name="quantidade"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <label htmlFor="preco">Preço</label>
        <input
          type="number"
          name="preco"
          id="preco"
          step="0.01"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input onClick={produtoId ? atualizarProduto : salvar} type="button" value={produtoId ? "Atualizar Produto" : "Cadastrar Produto"} className="btn-editar" />
        <input onClick={fetchProdutos} type="button" value="Mostrar Produtos" className="btn-editar" />
      </form>

      {mostrarProdutos && (
        <div>
          <h3>Produtos Cadastrados:</h3>
          <ul>
            {produtos.map((produto) => (
              <li key={produto.id}>
                {produto.name} - Quantidade: {produto.quantidade} - Preço: {produto.preco.toFixed(2)} 
                <button onClick={() => buscarProdutoPorId(produto.id)} className="btn-editar">Editar</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CadastroProduto;
