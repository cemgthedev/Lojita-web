import { TMessage } from './TMessage';

export type TChat = {
  id?: string;
  messages: TMessage[];

  sellerId: string;
  buyerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};
