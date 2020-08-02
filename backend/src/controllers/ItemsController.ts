import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async gather(request: Request, response:Response){
    const items = await knex('items').select('*');
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.10:3333/assets/${item.image}`,
      };
    });
    console.log('Listando items');
    return response.json(serializedItems);
  }
}
export default ItemsController;