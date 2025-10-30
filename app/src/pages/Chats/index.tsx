import { useChats } from '@/hooks/use-chats.hook';
import { IFilterChats } from '@/providers/Chats.provider';
import { Tab, Tabs } from '@heroui/tabs';
import { ListChats } from './components/list';
import { SearchChat } from './components/search';
import { TableChats } from './components/table';

export default function ChatsPage() {
  const {
    chats,
    searchChats,
    filterChats,
    setFilterChats,
    isLoading,
    setIsLoading,
    updateChat,
    deleteChat,
  } = useChats();

  console.log(chats);

  const handleDeleteChat = async (id: string) => {
    setIsLoading(true);
    await deleteChat(id);
    setIsLoading(false);
  };

  const handleFilterChat = async (filterChats: IFilterChats) => {
    setIsLoading(true);
    await searchChats(filterChats);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center gap-4">
      <div className="relative w-full flex flex-col">
        <Tabs aria-label="Options" color="secondary">
          <Tab title="Visualização em Tabela" key="table-view">
            <div className="w-full flex flex-col items-center">
              <TableChats
                topContent={
                  <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                    <div className="flex flex-col min-w-56">
                      <h1 className="text-xl font-semibold">Conversas</h1>
                      <p>
                        {chats.length === 1
                          ? `${chats.length} conversa encontrada`
                          : chats.length === 0
                            ? 'Nenhuma conversa encontrada'
                            : `${chats.length} conversas encontradas`}
                      </p>
                    </div>
                    <SearchChat
                      filterChats={filterChats}
                      setFilterChats={setFilterChats}
                      searchChats={handleFilterChat}
                    />
                  </div>
                }
                chats={chats}
                loadingState={isLoading}
                remove={handleDeleteChat}
              />
            </div>
          </Tab>
          <Tab title="Visualização em Lista" key="list-view">
            <div className="w-full flex flex-col items-center">
              <ListChats
                topContent={
                  <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                    <div className="flex flex-col min-w-56">
                      <h1 className="text-xl font-semibold">Conversas</h1>
                      <p>
                        {chats.length === 1
                          ? `${chats.length} conversa encontrada`
                          : chats.length === 0
                            ? 'Nenhuma conversa encontrada'
                            : `${chats.length} conversas encontradas`}
                      </p>
                    </div>
                    <SearchChat
                      filterChats={filterChats}
                      setFilterChats={setFilterChats}
                      searchChats={handleFilterChat}
                    />
                  </div>
                }
                chats={chats}
                loadingState={isLoading}
                remove={handleDeleteChat}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
