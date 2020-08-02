import Axios from 'axios';

const ibge = Axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
});

export default ibge;