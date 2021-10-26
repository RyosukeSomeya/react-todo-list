import { useState, useEffect } from 'react';
import { ulid } from 'ulid';

// src/apis/todos.jsで宣言してexportした関数を使用できるようにする
import * as todoData from '../apis/todos';

export const useTodo = () => {
  // 空の配列で初期化
  const [todoList, setTodoList] = useState([]);

  // データ取得
  useEffect(() => {
    todoData.getAllTodosData().then((todo) => {
      // 降順にするためreverse
      setTodoList([...todo].reverse());
    });
  }, []);

  // todoListItemのdoneの真偽値を反転させて更新する
  const toggleTodoListItemStatus = (id, done) => {
    // idからtodoを取得
    const todoItem = todoList.find((item) => item.id === id);
    // 現在のtodoListの中から、条件に一致した要素であるtodoItemの
    // doneの(完了/未完了)を反転させる
    const newTodoItem = { ...todoItem, done: !done };

    // updateTodoData()を利用して指定されたidのTodoを更新したら、
    // 続いてtodoListの状態も更新する
    // API側のデータを更新して、レスポンスから更新したtodoで状態を更新する
    todoData.updateTodoData(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) =>
        item.id !== updatedTodo.id ? item : updatedTodo
      );

      setTodoList(newTodoList);
    });
  };

  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false,
    };

    return todoData.addTodoData(newTodoItem).then((addTodo) => {
      setTodoList([addTodo, ...todoList]);
    });
  };

  const deleteTodoListItem = (id) => {
    todoData.deleteTodoData(id).then((deleteListItemId) => {
      const newTodoList = todoList.filter(
        (item) => item.id !== deleteListItemId
      );

      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
