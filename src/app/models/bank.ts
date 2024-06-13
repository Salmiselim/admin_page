export class Bank {
  name: string;
  code_Bank: string;
  full_name: string;
  deleted?: boolean;

  constructor(name: string, code_Bank: string, full_name: string) {
    this.name = name;
    this.code_Bank = code_Bank;
    this.full_name = full_name;

  }
}
