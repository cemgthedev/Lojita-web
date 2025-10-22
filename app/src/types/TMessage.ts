export type TMessage = {
  id?: string;
  chatId: string;
  userId: string;
  content: string;

  createdAt: Date;
  updatedAt?: Date;
};
