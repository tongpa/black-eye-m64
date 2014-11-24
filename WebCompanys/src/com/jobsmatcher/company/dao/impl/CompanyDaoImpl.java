package com.jobsmatcher.company.dao.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

 







import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.jobsmatcher.company.dao.CompanyDao;
import com.jobsmatcher.company.model.Company;

@Repository
public class CompanyDaoImpl extends AbstractDaoImpl<Company, String> implements CompanyDao {
	
	
	protected CompanyDaoImpl() {
        super(Company.class);
    }
	
	protected CompanyDaoImpl(Class<Company> entityClass) {
		super(entityClass);
		// TODO Auto-generated constructor stub
	}

	//@Autowired
	//private SessionFactory sessionFactory;
	
	
	@Override
	@Transactional
	public boolean saveCompany(Company company) {
		// TODO Auto-generated method stub
		System.out.println("save company");
		 
		Session session = getCurrentSession();
		 
		Serializable serial = session.save(company);
		 
		//System.out.println(serial);
		return true;
	}

	@Override
	@Transactional(readOnly=true)
	@SuppressWarnings("unchecked")
	public List<Company> listCompanyByName(String name) {
		List<Company> users = new ArrayList<Company>();
		 
		users = getCurrentSession()
			.createQuery("from Company where company_name like ?")
			.setParameter(0, name)
			.list();
 
		 return users;
	}

	@Override
	public Company getCompanyById(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Company> findAll() {
		return   getCurrentSession().createQuery("from Company").list();
				//findByCriteria(Restrictions.like("company_name", "%%", MatchMode.START));
	}
	
	@Transactional(readOnly = false)
	@Override
	public Company findByName(String name) {
		
		 
		 
		 
		
		return (Company) findByCriteria(Restrictions.like("company_name", name, MatchMode.START)).get(0);
	}

}
