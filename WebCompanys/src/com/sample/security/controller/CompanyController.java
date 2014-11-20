package com.sample.security.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.jobsmatcher.company.model.Student;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Controller
@RequestMapping(value = "/company")
public class CompanyController {
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView("student", "command", new Student());
		  model.addObject("title", "Spring Security Login Form - Database Authentication");
		  model.addObject("message", "This page is for ROLE_ADMIN only!");
		  model.setViewName("company/index");
		  
		  //model.setViewName("company/sample");
		  System.out.println("load");
		  return model;
	 
		}
	
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public String create(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
	
		 System.out.println("test");
		  
		  
		  return "test";
	 
		}
	
	@RequestMapping(value = "/addStudent", method = RequestMethod.POST)
	public String addStudent(HttpServletRequest request, HttpServletResponse response, ModelMap model) {
	  // public String addStudent(@ModelAttribute("SpringWeb")Student student,  ModelMap model) {
	      model.addAttribute("name", "test");
	      model.addAttribute("age", "test");
	      model.addAttribute("id", "test");
	      System.out.println("test");
	      return "company/result";
	   }
}
