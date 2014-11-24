package com.jobsmatcher.company.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "job_position" )
public class Position {
	
	@Id
	@Column(name = "id_position", unique = true, nullable = false )	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_position;
	
	@Column(name = "position")
	private String position;
		
	@Column(name = "basic_qualification")
	private String basic_qualification;
	
	@Column(name = "personal_characters")
	private String personal_characters;
	
	@Column(name = "job_popose")
	private String job_popose;
	
	@Column(name = "job_description")
	private String job_description;
	
	@Column(name = "experience")
	private String experience;
	
	@Column(name = "post_date")
	private String post_date;
	
	@Column(name = "id_company_data")
	private int id_company_data;
	
	@Column(name = "create_date")
	private String create_date;
	
	 
	
	@Override
	public String toString() {
		return String.format("Company [position = %s, id_company_data = %i]",
				position, id_company_data);
	}
	
	
	public int getId_position() {
		return id_position;
	}
	public void setId_position(int id_position) {
		this.id_position = id_position;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getBasic_qualification() {
		return basic_qualification;
	}
	public void setBasic_qualification(String basic_qualification) {
		this.basic_qualification = basic_qualification;
	}
	public String getPersonal_characters() {
		return personal_characters;
	}
	public void setPersonal_characters(String personal_characters) {
		this.personal_characters = personal_characters;
	}
	public String getJob_popose() {
		return job_popose;
	}
	public void setJob_popose(String job_popose) {
		this.job_popose = job_popose;
	}
	public String getJob_description() {
		return job_description;
	}
	public void setJob_description(String job_description) {
		this.job_description = job_description;
	}
	public String getExperience() {
		return experience;
	}
	public void setExperience(String experience) {
		this.experience = experience;
	}
	public String getPost_date() {
		return post_date;
	}
	public void setPost_date(String post_date) {
		this.post_date = post_date;
	}
	public int getId_company_data() {
		return id_company_data;
	}
	public void setId_company_data(int id_company_data) {
		this.id_company_data = id_company_data;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	} 
	
	
}
