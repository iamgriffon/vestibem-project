import React from 'react';
import './Home.css';
import logo from '../../Assets/project-logo.png';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="VestiColeta" className='image'/>
          </header>
    <main>
      <h1>Seu ponto de doação de roupas na vizinhança.</h1>
      <p>Não importa o tamanho, não importa a marca, o importante é ajudar!</p>
      <Link to ='/add-point'>
        <span>
          <FiLogIn />
        </span>
        <strong>Cadastre um ponto de coleta</strong>
      </Link>
    </main>
      </div>
    </div>
  )
}
export default Home;