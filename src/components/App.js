import { useRef } from 'react';
import { Container } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useTodo } from '../hooks/useTodo';
import { TodoAdd } from './TodoAdd';
import { TodoList } from './TodoList';
import { TodoTitle } from './TodoTitle';

function App() {
  const {
    todoList,
    addTodoListItem,
    toggleTodoListItemStatus,
    deleteTodoListItem,
  } = useTodo();

  const inputEl = useRef(null);

  // todo登録関数
  const handleAddTodoListItem = () => {
    if (inputEl.current.value === '') return;
    addTodoListItem(inputEl.current.value);
    inputEl.current.value = '';
  };

  console.log('TODOリスト: ', todoList);

  const inCompletedList = todoList.filter((todo) => {
    return !todo.done;
  });

  const completedList = todoList.filter((todo) => {
    return todo.done;
  });
  console.log('完了TODOリスト: ', completedList);
  console.log('未完了TODOリスト: ', inCompletedList);

  return (
    <Container centerContent p={{ base: '4', md: '6' }} maxWidth="3xl">
      <TodoTitle
        title="TODO進捗管理"
        as="h1"
        fontSize={{ base: '2xl', md: '3xl' }}
      />
      <TodoAdd
        placeholder="ADD TODO"
        leftIcon={<AddIcon />}
        buttonText="TODOを追加"
        inputEl={inputEl}
        handleAddTodoListItem={handleAddTodoListItem}
      />
      {/* <TodoTitle
        title="未完了TODOリスト"
        as="h2"
      /> */}
      <TodoList
        todoList={inCompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title="未完了TODOリスト"
        as="h2"
        fontSize={{ base: 'xl', md: '2xl' }}
      />

      {/* <TodoTitle title="完了TODOリスト" as="h2" /> */}
      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
        title="完了TODOリスト"
        as="h2"
        fontSize={{ base: 'xl', md: '2xl' }}
      />
    </Container>
  );
}

export default App;
