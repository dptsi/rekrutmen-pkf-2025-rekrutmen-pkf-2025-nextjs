import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiSuccessResponse, ApiErrorResponse, Todo } from '@/services/api';
import { TodoDB } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Todo | null> | ApiErrorResponse>
) {
  const { id } = req.query;

  // Validate ID
  if (typeof id !== 'string') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid todo ID'
    });
  }

  // Handle different methods
  switch (req.method) {
    case 'GET':
      return handleGetTodo(req, res, id);
    case 'DELETE':
      return handleDeleteTodo(req, res, id);
    default:
      return res.status(405).json({
        status: 'error',
        message: 'Method not allowed'
      });
  }
}

// GET /api/todos/[id] - Get a single todo
function handleGetTodo(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Todo> | ApiErrorResponse>,
  id: string
) {
  try {
    const todo = TodoDB.getById(id);
    
    if (!todo) {
      return res.status(404).json({
        status: 'error',
        message: 'Todo not found'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: todo
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
}

// DELETE /api/todos/[id] - Delete a todo
function handleDeleteTodo(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<null> | ApiErrorResponse>,
  id: string
) {
  try {
    // Occasionally simulate a delay for testing loading states
    // Uncomment this for testing if needed
    // await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

    try {
      TodoDB.delete(id);
      return res.status(200).json({
        status: 'success',
        data: null
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Todo was already deleted') {
          return res.status(404).json({
            status: 'error',
            message: error.message
          });
        }
        if (error.message === 'Completed todos cannot be deleted') {
          return res.status(403).json({
            status: 'error',
            message: error.message
          });
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
} 