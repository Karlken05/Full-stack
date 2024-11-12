import React from 'react';
import './menu.css';
import {Link} from 'react-router-dom';

const Menu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/cadastro-usuario">Cadastro   
 de Usuário</Link>
                </li>
                <li>
                    <Link to="/cadastro-produto">Cadastro de Produto</Link>
                </li>
                <li>
                    <Link to="/venda">Venda</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
