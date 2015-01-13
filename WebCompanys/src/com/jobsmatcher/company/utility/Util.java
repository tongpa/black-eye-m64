package com.jobsmatcher.company.utility;

 
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class Util {
	
	public  Date convertDate(Date d){
		Date c = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd",Locale.US);
		try{
			Calendar date = Calendar.getInstance();  
		    date.setTime(d);
		    date.add(Calendar.YEAR,543);  
		    c = sdf.parse(sdf.format(date.getTime()));
		     
		}
		catch(Exception ex){
			
		}
		
		return c;
	}
	
	
	public static void main(String[] argv){
		Date d = new Date();
		
		System.out.println(d);
		
		String testDate = "2014-11-27";
		try{ 
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd",Locale.US);
			Date date = formatter.parse(testDate);
			
			System.out.println(formatter.format( d)   );
			System.out.println(date);
			
			System.out.printf("%s %tB %<te, %<tY", "Due date:", date);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
	}
}
