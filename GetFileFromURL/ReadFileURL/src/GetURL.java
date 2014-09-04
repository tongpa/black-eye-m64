import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader; 
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils; 
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;


public class GetURL {

	 
	String url = "http://www.bantakhospital.go.th/download/tong.rar";
	 
	String DestinationFolder = "c:/temp/";
	List<String> value ;
	
	public GetURL(){
		value = new ArrayList<String>();
		
		checkFile(url);
		System.out.println("------Finish---------");
		
	}
	
	public void DownloadFile(String urlFile){
		
		try{
			URL urlweb = new URL(urlFile); 
			String destfile = urlFile.substring(url.length());
			 
			
			File destination = new File(DestinationFolder+ destfile);
			 
			FileUtils.copyURLToFile(urlweb, destination);
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
	}
	
	
	public String checkFile(String url){
		
		try{
			
			
			
			
			URL oracle = new URL(url);
	        BufferedReader in = new BufferedReader(
	        new InputStreamReader(oracle.openStream()));

	        String inputLine;
	        while ((inputLine = in.readLine()) != null)
	        {
	        	//System.out.println(inputLine);
	        	Document doc = Jsoup.parse(inputLine);
	        	Element link = doc.select("a").first();
	        	
	        	if( link != null  ){
	        		String linkHref = link.attr("href");
	        		String linkText = link.text();
	        		
	        	//System.out.println(inputLine);
	        		if(   !("../").equalsIgnoreCase(linkHref) && linkHref.indexOf( "subversion") <0  ){
	        			if(linkHref.indexOf("/") >0){
	        				//System.out.println(url+linkHref);
	        				checkFile(url+linkHref);
	        			}
	        			else{
	        				System.out.println(url+linkHref);
	        				//value.add(url+linkHref);
	        				DownloadFile(url+linkHref);
	        			}
	        		}
	        	//System.out.println(linkHref);
	        	}
	        }
	            in.close();
			 
		}
		catch(Exception ex){
			ex.printStackTrace();
		}
		
		return "";
	}
	
	public static void main(String[] argv){
		GetURL g = new GetURL();
	}
}
