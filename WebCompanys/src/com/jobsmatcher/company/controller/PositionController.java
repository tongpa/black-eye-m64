package com.jobsmatcher.company.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
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
 

import com.jobsmatcher.company.model.Company;
import com.jobsmatcher.company.model.Position;
import com.jobsmatcher.company.utility.Util;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@Controller
@RequestMapping(value = "jobs")
public class PositionController {
	
	private Util util = new Util(); ;
	
	@Autowired
	private PositionDao positionDao;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView index() {
		ModelAndView model = new ModelAndView( );
		  model.addObject("title", "Spring Security Login Form - Database Authentication");
		  model.addObject("message", "This page is for ROLE_ADMIN only!");
		  model.setViewName("position/index");
		   
		  //System.out.println("load");
		  return model;
	 
		}
	
	@RequestMapping(value = "search", method = RequestMethod.POST)
	@ResponseBody
    public Map<String, Object> search( @RequestParam(value = "keysearch", required=true ) Integer keysearch,HttpServletRequest request, HttpServletResponse response,HttpSession sec) {
		Map<String, Object> books = new HashMap<String, Object>();
		List<Position> listposition = new ArrayList<Position>();
		
		
		
		
		listposition = positionDao.getPositionByCompany( keysearch.toString() );
		books.put("company", listposition);
		/* 
		keysearch = keysearch.trim(); 
		
		if(keysearch.length() > 0){
			  
			listposition = positionDao.getPositionByCompany( keysearch  );
		 	books.put("company", listposition);
		}
		
	
		
		 */
	 	books.put("total", listposition.size());
		return books;
    }
	 
	@RequestMapping(value = "addJobs", method = RequestMethod.POST)
	public @ResponseBody Map<String, Comparable> addJobs(@RequestBody Position position, HttpSession sec) {
		Map<String, Comparable> response = new HashMap<String, Comparable>();
		try {
			
			 
			if(position.getId_position() ==0){
				
				
				 
				position.setPost_date(util.convertDate(position.getPost_date()));
				 
  
				
				positionDao.saveOrUpdate(position);
				 
			}
			else{
				
				positionDao.updatePosition(position);
			}
	        response.put("success", true);
	        response.put("msg", "Welcome tong"  );
	    } catch(Exception e) {
	        response.put("success", false);
	        response.put("msg", e.getMessage());
	    }
		return response;
 
		}
	
	
	@RequestMapping(value = "delJobs", method = RequestMethod.POST)
	public @ResponseBody Map<String, Comparable> delJobs(@RequestBody Position position,HttpSession sec){
		Map<String, Comparable> responses = new HashMap<String, Comparable>();
		
		//System.out.println(position.getId_position());
//		System.out.println(id_position);
		try {
	         
			positionDao.deleteById(position);
	         responses.put("success", true);
	         responses.put("msg", "Welcome tong"  );
	        } catch(Exception e) {
	         responses.put("success", false);
	         responses.put("msg", e.getMessage());
	        }
//		
		return responses;
	}
	
	
}
