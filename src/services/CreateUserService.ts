import { getCustomRepository } from 'typeorm';
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string,
  email: string,
  password: string,
  admin?: boolean
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const UserRepository = getCustomRepository(UserRepositories);

    if (!email) {
      throw new Error("Email Incorrect");
    }

    const userAlreadyExists = await UserRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8);

    const user = UserRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    })

    await UserRepository.save(user);

    return user;
  }
}

export { CreateUserService };