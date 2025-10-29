package com.data.model.dto.response;

import com.data.model.enums.TaskPriority;
import com.data.model.enums.TaskStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskDTO {
    private String name;

    private TaskPriority priority;

    private TaskStatus status =  TaskStatus.PENDING;

    private String description;
}
