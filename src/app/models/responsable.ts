export interface Responsable {
  id?: number;
  codeResponsable: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  agence: {
    codeAgence: number;
    bank: {
      code_Bank: string;
      full_name: string;
    };
    name: string;
    address: string;
    agenceName: string;
    latitude: number;
    longitude: number;
    region: string;
  };
}
