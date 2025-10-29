// types.ts
export enum TaskPriority {
  High = "HIGH",
  Medium = "MEDIUM",
  Low = "LOW",
}

export enum TaskStatus {
  Pending = "PENDING",
  Completed = "COMPLETED",
}

export interface Task {
  id: number;
  name: string;
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
}

// Dùng cho Form
export interface TaskFormData {
  name: string;
  priority: TaskPriority;
  description: string;
}

// Helper functions to convert between API and UI formats
export const getPriorityDisplayText = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.High:
      return "Cao";
    case TaskPriority.Medium:
      return "Trung bình";
    case TaskPriority.Low:
      return "Thấp";
    default:
      return priority;
  }
};

export const getStatusDisplayText = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.Pending:
      return "Đang chờ";
    case TaskStatus.Completed:
      return "Hoàn thành";
    default:
      return status;
  }
};

export const getPriorityFromDisplayText = (displayText: string): TaskPriority => {
  switch (displayText) {
    case "Cao":
      return TaskPriority.High;
    case "Trung bình":
      return TaskPriority.Medium;
    case "Thấp":
      return TaskPriority.Low;
    default:
      return TaskPriority.Medium;
  }
};
