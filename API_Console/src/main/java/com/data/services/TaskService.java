package com.data.services;

import com.data.model.dto.response.TaskDTO;
import com.data.model.entity.Task;

import java.util.List;

public interface TaskService {
    public List<Task> findAll();
    public Task addTask(TaskDTO task);
    public Task updateTask(Long id, TaskDTO task);
    public void deleteTask(Long id);
}
