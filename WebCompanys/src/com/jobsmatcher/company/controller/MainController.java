package com.jobsmatcher.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jobsmatcher.company.dao.CompanyDao;
import com.jobsmatcher.company.model.Company;
import com.jobsmatcher.company.model.Student;

@Controller
public class MainController {
	
	@Autowired
	private CompanyDao companyDao;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView();
		   
		  model.setViewName("company/index");
		  
		 // model.setViewName("company/sample");
		  System.out.println("load");
		  return model;
	 
		}
	
	@RequestMapping(value = "sample", method = RequestMethod.GET)
	public ModelAndView sample() {
		ModelAndView model = new ModelAndView();
		   
		  model.setViewName("sample");
		  
		 // model.setViewName("company/sample");
		  System.out.println("load");
		  return model;
	 
		}
	
	
	@RequestMapping(value = "saveSample", method = RequestMethod.POST)
	public ModelAndView saveSample(@RequestParam(value = "keysearch", required=true,defaultValue= "") String keysearch,HttpServletRequest request, HttpServletResponse response,HttpSession sec) {
		ModelAndView model = new ModelAndView();
		   
		  model.setViewName("sample");
		  System.out.println(keysearch);
		  List<Company> listc = companyDao.listCompanyByName(  keysearch  );
		  
		  System.out.println("load : " + listc.size());
		  for(Company c : listc){
			  System.out.println(c);
		  }
		  return model;
	 
		}
	
}
