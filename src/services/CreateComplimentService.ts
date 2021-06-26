import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

    const complimentRepostories = getCustomRepository(ComplimentRepositories);
    const userRepositories = getCustomRepository(UserRepositories);

    if (user_receiver === user_sender) {
      throw new Error("Invalid User Receiver");
    }

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exist");
    }

    const compliment = complimentRepostories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })

    await complimentRepostories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };