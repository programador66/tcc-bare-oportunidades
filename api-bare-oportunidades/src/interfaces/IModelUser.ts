export default interface IModelUser{
  email: String;
  tp_usuario: String;
  senha: String;
  passwordResetToken?: String;
  passwordResetExpires?: Date;
}
