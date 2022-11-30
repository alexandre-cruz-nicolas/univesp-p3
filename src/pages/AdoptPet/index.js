import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { FaWhatsapp  } from 'react-icons/fa'
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo-adotepet.svg';
import foto1 from '../../assets/foto-teste.png';
import foto2 from '../../assets/foto-teste2.png';

const AddPet = () => {
    const [ filtrou, setFiltrou ] =useState(false);
    const [ufs, setUfs ] = useState([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cities, setCities] = useState([]);
    const [selectedSexo, setSelectedSexo ] = useState('T')
    const [selectedTipo, setSelectedTipo ] = useState('T')
    const [selectedCity , setSelectedCity] = useState('0');

    useEffect(() => {
        axios
        .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then(response => {
            const UfInitials = response.data.map(uf => uf.sigla);
            setUfs(UfInitials);
        })

    }, []);

    useEffect(() => {
       if (selectedUF === '0') { return; }

       axios
        .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
        .then(response => { 
            const CityNames = response.data.map(city => city.nome);
            setCities( CityNames );
        });

    },[selectedUF])

    function handleSelectUF(event) {
        const uf = event.target.value;
        setSelectedUF(uf);
    };

    function handleSelectSexo(event) {
        const sexo = event.target.value;
        setSelectedSexo(sexo);
    };

    function handleSelectTipo(event) {
        const tipo = event.target.value;
        setSelectedTipo(tipo);
    };

    function handleSelectCity(event) {
        const city = event.target.value;
        setSelectedCity(city);
    };

    async function handleSubmit(event){
        event.preventDefault(); //evitar que o form recarregue a tela
        setFiltrou(true);
    }

    return(
        <div id="page-add-pet">
            <header>
                <img src={logo} alt="adotePET" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Pets<br/>para adoção</h1>
                
                <fieldset>
                    <legend>
                        <h2>Filtros</h2>
                    </legend>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" 
                                    id="uf" 
                                    value={selectedUF} 
                                    onChange={handleSelectUF}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                   <option key={uf} value={uf}>{uf}</option> 
                                ))}
                            </select>
                        </div> 

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" 
                                    id="city"
                                    value={selectedCity}
                                    onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                   <option key={city} value={city}>{city}</option> 
                                ))}
                            </select>    
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="sexo">Sexo</label>
                             <select name="sexo" id="sexo" value={selectedSexo} onChange={handleSelectSexo}>
                                <option key="M" value='M'>Macho</option>
                                <option key="F" value='F'>Fêmea</option>
                                <option key="T" value="T">Todos</option>
                             </select>
                        </div>
                        <div className="field">
                            <label htmlFor="tipo">Tipo</label>
                             <select name="tipo" id="tipo" value={selectedTipo} onChange={handleSelectTipo}>
                                <option key="F" value="F">Filhote</option>
                                <option key="A" value="A">Adulto</option>
                                <option key="T" value="T">Todos</option>
                             </select>
                        </div>   
                    </div>
                </fieldset>
                <button type="submit">Filtrar</button>

                {filtrou && (<>
                <div className='lista-pets'>
                     <h1>Pets<br/>disponíveis</h1>
                     
                        <div className="pet">
                             <img src={foto1} alt="adotePET" />
                             <div>
                             <h2>Nome: Pipoca (Macho, Filhote)</h2>
                             <br/>
                             <h3>cor caramelo, raça indefinida, muito sapeca e carinhoso.
                             <br/><br/>
                             Bauru (SP)</h3>
                             <Link to="/">
                                <span>
                                    <FaWhatsapp />
                                </span>
                                <strong>Tenho interesse</strong>
                            </Link>
                            </div>
                        </div>

                        <div className="pet">
                             <img src={foto2} alt="adotePET" />
                             <div>
                             <h2>Nome: Cherry (Fêmea, Adulto)</h2>
                             <br/>
                             <h3>cor preta, focinho amarelo, raça indefinida, adora brincar, muito dócil e atenta.
                             <br/><br/>
                             Bauru (SP)</h3>
                             <Link to="/">
                                <span>
                                    <FaWhatsapp />
                                </span>
                                <strong>Tenho interesse</strong>
                            </Link>
                            </div>
                        </div>
                </div>
                </>)}
            </form>
        </div>
    );
}

export default AddPet;