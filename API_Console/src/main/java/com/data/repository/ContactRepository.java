package com.data.repository;

import com.data.model.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
    Contact getContactById(Long id);

    List<Contact> findContactsByIsBlock(Boolean isBlock);
}
