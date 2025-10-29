import { TMessage } from './TMessage';
import { TUser } from './TUser';

export type TChat = {
  id: string;
  messages?: TMessage[];

  sellerId: string;
  seller?: TUser;
  buyerId: string;
  buyer?: TUser;

  createdAt?: Date;
  updatedAt?: Date;
};
