export type TMessage = {
  chatId: string;
  userId: string;
  content: string;

  createdAt: Date;
  updatedAt?: Date;
};
