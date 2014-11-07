import java.net.URLDecoder;
import java.net.URLEncoder;

import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.memetix.mst.language.Language;
 

public class TranslateApp {
	public static void main(String[] args) throws Exception {
		
		try{
	    // Set your Windows Azure Marketplace client info - See http://msdn.microsoft.com/en-us/library/hh454950.aspx
	    Translates.setClientId("tran-jm-extra");
	    Translates.setClientSecret("EdD48XkdsJ6xwyrDwB4Esw7ULiOkP1VnvbuyGPm9ugw=");
	    
	    
	    //String tokenJson = Translates.getToken("tran-jm-extra", "EdD48XkdsJ6xwyrDwB4Esw7ULiOkP1VnvbuyGPm9ugw=");

	    //String access_token  = (String)((JSONObject)JSONValue.parse(tokenJson)).get("access_token");
	    
	    //access_token = URLDecoder.decode( access_token,"UTF-8");
	    
	    //String translatedText = Translate.execute("Bonjour le monde", Language.FRENCH, Language.ENGLISH);
	    String translatedText = Translates.execute("Hello", Language.ENGLISH, Language.THAI);

	    System.out.println(translatedText);
	    System.out.println(tokenJson);
	    System.out.println(access_token);
		}
		catch(Exception ex)
		{
			ex.getStackTrace();
		}
	  }
}
