#!/usr/bin/python

import threading
import time
import openpyxl
exitFlag = 0

__all__ = ['importDataThread']
class importDataThread(threading.Thread):
    
    def __init__(self, threadID, model, pathFile):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.model = model
        self.pathFile = pathFile
     
      
        
    def run(self):
        print "Starting " + self.threadID
        
        self.importData(self.threadID,self.model,self.pathFile); 
        print "Exiting " + self.threadID
       
     
        
    def importData(self,threadName, model, pathFile):
        print "start : " + threadName;
        workbook = openpyxl.load_workbook(filename = pathFile, use_iterators = True)
        worksheets = workbook.get_sheet_names()
        worksheet = workbook.get_sheet_by_name('Sheet13')    
        print str(worksheet.calculate_dimension());
        
        self.email = {};
        self.pid = {};
        self.same_email = [];
        self.same_pid = [];
        self.used_email = [];
        for row in worksheet.iter_rows():
            
            emaildata = model.EmailData();
            emaildata.prefix =  row[0].value;
            emaildata.firstname_thai =  row[1].value;
            emaildata.lastname_thai =  row[2].value;
            emaildata.firstname_eng =  row[3].value;
            emaildata.lastname_eng =  row[4].value;
           
            emaildata.sex =  row[5].value;
            emaildata.birthdate =  row[6].value;
    
            emaildata.pid =  row[7].value;
            emaildata.passport =  row[8].value;
            emaildata.countryname =  row[9].value;
            emaildata.house_no =  row[10].value;
            emaildata.building_village =  row[11].value;
            emaildata.moo =  row[12].value;
            emaildata.soi =  row[13].value;
            emaildata.road =  row[14].value;
            emaildata.county =  row[15].value;
            emaildata.city =   row[16].value;
            emaildata.province =   row[17].value;
            emaildata.postcode=  row[18].value;
            emaildata.mobile=  row[19].value;
            emaildata.telephone=   row[20].value;
            emaildata.email=   row[21].value;
            emaildata.housing_type=   row[22].value;
            emaildata.category=   row[23].value;
            emaildata.salary=  row[24].value;
            emaildata.education=   row[25].value;
            
            
            if (self.email.get(emaildata.email) is None) :
                #emaildata.save();
                if(self.pid.get(emaildata.pid) is None) :
                    #emaildata.save();
                    self.email[emaildata.email] = emaildata;
                    self.pid[emaildata.pid] = emaildata;
                    self.used_email.append(emaildata);
                else:
                    self.same_pid.append(emaildata);  
            else:
                self.same_email.append(emaildata);
                
                 
            
            
             
        
        print "used email " + str( len(self.used_email));
        print "same email " + str( len(self.same_email));
        print "same ipd   " + str( len(self.same_pid));