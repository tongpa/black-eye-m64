package com.jobsmatcher.company.dao;

import com.jobsmatcher.company.model.Users;

public interface UserDao {
	Users findByUserName(String username);
}
