import Knex from "knex";

export const seed = async (knex: Knex) => {
  await knex('items').insert([
    { title: 'Camisetas', image: 'camiseta.svg' },
    { title: 'Calças', image: 'calca.svg' },
    { title: 'Chapéis', image: 'chapeu.svg' },
    { title: 'Agasalhos', image: 'agasalhos.svg' },
    { title: 'Luvas', image: 'luvas.svg' },
    { title: 'Calçados', image: 'calcado.svg' }
  ]);
};