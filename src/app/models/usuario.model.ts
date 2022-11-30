export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public estado: boolean,
    public password?: string,
    public google?: boolean,
    public role?: string,
    public img?: string,
    public uid?: string
  ) {}
}
