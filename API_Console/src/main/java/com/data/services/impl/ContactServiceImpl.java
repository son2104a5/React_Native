package com.data.services.impl;

import com.data.model.dto.response.ContactDTO;
import com.data.model.entity.Contact;
import com.data.repository.ContactRepository;
import com.data.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {
    private final ContactRepository contactRepository;

    @Override
    public List<Contact> getContacts() {
        return contactRepository.findAll();
    }

    @Override
    public List<Contact> getBlockedContacts() {
        return contactRepository.findContactsByIsBlock(true);
    }

    @Override
    public Contact getContact(Long id) {
        return contactRepository.getContactById(id);
    }

    @Override
    public Contact addContact(ContactDTO contact) {
        Contact newContact = Contact.builder()
                .name(contact.getName())
                .tag(contact.getTag())
                .phone(contact.getPhone())
                .build();
        return contactRepository.save(newContact);
    }

    @Override
    public Contact toggleBlockContact(Long id) {
        Contact existContact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        existContact.setIsBlock(!existContact.getIsBlock());
        return contactRepository.save(existContact);
    }

    @Override
    public Contact updateContact(Long id, ContactDTO contact) {
        Contact existContact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        Contact updatedContact = Contact.builder()
                .id(existContact.getId())
                .name(contact.getName())
                .tag(contact.getTag())
                .phone(contact.getPhone())
                .isBlock(existContact.getIsBlock())
                .build();
        return contactRepository.save(updatedContact);
    }

    @Override
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
}
