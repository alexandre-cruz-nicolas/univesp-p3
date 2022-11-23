import React from 'react';
import { Link } from 'react-router-dom';
import { MdPets } from 'react-icons/md'
import { RiHeartAddLine  } from 'react-icons/ri'
import logo from '../../assets/logo-adotepet.svg';
import  "./styles.css";

const Home = () => {
    return(
        <div id="page-home">
          <div className="content">
            <header>
                <img src={logo} alt="adotePET" />
            </header>
          
            <main>
              <h1>Adotar é um ato de amor.</h1>
              <p>Ajudamos a conectar pessoas e pets para uma adoção responsável.</p>
              <Link to="/add-pet">
                  <span>
                      <RiHeartAddLine />
                  </span>
                  <strong>Cadastrar pet</strong>
              </Link>
              <Link to="/">
                  <span>
                      <MdPets />
                  </span>
                  <strong>Quero adotar!</strong>
              </Link>
            </main>
          </div>
        </div>
    );
}

export default Home;
