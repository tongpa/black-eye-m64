package com.jobsmatcher.company.dao.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

 









import java.util.Map;

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
		//System.out.println("save company");
		 
		//Session session = getCurrentSession();
		 
		//Serializable serial = session.save(company);
		getCurrentSession().save(company); 
		////System.out.println(serial);
		return true;
	}

	@Override
	@Transactional(readOnly=true)
	@SuppressWarnings("unchecked")
	public List<Company> listCompanyByName(String name) {
		List<Company> users = new ArrayList<Company>();
	 
		 
		users = getCurrentSession()
			.createQuery("from Company where company_name like ?")
			.setParameter(0, "%"+name + "%")
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

	@Override
	@Transactional
	public boolean updateCompany(Company company) {
		//System.out.println("update company");
		
		
		 
		
		StringBuffer sb = new StringBuffer();
		sb.append("update company_data set ");
		sb.append("company_name = '" ).append(company.getCompany_name()  ).append( "'"  ).append( " , ");
		sb.append("business_type = '"  ).append(company.getBusiness_type()  ).append( "'").append( " , ");
		sb.append("house_no = '"  ).append(company.getHouse_no() ).append( "'").append( " , ");
		sb.append("moo = '"  ).append(company.getMoo()   ).append( "'").append( " , ");
		sb.append("road = '"  ).append(company.getRoad()  ).append( "'").append( " , ");
		sb.append("county = '"  ).append(company.getCounty()  ).append( "'").append( " , ");
		sb.append("city = '"  ).append(company.getCity()  ).append( "'").append( " , ");
		sb.append("province = '"  ).append(company.getProvince() ).append( "'").append( " , ");
		sb.append("country = '"  ).append(company.getCountry() ).append( "'").append( " , ");
		sb.append("telephone = '"  ).append(company.getTelephone() + "'").append( " , ");
		sb.append("fax = '"  ).append(company.getFax()  ).append( "'").append( " , ");
		sb.append("mobile = '"  ).append(company.getMobile() ).append( "'").append( " , ");
		sb.append("email = '"  ).append(company.getEmail()  ).append( "'").append( " , ");
		sb.append("website = '"  ).append(company.getWebsite()  ).append( "'").append( " , ");
		sb.append("personal_contact = '"  ).append(company.getPersonal_contact()  ).append( "'").append( " , ");
		sb.append("phone_contact = '"  ).append(company.getPhone_contact()  ).append( "'").append( " , ");
		sb.append("zip_code = '"  ).append(company.getZip_code()  ).append( "'").append( " , ");
		sb.append("building = '"  ).append(company.getBuilding()  ).append( "'").append( " , ");
		sb.append("soi = '"  ).append(company.getSoi() ).append( "'");
		
		
		sb.append(" where id_company_data = '" +company.getId_company()+ "'");
		
		int v = getCurrentSession().createSQLQuery(sb.toString()).executeUpdate(); 
		 //System.out.println(v);
		//getCurrentSession().update(newCom);
		 
		//System.out.println(serial);
		 sb = null;
		return true;
	}

	@Override
	public void deleteById(Company company) {
		StringBuffer sb = new StringBuffer();
		sb.append("delete from company_data where id_company_data = ").append(company.getId_company());
		
		int v = getCurrentSession().createSQLQuery(sb.toString()).executeUpdate(); 
		//System.out.println(v); 
		 
		//System.out.println("Delete Company");
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>> listTotalInDate() {
		StringBuffer sb = new StringBuffer();
		sb.append("select  DATE_FORMAT(create_date,'%d-%m-%Y') as date_string, count(create_date) as num from company_data ")
		.append(" GROUP BY DATE_FORMAT(create_date,'%d-%m-%Y') ") 
		.append(" ORDER BY create_date DESC limit 35 ");
 
		List<Object[]> results = getCurrentSession().createSQLQuery(sb.toString()).list();
		List<Map<String, String>>  data = new ArrayList<Map<String, String>> (); 
		for (Object[] arr  : results) {
			//System.out.println(Arrays.toString(arr));
			//System.out.println(arr[0] + " " + arr[1]);
			
			Map<String, String>  sa = new HashMap<String, String>();
			sa.put("date_string", String.valueOf(arr[0] ));
			sa.put("num",String.valueOf(arr[1]));
			data.add(sa);
			arr = null;
		} 
		results = null;
		sb = null;
		return data;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Map<String, String>>  getTotalComnany() {
		//select count(*) from company_data;
		
		StringBuffer sb = new StringBuffer();
		sb.append("select count(*) from company_data ");
		List<Object[]> results = getCurrentSession().createSQLQuery(sb.toString()).list(); 
		List<Map<String, String>>  data = new ArrayList<Map<String, String>> (); 
	 
		Map<String, String>  sa = new HashMap<String, String>();
		sa.put("num", String.valueOf( results.get(0) ));
		data.add(sa);
		
		results = null;
		sb = null;
		return data;
	}

}
