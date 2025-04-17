import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiSuccessResponse, ApiErrorResponse } from '@/services/api';
import { TodoDB } from '@/lib/db';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiSuccessResponse<null> | ApiErrorResponse>
) {
  // Only allow DELETE method
  if (req.method !== 'DELETE') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed'
    });
  }

  try {
    const { ids } = req.body;

    // Validate IDs
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request: ids array is required'
      });
    }

    // Validate each ID is a string
    if (!ids.every(id => typeof id === 'string')) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request: ids must be an array of strings'
      });
    }

    try {
      TodoDB.bulkDelete(ids);
      return res.status(200).json({
        status: 'success',
        data: null
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Completed todos cannot be deleted') {
          return res.status(403).json({
            status: 'error',
            message: error.message
          });
        }
        if (error.message === 'No todos found to delete') {
          return res.status(404).json({
            status: 'error',
            message: error.message
          });
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error deleting todos:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
} 