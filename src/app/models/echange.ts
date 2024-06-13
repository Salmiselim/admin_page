export interface Echange {
  codeEchange?: number;
  client?: any;
  responsable?: any;
  createdAt?: Date;
  montant: number;
  state: string;
  livrer: boolean;
}
