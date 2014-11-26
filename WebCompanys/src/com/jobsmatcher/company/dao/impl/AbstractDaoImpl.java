package com.jobsmatcher.company.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jobsmatcher.company.dao.AbstractDao;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;
@Repository
@Transactional
public  abstract class AbstractDaoImpl<E, I extends Serializable> implements AbstractDao<E,I>  {
private Class<E> entityClass;
    
	 
 
    protected AbstractDaoImpl(SessionFactory sessionFactory, Class<E> entityClass) {
    	this.sessionFactory = sessionFactory;
        this.entityClass = entityClass;
    }
   
    protected AbstractDaoImpl(Class<E> entityClass) {
        this.entityClass = entityClass;
    }
    
    //@Autowired
    //  @Qualifier("sessionFactory")
    @Resource(name="sessionFactory")
    private SessionFactory sessionFactory; 
    
    public Session getCurrentSession() {
    	//return sessionFactory.openSession();
    	// return sessionFactory.getCurrentSession();
    	Session session = null;
        try { 
            session = sessionFactory.getCurrentSession();
            System.out.println("current session");
        } catch ( HibernateException he ) {
            session = sessionFactory.openSession();
            System.out.println("open session");
        }
        return session;
    }
    
    @SuppressWarnings("unchecked")
    @Override
    public E findById(I id) {
        return (E) getCurrentSession().get(entityClass, id);
    }
    
    @Override
    @Transactional(readOnly=false)
    public void saveOrUpdate(E e) {
        getCurrentSession().saveOrUpdate(e);
    }
 
    @Override
    @Transactional(readOnly=false)
    public void delete(E e) {
        getCurrentSession().delete(e);
    }
 
    @SuppressWarnings("unchecked")
	@Override
    public List<E> findByCriteria(Criterion criterion) {
        Criteria criteria = getCurrentSession().createCriteria(entityClass);
        criteria.add(criterion);
        return criteria.list();
    }
}
