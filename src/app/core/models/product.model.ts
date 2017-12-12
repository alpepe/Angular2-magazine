export type ProductType = 'clothes' | 'accessories' | 'shoes' ;

export interface Item {
    id?: number;
    name?: string;
    price?: number;
    currency?: string;
    typing?: ProductType[];
    picture?: string;
  }
  
