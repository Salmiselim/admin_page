import { Bank } from "./bank";
import { Responsable } from "./responsable";

export class Agence {
  codeAgence: number;
  name: string;
  address: string;
  region: string;
  bank: Bank;
  responsable: Responsable;
  deleted: boolean;

  constructor(
    codeAgence: number,
    name: string,
    address: string,
    region: string,
    bank: Bank,
    responsable: Responsable,
    deleted: boolean
  ) {
    this.codeAgence = codeAgence;
    this.name = name;
    this.address = address;
    this.region = region;
    this.bank = bank;
    this.responsable = responsable;
    this.deleted = deleted;
  }
}
