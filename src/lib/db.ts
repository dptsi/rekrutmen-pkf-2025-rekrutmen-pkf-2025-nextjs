import { Todo } from '@/services/api';
import { v4 as uuidv4 } from 'uuid';

// In-memory database for todos
let todos: Todo[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    title: 'Learn React',
    status: 'done',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    title: 'Learn Next.js',
    status: 'pending',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Build a todo app',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'c2d8e912-68a3-4b21-9345-c8f76d3a1234',
    title: 'Learn TypeScript',
    status: 'done',
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'd3e9f023-79b4-5c32-0456-d9g87e4a2345',
    title: 'Test the application',
    status: 'pending',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
];

export const TodoDB = {
  getAll: ({ status, sort, search }: { status?: string; sort?: string; search?: string } = {}) => {
    let result = [...todos];

    // Filter by status
    if (status && ['pending', 'done'].includes(status)) {
      result = result.filter(todo => todo.status === status);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(todo => todo.title.toLowerCase().includes(searchLower));
    }

    // Apply sorting
    if (sort === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'reverse-alphabetical') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    } else if (sort === 'oldest') {
      result.sort((a, b) => new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime());
    } else {
      // Default sort by created_at (newest first)
      result.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
    }

    return result;
  },

  getById: (id: string) => {
    return todos.find(todo => todo.id === id);
  },

  create: (title: string) => {
    // Check if title already exists
    const titleExists = todos.some(todo => todo.title.toLowerCase() === title.toLowerCase());
    if (titleExists) {
      throw new Error('Todo with this title already exists');
    }

    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      status: 'pending',
      created_at: now,
      updated_at: now
    };

    todos.unshift(newTodo);
    return newTodo;
  },

  updateStatus: (id: string, status: 'pending' | 'done') => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    // Validate status
    if (status !== 'pending' && status !== 'done') {
      throw new Error('Status harus "pending" atau "done"');
    }

    todos[todoIndex] = {
      ...todos[todoIndex],
      status,
      updated_at: new Date().toISOString()
    };

    return todos[todoIndex];
  },

  delete: (id: string) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo was already deleted');
    }

    // Check if todo is completed
    if (todos[todoIndex].status === 'done') {
      throw new Error('Completed todos cannot be deleted');
    }

    const deleted = todos.splice(todoIndex, 1);
    return deleted[0];
  },

  bulkDelete: (ids: string[]) => {
    // Check if any of the todos are completed
    const completedTodos = todos.filter(todo => ids.includes(todo.id) && todo.status === 'done');
    if (completedTodos.length > 0) {
      throw new Error('Completed todos cannot be deleted');
    }

    // Find the todos to delete
    const todosToDelete = todos.filter(todo => ids.includes(todo.id));
    if (todosToDelete.length === 0) {
      throw new Error('No todos found to delete');
    }

    // Delete the todos
    todos = todos.filter(todo => !ids.includes(todo.id));
    return todosToDelete;
  }
}; 