package com.restApiSQL;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.restApiSQL.Groups;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface GroupsRepository extends CrudRepository<Groups, Integer> {
	List<Groups> findByName(String name);
}