export type TMessage = {
  content: string;

  createdAt: Date;
  updatedAt?: Date;
};

export type TChat = {
  id?: string;
  messages: TMessage[];

  sellerId: string;
  buyerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};
