package com.bantak.hospital.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping("/setup")
public class SetupSanitariumController {
	
	@RequestMapping(value = "/setup", method = RequestMethod.GET)
	public ModelAndView defaultPage( ) {
		ModelAndView model = new ModelAndView();
		model.addObject("title", "Spring Security + Hibernate Example");
		model.addObject("message", "This is default page!");
		model.setViewName("hello");
		return model;
	}
}
