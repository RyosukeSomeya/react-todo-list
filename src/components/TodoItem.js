import { ListItem, Text, Flex, Button, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

// TodoItemコンポーネント
export const TodoItem = ({
  todo,
  toggleTodoListItemStatus,
  deleteTodoListItem,
}) => {
  // Todoの状態（完了/未完了）を反転させる toggleTodoListItemStatus関数を実行する関数
  const handleToggleTodoListItemStatus = () =>
    toggleTodoListItemStatus(todo.id, todo.done);

  // Todoを削除するdeleteTodoListItemを実行する
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  const label = todo.done ? '未完了リストへ' : '完了リストへ';
  const setColorScheme = todo.done ? 'pink' : 'bule';
  return (
    <ListItem
      borderWidth="1px"
      p="4"
      mt="4"
      bg="white"
      borderRadius="md"
      borderColor="gray.300"
    >
      <Text mb="6">{todo.content}</Text>
      <Flex align="center" justify="flex-end">
        <Button
          colorScheme={setColorScheme}
          variant="outline"
          size="sm"
          onClick={handleToggleTodoListItemStatus}
        >
          {label}
        </Button>
        <IconButton
          icon={<DeleteIcon />}
          variant="unstyled"
          aria-label="delete"
          onClick={handleDeleteTodoListItem}
        />
      </Flex>
    </ListItem>
  );
};
