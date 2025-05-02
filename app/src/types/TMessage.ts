export type TMessage = {
  userId: string;
  content: string;

  createdAt: Date;
  updatedAt?: Date;
};
