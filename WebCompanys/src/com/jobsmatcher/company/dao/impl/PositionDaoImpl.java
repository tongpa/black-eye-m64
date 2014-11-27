package com.jobsmatcher.company.dao.impl;



import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
 








import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jobsmatcher.company.dao.PositionDao;  
import com.jobsmatcher.company.model.Position;
import com.jobsmatcher.company.utility.Util;
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

	@Override
	@Transactional(readOnly=true)
	@SuppressWarnings("unchecked")
	public List<Position> getPositionByCompany(String id) {
		List<Position> users = new ArrayList<Position>();
		//System.out.println("company id :" + id); 
		
		String sql = "from Position where id_company_data = " + id;
		users = getCurrentSession()
			.createQuery(sql)
			//.setParameter(0, id)
			.list();
 	
		 return users;
	}

	@Override
	public void deleteById(Position id) {
		StringBuffer sb = new StringBuffer();
		sb.append("delete from job_position where id_position = ").append(id.getId_position());
		
		int v = getCurrentSession().createSQLQuery(sb.toString()).executeUpdate(); 
		//System.out.println(v); 
		 
		//System.out.println("Delete Positon");
	}

	@Override
	@Transactional
	public boolean updatePosition(Position position) {
		//System.out.println("update company");
		
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	   
		
		StringBuffer sb = new StringBuffer();
		sb.append("update job_position set ");
		sb.append("position = '" ).append( position.getPosition()  ).append( "'"  ).append( " , ");
		sb.append("basic_qualification = '"  ).append( position.getBasic_qualification() ).append( "'").append( " , ");
		sb.append("personal_characters = '"  ).append( position.getPersonal_characters() ).append( "'").append( " , ");
		sb.append("job_popose = '"  ).append( position.getJob_popose()   ).append( "'").append( " , ");
		sb.append("job_description = '"  ).append( position.getJob_description()).append( "'").append( " , ");
		sb.append("experience = '"  ).append( position.getExperience()  ).append( "'").append( " , ");
		sb.append("post_date = '"  ).append( df.format(position.getPost_date())       ).append( "'");
		 
		 
		
		
		sb.append(" where id_position = '" + position.getId_position() + "'");
		
		int v = getCurrentSession().createSQLQuery(sb.toString()).executeUpdate(); 
		 //System.out.println(v);
		//getCurrentSession().update(newCom);
		 
		//System.out.println(serial);
		 sb = null;
		 df = null;
		return true;
	}

	 

	@Override
	public void deleteByCompany(int id) {
		StringBuffer sb = new StringBuffer();
		sb.append("delete from job_position where id_company_data = ").append(id );
		
		int v = getCurrentSession().createSQLQuery(sb.toString()).executeUpdate(); 
		//System.out.println(v); 
		 
		//System.out.println("Delete Positon");
	}
	
	

}
