package com.restApiSQL;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.restApiSQL.UserEnt;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<UserEnt, String> {
	Optional<UserEnt> findById(String id);
	List<UserEnt> findByEmailAndPassword(String email, String password);
}