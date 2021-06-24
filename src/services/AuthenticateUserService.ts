import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { AppError } from '../shared/errors/AppError';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

export class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        const user = await usersRepositories.findOne({
            email,
        });

        if (!user) {
            throw new AppError('Email/Password already exists', 403);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email/Password already exists', 403);
        }

        const token = sign({
            email: user.email,
        }, '81015f9addf7eb7b90195db298a79921', {
            subject: user.id,
            expiresIn: '1d',
        });

        return token;
    }
}
