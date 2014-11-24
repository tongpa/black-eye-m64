package com.jobsmatcher.company.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.annotate.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
  

import com.jobsmatcher.company.dao.PositionDao;
 

import com.jobsmatcher.company.model.Position;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Controller
@RequestMapping(value = "job")
public class PositionController {
	
	@Autowired
	public PositionDao positionDao;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView( );
		  model.addObject("title", "Spring Security Login Form - Database Authentication");
		  model.addObject("message", "This page is for ROLE_ADMIN only!");
		  model.setViewName("position/index");
		  
		 // model.setViewName("company/sample");
		  System.out.println("load");
		  return model;
	 
		}
	
	@RequestMapping(value = "search", method = RequestMethod.GET)
	@ResponseBody
    public Map<String, Object> search() {
		//Map<String, List<Position>> books = new HashMap<String, List<Position>>();
		
		Map<String, Object> books = new HashMap<String, Object>();
		List<Position> listPosition = positionDao.findAll();
		
		books.put("company", listPosition);
		books.put("total", listPosition.size());
		//books.put("books", companyDao.listCompanyByName("%test%"));
		return books;
    }
	 
	
	@RequestMapping(value = "addPosition", method = RequestMethod.POST)
	public @ResponseBody Map<String, Comparable> addPosition(@RequestBody Position position, HttpSession sec){
		Map<String, Comparable> response = new HashMap<String, Comparable>();
		System.out.println(position);
		try {
	         
			//positionDao.saveOrUpdate(position);
	         response.put("success", true);
	         response.put("msg", "Welcome tong"  );
	        } catch(Exception e) {
	         response.put("success", false);
	         response.put("msg", e.getMessage());
	        }
		
		return response;
	}
	
	
}
