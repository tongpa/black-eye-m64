package com.jobsmatcher.company.dao;

import java.util.List;

import com.jobsmatcher.company.model.Company;

public interface CompanyDao extends AbstractDao<Company, String> {
	public boolean saveCompany(Company company);
	
	public List<Company> listCompanyByName(String name);
	
	public Company getCompanyById(String id);
	
	
}
