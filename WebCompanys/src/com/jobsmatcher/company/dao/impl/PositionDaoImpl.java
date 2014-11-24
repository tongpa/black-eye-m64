package com.jobsmatcher.company.dao.impl;



import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jobsmatcher.company.dao.PositionDao;
import com.jobsmatcher.company.model.Position;
@Repository
public  class PositionDaoImpl extends AbstractDaoImpl<Position, String> implements
		PositionDao {

	protected PositionDaoImpl() {
        super(Position.class);
    }
	
	protected PositionDaoImpl(Class<Position> entityClass) {
		super(entityClass);
		// TODO Auto-generated constructor stub
	}

	@SuppressWarnings("unchecked")
	@Transactional(readOnly=true)
	@Override
	public List<Position> findAll() {
		return (List<Position>) getCurrentSession().createQuery("from Position").list(); 
	}

	@Override
	public Position findByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
