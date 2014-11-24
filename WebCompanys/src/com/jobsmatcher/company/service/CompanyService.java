package com.jobsmatcher.company.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jobsmatcher.company.dao.CompanyDao;

@Component
public class CompanyService {
	
	@Autowired
	private CompanyDao companyDao;
	
}
