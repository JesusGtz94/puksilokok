export type Pack = {
  from: string;
  to: string;
  price: string;
};

export type AvailableColors = {
  name: string;
  code: string;
};

export type Product = {
  title: string;
  desc: string;
  id: string;
  category: string;
  subcategory: string;
  price: string;
  promotionPrice?: string;
  packs?: Pack[];
  availableColors?: AvailableColors[];
  minAmount?: string;
  images?: string[];
};
