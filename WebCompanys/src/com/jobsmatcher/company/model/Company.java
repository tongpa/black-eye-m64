package com.jobsmatcher.company.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "company_data" )
public class Company {
	
	@Id
	@Column(name = "id_company_data", unique = true, nullable = false )	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id_company;
	
	@Column(name = "company_name")
	private String company_name;
	
	@Column(name = "business_type")
	private String business_type;
	
	@Column(name = "telephone")
	private String telephone;
	
	@Column(name = "mobile")
	private String mobile;
	
	@Column(name = "fax")
	private String fax;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "website")
	private String website;
	
	@Column(name = "personal_contact")
	private String personal_contact;
	
	@Column(name = "phone_contact")
	private String phone_contact;

	@Column(name = "house_no")
	private String house_no;
	
	@Column(name = "building")
	private String building;
	
	@Column(name = "moo")
	private String moo;
	
	@Column(name = "soi")
	private String soi;
	
	@Column(name = "road")
	private String road;
	
	@Column(name = "country")
	private String country;
	
	@Column(name = "province")
	private String province;
	
	@Column(name = "city")
	private String city;
	
	@Column(name = "county")
	private String county;
	
	@Column(name = "zip_code")
	private String zip_code;
	
	public Company() {}
	
	
	@Override
	public String toString() {
		return String.format("Company [company_name = %s, business_type = %s, id = %d]",
				company_name, business_type,id_company);
	}
	
	
	
	public int getId_company() {
		return id_company;
	}
	public void setId_company(int id_company) {
		this.id_company = id_company;
	}
	public String getCompany_name() {
		return company_name;
	}
	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}
	public String getBusiness_type() {
		return business_type;
	}
	public void setBusiness_type(String business_type) {
		this.business_type = business_type;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getPersonal_contact() {
		return personal_contact;
	}
	public void setPersonal_contact(String personal_contact) {
		this.personal_contact = personal_contact;
	}
	public String getPhone_contact() {
		return phone_contact;
	}
	public void setPhone_contact(String phone_contact) {
		this.phone_contact = phone_contact;
	}
	public String getHouse_no() {
		return house_no;
	}
	public void setHouse_no(String house_no) {
		this.house_no = house_no;
	}
	public String getBuilding() {
		return building;
	}
	public void setBuilding(String building) {
		this.building = building;
	}
	public String getMoo() {
		return moo;
	}
	public void setMoo(String moo) {
		this.moo = moo;
	}
	public String getSoi() {
		return soi;
	}
	public void setSoi(String soi) {
		this.soi = soi;
	}
	public String getRoad() {
		return road;
	}
	public void setRoad(String road) {
		this.road = road;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	public String getZip_code() {
		return zip_code;
	}
	public void setZip_code(String zip_code) {
		this.zip_code = zip_code;
	}
	
	
	
	
	
	
	
	
}
