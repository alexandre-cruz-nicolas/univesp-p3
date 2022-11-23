import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios';

import Dropzone from '../../components/Dropzone';

import api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo-adotepet.svg';

const AddPet = () => {
    const [ufs, setUfs ] = useState([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [cities, setCities] = useState([]);
    const [selectedSexo, setSelectedSexo ] = useState('M')
    const [selectedTipo, setSelectedTipo ] = useState('F')
    const [selectedCity , setSelectedCity] = useState('0');

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        whatsapp: ''
    })
    const [selectedFile, setSelectedFile ] = useState();

    const history = useNavigate();

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

    function handleInputChange(event){
        const {name, value} = event.target;

        setFormData({...formData, [name]: value});
    }

    async function handleSubmit(event){
        event.preventDefault(); //evitar que o form recarregue a tela

        const {name, email, whatsapp} = formData;
        const uf = selectedUF;
        const city = selectedCity;


        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        if (selectedFile) {
           data.append('image', selectedFile);
        }


        /*const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            itens
        }*/

        //console.log( selectedFile  );
        //console.log( name );
       
        await api.post('points', data);

        alert('Pet adicionado!');

        history('/');
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
                <h1>Cadastro de Pet<br/>para adoção</h1>
                <Dropzone onFileUploaded={setSelectedFile} />
                <fieldset>
                    <legend>
                        <h2>Dados do pet</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome do Pet</label>
                        <input
                            type="text"
                            name="name"
                            id="name" 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">Sexo</label>
                             <select name="sexo" id="sexo" value={selectedSexo} onChange={handleSelectSexo}>
                                <option key="M" value='M'>Macho</option>
                                <option key="F" value='F'>Fêmea</option>
                             </select>
                        </div>
                        <div className="field">
                            <label htmlFor="name">Tipo</label>
                             <select name="tipo" id="tipo" value={selectedTipo} onChange={handleSelectTipo}>
                                <option key="F" value='F'>Filhote</option>
                                <option key="A" value='A'>Adulto</option>
                             </select>
                        </div>
                        
                    </div>
                    <div className="field">
                        <label htmlFor="name">Descreva as características do pet: Raça, cor, idade, porte, temperamento, etc...</label>
                        <textarea
                            name="descricao"
                            id="descricao" 
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Dados do doador</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome do Doador</label>
                        <input
                            type="text"
                            name="doador"
                            id="doador" 
                            onChange={handleInputChange}
                        />
                    </div>

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

                    <div className="field">
                        <label htmlFor="name">WhatsApp (DDD)99999-9999</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp" 
                            onChange={handleInputChange}
                        />
                        </div>
                </fieldset>

                <button type="submit">Adicionar Pet</button>
            </form>
        </div>
    );
}

export default AddPet;