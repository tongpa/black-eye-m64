package com.jobsmatcher.company.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.jobsmatcher.company.model.Company;
import com.jobsmatcher.company.model.Student;

@Controller
public class MainController {
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView();
		   
		  model.setViewName("company/index");
		  
		 // model.setViewName("company/sample");
		  System.out.println("load");
		  return model;
	 
		}
	
	
}
