package com.jobsmatcher.company.dao;

import com.jobsmatcher.company.model.User;

public interface UserDao {
	User findByUserName(String username);
}
