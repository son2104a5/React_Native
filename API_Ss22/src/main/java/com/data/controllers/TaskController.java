package com.data.controllers;

import com.data.model.dto.response.APIResponse;
import com.data.model.dto.response.TaskDTO;
import com.data.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tasks")
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("Successfully retrieved all tasks")
                .data(taskService.findAll())
                .build());
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody TaskDTO task) {
        return ResponseEntity.ok(APIResponse.builder()
                .message("Successfully created task")
                .success(true)
                .data(taskService.addTask(task))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody TaskDTO task) {
        return ResponseEntity.ok(APIResponse.builder()
                .message("Successfully updated task")
                .success(true)
                .data(taskService.updateTask(id, task))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
