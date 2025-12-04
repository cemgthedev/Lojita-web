import { useUsers } from '@/hooks/use-users.hook';
import { IFilterUsers } from '@/providers/Users.provider';
import { SearchUser } from './components/search';
import { TableUsers } from './components/table';

export default function UsersPage() {
  const {
    users,
    searchUsers,
    filterUsers,
    setFilterUsers,
    isLoading,
    setIsLoading,
    deleteUser,
  } = useUsers();

  const handleDeleteUser = async (id: string) => {
    setIsLoading(true);
    await deleteUser(id);
    setIsLoading(false);
  };

  const handleFilterUser = async (filterUsers: IFilterUsers) => {
    setIsLoading(true);
    await searchUsers(filterUsers);
    setIsLoading(false);
  };

  return (
    <section className="flex flex-col items-center gap-4 p-6">
      <div className="relative w-full flex flex-col">
        <div className="w-full flex flex-col items-center">
          <TableUsers
            topContent={
              <div className="flex flex-col md:flex-row gap-4 justify-between md:items-end">
                <div className="flex flex-col min-w-56">
                  <h1 className="text-xl font-semibold">Usuários</h1>
                  <p>
                    {users.length === 0
                      ? 'Nenhum usuário encontrado'
                      : users.length === 1
                        ? `${users.length} usuário encontrado`
                        : `${users.length} usuários encontrados`}
                  </p>
                </div>
                <SearchUser
                  filterUsers={filterUsers}
                  setFilterUsers={setFilterUsers}
                  searchUsers={handleFilterUser}
                />
              </div>
            }
            users={users}
            loadingState={isLoading}
            remove={handleDeleteUser}
          />
        </div>
      </div>
    </section>
  );
}
