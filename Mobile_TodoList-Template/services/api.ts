// services/api.ts
const API_BASE_URL = 'http://localhost:8080/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TaskApiResponse {
  id: number;
  name: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'COMPLETED';
  description: string;
}

export interface TaskCreateRequest {
  name: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status?: 'PENDING' | 'COMPLETED';
  description: string;
}

export interface TaskUpdateRequest {
  name: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'COMPLETED';
  description: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get all tasks
  async getAllTasks(): Promise<TaskApiResponse[]> {
    const response = await this.request<TaskApiResponse[]>('/tasks');
    return response.data;
  }

  // Create a new task
  async createTask(task: TaskCreateRequest): Promise<TaskApiResponse> {
    const response = await this.request<TaskApiResponse>('/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    return response.data;
  }

  // Update a task
  async updateTask(id: number, task: TaskUpdateRequest): Promise<TaskApiResponse> {
    const response = await this.request<TaskApiResponse>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(task),
    });
    return response.data;
  }

  // Delete a task
  async deleteTask(id: number): Promise<void> {
    await this.request<void>(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
