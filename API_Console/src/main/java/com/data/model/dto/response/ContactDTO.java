package com.data.model.dto.response;

import com.data.model.enums.ContactTag;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactDTO {
    @NotBlank
    private String name;
    @NotBlank
    private String phone;
    @NotBlank
    private ContactTag tag;
}
