package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;

import java.util.Set;

public interface UserService {

    //creating user
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;

    //get user by username
    public User getUser(String username);

    //to delete user by Id
    public void deleteUser(Long userId);

    //to update user data
    //public void updateUser(Long userId);
}
