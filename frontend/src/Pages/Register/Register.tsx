import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../Assets/project-logo.png';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import Api from '../../Services/Api';
import Axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import DropZone from '../../Components/Dropzone';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGE_UF {
  sigla: string;
}

interface IBGE_City {
  nome: string;
}

const Register = () => {
  //Para usar state para array ou obj 
  //Tipar cada variável na mão fi
  const history = useHistory();
  const [items, setItems] = useState<Item[]>([]);
  const [estados, setEstados] = useState<string[]>([]);
  const [currentUF, setCurrentUF] = useState('0');
  const [cities, setCities] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState('0');
  const [MapPosition, setMapPosition] = useState<[number, number]>([0,0]);
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([0,0]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    whatsapp:''
  });

  useEffect(() => { 
    Api.get('/items').then(response => setItems(response.data));
  }, []);

  useEffect(() => {
    Axios.get<IBGE_UF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const StateInitials = response.data.map(uf => uf.sigla);
      setEstados(StateInitials);
    });
  }, []);

  useEffect(() => {
    if(currentUF === '0') {
      return;
    }
    Axios.get<IBGE_City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${currentUF}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);
      setCities(cityNames);
    });
  },[setCurrentUF, currentUF]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => 
      setCurrentPosition(
        [position.coords.latitude, position.coords.longitude]));
  },[]);


  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    setCurrentUF(uf);
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setCurrentCity(city);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({...formData, [name]: value });
  };
  
  const onMapClick = (event: LeafletMouseEvent) => {
    setMapPosition([
      event.latlng.lat,
      event.latlng.lng,
    ]);
  };

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if(alreadySelected >=0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);

    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSubmit = async(event: FormEvent) => {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = currentUF;
    const city = currentCity;
    const [latitude, longitude] = MapPosition;
    const items = selectedItems;

    const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('whatsapp', whatsapp);
      data.append('uf', uf);
      data.append('city', city);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('items', items.join(','));
      
      if(selectedFile){
        data.append('image', selectedFile);
      }

    await Api.post('points', data);

    alert('Ponto de doação criado!');

    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="VestiBem" />
        <Link to='/'>Voltar para Home
        <FiArrowLeft /></Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do  <br /> ponto de doação</h1>


        <DropZone onFileUpload={setSelectedFile} />
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade de doação</label>
            <input type="text" name="name" id="name" onChange={handleInputChange} />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="name">WhatsApp</label>
              <input type="number" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" onChange={handleInputChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={currentPosition} zoom={15} onClick={onMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={MapPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado(UF)</label>
              <select name="uf" id="uf" onChange={handleSelectUf} value={currentUF}>
                <option value="0">Selecione uma UF</option>
                {
                  estados.map(uf => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))
                }
              </select>
            </div>

            <div className="field">
              <label htmlFor="uf">Cidade</label>
              <select name="city" id="city" value={currentCity} onChange={handleSelectCity}>
                <option value="0">Selecione uma Cidade</option>
                {
                  cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                  ))
                }
              </select>
            </div>
          </div>
        
        </fieldset>

        <fieldset>
          <legend>
            <h2>Tipos de Roupa</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {
              items.map(item => (
                <li key={item.id} onClick={() => handleSelectItem(item.id)}
                 className={selectedItems.includes(item.id) ? 'selected' : ''}>
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </li>
              ))}
          </ul>
        </fieldset>
        
        <button type="submit">Cadastrar ponto de doação</button>
      </form>
    </div>
  );
};
export default Register;