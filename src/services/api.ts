import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_APP_BACKEND_URL || '/api';

const api = axios.create();

export interface Article {
  id: string;
  title: string;
  creator_name: string;
  comments_count: number;
}

export interface Comment {
  id: string;
  content: string;
  creator_name: string;
}

export interface Todo {
  id: string;
  title: string;
  status: 'pending' | 'done';
  created_at?: string;
  updated_at?: string;
}

export interface ApiSuccessResponse<T> {
  status: 'success';
  data: T;
}

export interface ApiErrorResponse {
  status: 'error';
  message: string;
  error?: any;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export const articleService = {
  getArticles: async (limit: number = 10, offset: number = 0): Promise<ApiResponse<Article[]>> => {
    try {
      const response = await api.get<ApiSuccessResponse<Article[]>>(`${BACKEND_URL}/articles`, {
        params: { limit, offset }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to fetch articles',
            error: error.response.data
          };
        } else if (error.request) {
          // The request was made but no response was received
          return { status: 'error', message: 'Network error' };
        }
      }
      // Something happened in setting up the request that triggered an Error
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  },

  getComments: async (articleId: string): Promise<ApiResponse<Comment[]>> => {
    try {
      const response = await api.get<ApiSuccessResponse<Comment[]>>(`${BACKEND_URL}/articles/${articleId}/comments`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to load comments',
            error: error.response.data
          };
        } else if (error.request) {
          return { status: 'error', message: 'Network error' };
        }
      }
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  }
};

export const todoService = {
  getTodos: async (params: { status?: string; sort?: string; search?: string } = {}): Promise<ApiResponse<Todo[]>> => {
    try {
      const response = await api.get<ApiSuccessResponse<Todo[]>>(`${BACKEND_URL}/todos`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to fetch todos',
            error: error.response.data
          };
        } else if (error.request) {
          return { status: 'error', message: 'Network error' };
        }
      }
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  },

  createTodo: async (title: string): Promise<ApiResponse<Todo>> => {
    try {
      // Create an axios request config that can be intercepted by Cypress
      const config = {
        url: `${BACKEND_URL}/todos`,
        method: 'post',
        data: { title }
      };
      
      // Make the request using axios instance
      const response = await api.request<ApiSuccessResponse<Todo>>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to create todo',
            error: error.response.data
          };
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Network error occurred:', error);
          return { status: 'error', message: 'Network error occurred' };
        }
      }
      // Something happened in setting up the request that triggered an Error
      console.error('Unexpected error:', error);
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  },

  updateTodoStatus: async (id: string, status: 'pending' | 'done'): Promise<ApiResponse<Todo>> => {
    try {
      const response = await api.patch<ApiSuccessResponse<Todo>>(`${BACKEND_URL}/todos/${id}/status`, { status });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to update todo status',
            error: error.response.data
          };
        } else if (error.request) {
          return { status: 'error', message: 'Network error' };
        }
      }
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  },

  deleteTodo: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete<ApiSuccessResponse<null>>(`${BACKEND_URL}/todos/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to delete todo',
            error: error.response.data
          };
        } else if (error.request) {
          return { status: 'error', message: 'Network error' };
        }
      }
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  },

  bulkDeleteTodos: async (ids: string[]): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete<ApiSuccessResponse<null>>(`${BACKEND_URL}/todos/bulk`, { data: { ids } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return { 
            status: 'error', 
            message: error.response.data?.message || 'Failed to delete todos',
            error: error.response.data
          };
        } else if (error.request) {
          return { status: 'error', message: 'Network error' };
        }
      }
      return { status: 'error', message: 'An unexpected error occurred' };
    }
  }
};