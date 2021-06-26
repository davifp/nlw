import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

class ListUserReceiverComplimentsService {
  async execute(user_id: string) {
    const complimentRepositories = getCustomRepository(ComplimentRepositories);

    const compliments = await complimentRepositories.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    });

    return compliments;
  }
}

export { ListUserReceiverComplimentsService };