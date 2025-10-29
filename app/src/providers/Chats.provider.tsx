import { chatsMock } from '@/mock/chats';
import { usersMock } from '@/mock/users';
import { TChat } from '@/types/TChat';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface IContextChats {
  chats: TChat[];
  setChats: Dispatch<SetStateAction<TChat[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  filterChats: IFilterChats;
  setFilterChats: Dispatch<SetStateAction<IFilterChats>>;

  createChat(chat: TChat): Promise<TChat | undefined>;
  searchChats(filterChats: IFilterChats): Promise<TChat[]>;
  getChat(id: string): Promise<TChat | undefined>;
  updateChat(chat: TChat): Promise<TChat | undefined>;
  deleteChat(id: string): Promise<boolean>;
}

export const ContextChats = createContext({} as IContextChats);

interface IProviderChats {
  children: ReactNode;
}

export interface IFilterChats {
  sellerName?: string;
  buyerName?: string;
  messageContent?: string;
  startDate?: string;
  endDate?: string;
}

export function ProviderChats({ children }: IProviderChats) {
  const [chats, setChats] = useState<TChat[]>(chatsMock);
  const [isLoading, setIsLoading] = useState(false);
  const [filterChats, setFilterChats] = useState<IFilterChats>({});

  const createChat = async (chat: TChat): Promise<TChat | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setChats((prev) => [...prev, chat]);
        resolve(chat);
      }, 1000);
    });
  };

  const searchChats = async (filterChats: IFilterChats): Promise<TChat[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredChats = chatsMock.filter((chat) => {
          const seller = usersMock.find((u) => u.id === chat.sellerId);
          const buyer = usersMock.find((u) => u.id === chat.buyerId);

          const matchesSellerName = filterChats.sellerName
            ? seller?.name
                ?.toLowerCase()
                .includes(filterChats.sellerName.toLowerCase())
            : true;

          const matchesBuyerName = filterChats.buyerName
            ? buyer?.name
                ?.toLowerCase()
                .includes(filterChats.buyerName.toLowerCase())
            : true;

          const matchesMessageContent = filterChats.messageContent
            ? chat.messages?.some((m) =>
                m.content
                  .toLowerCase()
                  .includes(filterChats?.messageContent?.toLowerCase() || ''),
              )
            : true;

          const matchesStartDate = filterChats.startDate
            ? chat.createdAt &&
              new Date(chat.createdAt) >= new Date(filterChats.startDate)
            : true;

          const matchesEndDate = filterChats.endDate
            ? chat.createdAt &&
              new Date(chat.createdAt) <= new Date(filterChats.endDate)
            : true;

          return (
            matchesSellerName &&
            matchesBuyerName &&
            matchesMessageContent &&
            matchesStartDate &&
            matchesEndDate
          );
        });

        setChats(filteredChats);
        resolve(filteredChats);
      }, 1000);
    });
  };

  const getChat = async (id: string): Promise<TChat | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chat = chats.find((item) => item.id === id);
        resolve(chat);
      }, 500);
    });
  };

  const updateChat = async (chat: TChat): Promise<TChat | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chatRegistered = chats.find((item) => item.id === chat.id);
        if (!chatRegistered) {
          resolve(undefined);
          return;
        }

        setChats((prev) =>
          prev.map((item) => (item.id === chat.id ? chat : item)),
        );

        resolve(chat);
      }, 1000);
    });
  };

  const deleteChat = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const chatRegistered = chats.find((item) => item.id === id);
        if (!chatRegistered) {
          resolve(false);
          return;
        }

        setChats((prev) => prev.filter((item) => item.id !== id));
        resolve(true);
      }, 1000);
    });
  };

  return (
    <ContextChats.Provider
      value={{
        chats,
        setChats,
        isLoading,
        setIsLoading,
        filterChats,
        setFilterChats,
        createChat,
        searchChats,
        getChat,
        updateChat,
        deleteChat,
      }}
    >
      {children}
    </ContextChats.Provider>
  );
}
