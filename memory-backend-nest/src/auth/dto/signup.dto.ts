import { Length } from 'class-validator';

export class SignupDto {
  @Length(3, 20)
  username;

  @Length(3, 50)
  email;

  @Length(3, 20)
  password;

  @Length(3, 20)
  bio;
}

