package com.jobsmatcher.company.dao.impl;


import java.util.ArrayList;
import java.util.List;
 




import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jobsmatcher.company.dao.UserDao;
import com.jobsmatcher.company.model.Users;


@Repository
public class UserDaoImpl implements UserDao {
	
	 
	private SessionFactory sessionFactory;
	
	@Autowired
    public void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }
	
	private Session openSession() {
        return sessionFactory.getCurrentSession();
    }
	
	@Override
	@SuppressWarnings("unchecked")
	public Users findByUserName(String username) {
		List<Users> users = new ArrayList<Users>();
		 
		
		 
        Query query = openSession().createQuery("from User u where u.username = :username");
        query.setParameter("username", username);
        users = query.list();
        
        if (users.size() > 0)
            return users.get(0);
        else
            return null;
        
 
	}
	
	

}
