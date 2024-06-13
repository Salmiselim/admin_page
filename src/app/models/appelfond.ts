export class Appelfond {
  codeAP: number;
  createdAt: Date;
  client: any;
  responsable: any;
  b50: number;
  b20: number;
  b10: number;
  b5: number;
  monnaie: number;
  state: String;
  livrer: boolean;

  constructor(createdAt: Date, client: any, responsable: number, b50: number, b20: number, b10: number, B5: number, monnaie: number) {
    this.createdAt = createdAt;
    this.client = client;
    this.responsable = responsable;
    this.b50 = b50;
    this.b20 = b20;
    this.b10 = b10;
    this.b5 = B5;
    this.monnaie = monnaie;
    this.livrer = false;
  }
}
