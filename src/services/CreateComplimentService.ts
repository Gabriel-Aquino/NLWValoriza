import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { AppError } from '../shared/errors/AppError';

interface IComplimentsRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

export class CreateComplimentService {
    async execute({
 tag_id, user_sender, user_receiver, message,
 }: IComplimentsRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        if (user_sender === user_receiver) {
            throw new AppError('Your user cannot be the same who get a compliment', 403);
        }

        const userReceiverExists = await usersRepositories.findOne({
            id: user_receiver,
        });

        if (!userReceiverExists) {
            throw new AppError('User receiver does not exists', 403);
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message,
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}
