package com.restApiSQL;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.restApiSQL.Contact;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ContactRepository extends CrudRepository<Contact, Integer> {
	List<Contact> findByName(String name);
	List<Contact> findByFirstname(String name);
}