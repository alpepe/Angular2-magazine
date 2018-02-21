export class RegisterModel {
  constructor(
    public username: string,
    public password: string,
    public confirmPassword: string,
    public firstName: string,
    public lastName: string,
    public role: string,
    public orders: Object[]
  ) { }
}
