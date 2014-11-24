package com.jobsmatcher.company.dao.impl;



import com.jobsmatcher.company.dao.PositionDao;
import com.jobsmatcher.company.model.Position;

public abstract class PositionDaoImpl extends AbstractDaoImpl<Position, String> implements
		PositionDao {

	protected PositionDaoImpl() {
        super(Position.class);
    }
	
	protected PositionDaoImpl(Class<Position> entityClass) {
		super(entityClass);
		// TODO Auto-generated constructor stub
	}
	
	

}
