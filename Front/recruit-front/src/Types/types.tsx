export interface Project {
  id: number;
  name: string;
  description: string;
  responsiblePersonEmail: string;
  product: NordProduct;
  image: string;
}

export enum NordProduct {
  NordVPN,
  NordPass,
  NordLocker,
  NordLayer,
  NordSecurity,
}
