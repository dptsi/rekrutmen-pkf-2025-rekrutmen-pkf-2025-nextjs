import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiSuccessResponse, ApiErrorResponse, Todo } from '@/services/api';
import { TodoDB } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<Todo> | ApiErrorResponse>
) {
  // Only allow PATCH method
  if (req.method !== 'PATCH') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed'
    });
  }

  try {
    const { id } = req.query;
    const { status } = req.body;

    // Validate ID
    if (typeof id !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid todo ID'
      });
    }

    // Validate status
    if (!status || (status !== 'pending' && status !== 'done')) {
      return res.status(422).json({
        status: 'error',
        message: 'Status harus "pending" atau "done"'
      });
    }

    // Occasionally simulate a delay for testing loading states
    // Uncomment this for testing if needed
    // await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

    // Occasionally simulate a concurrent update error for testing
    // Uncomment this for testing if needed
    // if (Math.random() < 0.1) {
    //   return res.status(409).json({
    //     status: 'error',
    //     message: 'Todo status was updated by another client'
    //   });
    // }

    try {
      const updatedTodo = TodoDB.updateStatus(id, status);
      return res.status(200).json({
        status: 'success',
        data: updatedTodo
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Todo not found') {
          return res.status(404).json({
            status: 'error',
            message: 'Todo tidak ditemukan'
          });
        }
        if (error.message === 'Status harus "pending" atau "done"') {
          return res.status(422).json({
            status: 'error',
            message: error.message
          });
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error updating todo status:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
} 