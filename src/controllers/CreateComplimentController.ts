import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

export class CreateComplimentController {
    async handle(request: Request, response: Response) {
        const {
            tag_id, user_receiver, user_sender, message,
        } = request.body;

        const createComplimentService = new CreateComplimentService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_receiver,
            user_sender,
            message,
        });

        return response.status(200).json(compliment);
    }
}
