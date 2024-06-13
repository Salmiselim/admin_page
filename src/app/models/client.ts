export class Client {
  code: string;
  name: string;
  lastname: string;
  phone: number;
  email: string;
  password: string;
  codeSetByAdmin: boolean

  constructor(code: string, name: string, lastname: string, phone: number, password: string, email: string) {
    this.code = code;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.password = password;

  }
}
