package com.data.services;

import com.data.model.dto.response.ContactDTO;
import com.data.model.entity.Contact;

import java.util.List;

public interface ContactService {
    public List<Contact> getContacts();
    public List<Contact> getBlockedContacts();
    public Contact getContact(Long id);
    public Contact addContact(ContactDTO contact);
    public Contact toggleBlockContact(Long id);
    public Contact updateContact(Long id, ContactDTO contact);
    public void deleteContact(Long id);
}
