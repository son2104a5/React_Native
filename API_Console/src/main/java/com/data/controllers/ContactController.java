package com.data.controllers;

import com.data.model.dto.response.APIResponse;
import com.data.model.dto.response.ContactDTO;
import com.data.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/contacts")
public class ContactController {
    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<?> getAllContacts() {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("All contacts")
                .data(contactService.getContacts())
                .build());
    }

    @GetMapping("/blocked")
    public ResponseEntity<?> getBlockedContacts() {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("Blocked contacts")
                .data(contactService.getBlockedContacts())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContact(@PathVariable Long id) {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("Contact with id " + id)
                .data(contactService.getContact(id))
                .build());
    }

    @PostMapping
    public ResponseEntity<?> addContact(@RequestBody ContactDTO contact) {
        return ResponseEntity.ok(APIResponse.builder()
                .success(true)
                .message("Added contact")
                .data(contactService.addContact(contact))
                .build());
    }


}
