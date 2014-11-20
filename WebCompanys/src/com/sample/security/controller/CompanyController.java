package com.sample.security.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "/company")
public class CompanyController {
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView();
		  model.addObject("title", "Spring Security Login Form - Database Authentication");
		  model.addObject("message", "This page is for ROLE_ADMIN only!");
		  model.setViewName("company/index");
		  
		  
		  
		  return model;
	 
		}
	
	@RequestMapping(value = "/create", method = RequestMethod.GET)
	public String create(@RequestParam Map<String,String> requestParams) {
	
		 System.out.println("test");
		  
		  
		  return "test";
	 
		}
}
