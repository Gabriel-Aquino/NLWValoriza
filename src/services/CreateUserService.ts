import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { AppError } from '../shared/errors/AppError';

interface IUserRequest {
    name: string,
    email: string,
    admin?: boolean
}

class CreateUserService {
    async execute({ name, email, admin }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) {
            throw new AppError('E-mail incorrect', 403);
        }

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (userAlreadyExists) {
            throw new AppError('User already exists', 409);
        }

        const user = usersRepository.create({
            name,
            email,
            admin,
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };
