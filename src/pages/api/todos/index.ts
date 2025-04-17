import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiSuccessResponse, ApiErrorResponse, Todo } from '@/services/api';
import { TodoDB } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Todo | Todo[]> | ApiErrorResponse>
) {
  switch (req.method) {
    case 'GET':
      return handleGetTodos(req, res);
    case 'POST':
      return handleCreateTodo(req, res);
    default:
      return res.status(405).json({
        status: 'error',
        message: 'Method not allowed'
      });
  }
}

// GET /api/todos - List todos with optional filtering, sorting, and search
function handleGetTodos(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Todo[]> | ApiErrorResponse>
) {
  try {
    const { status, sort, search } = req.query;
    
    const queryParams = {
      status: typeof status === 'string' ? status : undefined,
      sort: typeof sort === 'string' ? sort : undefined,
      search: typeof search === 'string' ? search : undefined
    };

    const todos = TodoDB.getAll(queryParams);

    return res.status(200).json({
      status: 'success',
      data: todos
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return res.status(500).json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Internal Server Error'
    });
  }
}

// POST /api/todos - Create a new todo
function handleCreateTodo(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Todo> | ApiErrorResponse>
) {
  try {
    const { title } = req.body;

    // Validate title
    if (!title || typeof title !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo data',
        error: {
          title: ['Title is required']
        }
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo data',
        error: {
          title: ['Title must be between 3 and 100 characters']
        }
      });
    }

    if (title.length > 100) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo data',
        error: {
          title: ['Title must be between 3 and 100 characters']
        }
      });
    }

    // Check for HTML/script tags (basic validation)
    if (/<[^>]*>/.test(title)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo data',
        error: {
          title: ['Title contains invalid characters']
        }
      });
    }

    try {
      const newTodo = TodoDB.create(title);
      return res.status(201).json({
        status: 'success',
        data: newTodo
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'Todo with this title already exists') {
        return res.status(409).json({
          status: 'error',
          message: error.message
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error creating todo:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
} 