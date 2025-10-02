import ListContainer from './components/ListContainer.tsx';
import Useritem from './components/Useritem.tsx';
import useGetUsers from './hooks/useGetUsers.ts';
import AddEditForm from './components/AddEditForm.tsx';
import type { User } from './types/User.type.ts';
import useCreateEditUser from './hooks/useCreateEditUser.ts';

function App() {
  const { users, addUserToList, isLoading: isFetchingUsers } = useGetUsers();
  const { createUser, isLoading: isSubmitLoading } = useCreateEditUser();
  const handleOnSubmit = async (user: User) => {
    const newUser = await createUser({
      user: {
        ...user,
        created: new Date()
      }
    });

    if (newUser) {
      addUserToList(newUser.user);
    }

  };
  return (
    <div>
      <h1>Todo list</h1>
      <AddEditForm onSubmit={handleOnSubmit} loading={isSubmitLoading} />
      {isFetchingUsers && <p>Loading...</p>}
      {!isFetchingUsers && (

        <ListContainer>
          {users.map((user) => {
            return <Useritem key={user.id} user={user} />
          })}
        </ListContainer>
      )}
    </div>
  );
}

export default App
