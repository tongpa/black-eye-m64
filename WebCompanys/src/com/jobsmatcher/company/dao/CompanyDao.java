package com.jobsmatcher.company.dao;

import java.util.List;
import java.util.Map;

import com.jobsmatcher.company.model.Company; 

public interface CompanyDao extends AbstractDao<Company, String> {
	public boolean saveCompany(Company company);
	public boolean updateCompany(Company company);
	
	
	public List<Company> listCompanyByName(String name);
	
	public Company getCompanyById(String id);
	public void deleteById(Company company);
	
	public List<Map<String, String>> listTotalInDate();
	
	public List<Map<String, String>>  getTotalComnany();
	
	
}
