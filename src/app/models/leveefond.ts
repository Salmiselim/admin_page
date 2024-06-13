import { Client } from './client';
import { Responsable } from './responsable';

export class Leveefond {
  codeLV: number;
  createdAt: Date;
  client: Client;
  b50: number;
  b20: number;
  b10: number;
  b5: number;
  monnaie: number;
  state: string;
  livrer: boolean;
  responsable: Responsable;

  constructor(
    codeLV: number,
    createdAt: Date,
    client: Client,
    b50: number,
    b20: number,
    b10: number,
    b5: number,
    monnaie: number,
    state: string,
    livrer: boolean,
    responsable: Responsable
  ) {
    this.codeLV = codeLV;
    this.createdAt = createdAt;
    this.client = client;
    this.b50 = b50;
    this.b20 = b20;
    this.b10 = b10;
    this.b5 = b5;
    this.monnaie = monnaie;
    this.state = state;
    this.livrer = livrer;
    this.responsable = responsable;
  }
}
