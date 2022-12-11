import { Usuario } from '../models/usuario.model';

export interface ValidacionUsuario {
  ok: boolean;
  msg: string;
  jwt: string;
  usuario: Usuario;
}
