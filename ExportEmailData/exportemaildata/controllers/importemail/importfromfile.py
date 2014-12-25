#!/usr/bin/python

import threading
import time
import openpyxl
from tg.configuration import AppConfig, config
from exportemaildata import model
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import update
exitFlag = 0

__all__ = ['importDataThread']
class importDataThread(threading.Thread):
    
    def __init__(self, threadID,   pathFile):
        threading.Thread.__init__(self)
        self.threadID = threadID
        #self.model = model
        self.pathFile = pathFile
        
        self.some_engine = create_engine(config['sqlalchemy.url'] );
        
        # create a configured "Session" class
        self.Session = sessionmaker(bind=self.some_engine)
        
        # create a Session
        self.session = self.Session();
        
        
        
    def run(self):
        print "Starting " + self.threadID
        
        #step : 1 importData
        exportEmail = self.importData(self.threadID ,self.pathFile); 
        #step : 2 checkData Same Old Email
        #exportEmail = model.ExportEmail.getId(5);
        self.checkEmailDuplicate(exportEmail);
        
        print "Exiting " + self.threadID
       
     
        
    def importData(self,threadName,   pathFile):
        print "start : " + threadName;
        workbook = openpyxl.load_workbook(filename = pathFile, use_iterators = True)
        worksheets = workbook.get_sheet_names()
        worksheet = workbook.get_sheet_by_name('Sheet13')    
        print str(worksheet.calculate_dimension());
        
        self.email = {};
        self.pid = {};
        self.email_empty=[];
        self.same_email = [];
        self.same_pid = [];
        self.used_email = [];
        
        
        path = r'C:\temp\demo.xlsx';
        
        # an Engine, which the Session will use for connection
        # resources
        
        
        # work with sess
         
        exportEmail = model.ExportEmail();
        
        exportEmail.file_name = "data1";
        exportEmail.path_file = "ddddd.exls";
        exportEmail.error_path_file = path;

        exportEmail.total_row = 0;
        exportEmail.insert_row = 0;
        exportEmail.error_row = 0;
        
        exportEmail.same_old_row = 0;
        exportEmail.insert_real_row = 0;
        
        self.session.add(exportEmail);
        self.session.flush() ;
        self.session.commit();
        
        total = 0;
        
        for row in worksheet.iter_rows():
            total = total +1;
            emaildata = model.EmailData();
            emaildata.prefix =  row[0].value;
            emaildata.id_export_email = exportEmail.id_export_email;
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
            emaildata.email=   row[21].value.lower();
            emaildata.housing_type=   row[22].value;
            emaildata.category=   row[23].value;
            emaildata.salary=  row[24].value;
            emaildata.education=   row[25].value;
            
            #check email is not empty
            if(emaildata.email is not None or str(emaildata.email).strip() != ''  ):
                #check email is same
                if (self.email.get(emaildata.email) is None) :
                    self.email[emaildata.email] = emaildata;
                     
                else:
                    self.same_email.append(emaildata);
            else:
                self.email_empty.append(emaildata);
                
                
            
            
                 
        
        print "same email before " + str( len(self.same_email));
        print "used email before " + str( len(self.email));
        #remove same email
        for email in self.same_email:
            sameemail = self.email.get(email.email);
            print "same email : " + email.email;
            if(sameemail):
                del self.email[email.email];
                self.same_email.append(sameemail);     
             
        
        
        row =1000;
        count = 0;
        print "start insert";
        for key_email in self.email:
            useEmail = self.email[key_email];
            try:
                self.session.add(useEmail);
                self.session.flush() ;
                
                if(count % row == 0):
                    self.session.commit();
                    print "commit ";
                    
            except Exception as e:
                print "---error---";
                print "email :" + useEmail.email;
                print e;
            
            count = count + 1;
            
            
        
        
            #model.DBSession.add(useEmail); 
            #model.DBSession.flush() ;
        """    break;
            #except :
                print "----error----------";
                print useEmail.email;
                print useEmail.birthdate;
                print "--------------";
                break;
           """ 
           
        exportEmail.total_row = total;
        exportEmail.insert_row = count;
        exportEmail.error_row = total- count;
        
        self.session.commit();
        
        print "used email " + str( len(self.email));
        print "same email " + str( len(self.same_email));
        print "same ipd   " + str( len(self.same_pid));
        
        
        
        workbook = openpyxl.Workbook();
        
        sheet = workbook.get_active_sheet();
        workbook.remove_sheet(sheet);
        
        if(len(self.same_email) >0):
            self.writeToExcel(workbook,self.same_email,path,'same email');
        
        if(len(self.same_pid) >0):
            self.writeToExcel(workbook,self.same_pid,path,'same pid');
        
        if(len(self.email_empty) > 0):
            self.writeToExcel(workbook,self.email_empty,path,'email empty');
            
        return exportEmail;
            
        #workbook.save(path);
    
    def writeToExcel(self,workbook,data,fileName,sheedName):
        
        #wb = openpyxl.Workbook();
        
        wb = workbook;
        
        #sheet = wb.get_active_sheet()
        sheet = wb.create_sheet()
        sheet.title = sheedName;
        
    
        
        i =1;
        for v in data:
            cell_C1 = sheet.cell( row=i, column=1 );
            cell_C1.value = v.prefix;
            
            cell_C2 = sheet.cell( row=i, column=2 );
            cell_C2.value = v.firstname_thai;
    
            cell_C3 = sheet.cell( row=i, column=3 );
            cell_C3.value = v.lastname_thai;
            
            cell_C4 = sheet.cell( row=i, column=4 );
            cell_C4.value = v.firstname_eng;
    
            cell_C5 = sheet.cell( row=i, column=5 );
            cell_C5.value = v.lastname_eng;
    
            cell_C6 = sheet.cell( row=i, column=6 );
            cell_C6.value = v.lastname_eng;
    
            cell_C7 = sheet.cell( row=i, column=7 );
            cell_C7.value = v.sex;
            
            cell_C8 = sheet.cell( row=i, column=8 );
            cell_C8.value = v.birthdate;
    
            cell_C9 = sheet.cell( row=i, column=9 );
            cell_C9.value = v. pid;
            
            cell_C10 = sheet.cell( row=i, column=10 );
            cell_C10.value = v.passport;
            
            cell_C11 = sheet.cell( row=i, column=11 );
            cell_C11.value = v.countryname;
            
            cell_C12 = sheet.cell( row=i, column=12 );
            cell_C12.value = v.house_no;
            
            cell_C13 = sheet.cell( row=i, column=13 );
            cell_C13.value = v.building_village;
            
            cell_C14 = sheet.cell( row=i, column=14 );
            cell_C14.value = v.moo;
    
            cell_C15 = sheet.cell( row=i, column=15 );
            cell_C15.value = v.soi;
    
            cell_C16 = sheet.cell( row=i, column=16 );
            cell_C16.value = v.road;
    
            cell_C17 = sheet.cell( row=i, column=17 );
            cell_C17.value = v.county;
    
            cell_C18 = sheet.cell( row=i, column=18 );
            cell_C18.value = v.city;
    
            cell_C19 = sheet.cell( row=i, column=19 );
            cell_C19.value = v.province;
    
            cell_C20 = sheet.cell( row=i, column=20 );
            cell_C20.value = v.postcode;
    
            cell_C21 = sheet.cell( row=i, column=21 );
            cell_C21.value = v.mobile;
   
            cell_C22 = sheet.cell( row=i, column=22 );
            cell_C22.value = v.telephone;
    
            cell_C23 = sheet.cell( row=i, column=23 );
            cell_C23.value = v.email;
    
            cell_C24 = sheet.cell( row=i, column=24 );
            cell_C24.value = v.housing_type;
    
            cell_C25 = sheet.cell( row=i, column=25 );
            cell_C25.value = v.category;
    
            cell_C26 = sheet.cell( row=i, column=26 );
            cell_C26.value = v.salary;
    
            cell_C27 = sheet.cell( row=i, column=27 );
            cell_C27.value = v.education;
            
            i = i +1;
            
        
        
       
        
        wb.save(fileName);
        
    def checkEmailDuplicate(self,exportEmail):
        #check duplicate
        self.dupEmail =  model.EmailData.checkDuplicateEmail();
        #check not duplicate
        self.noDupEmail =  model.EmailData.checkNotDuplicateEmail();
        
        path = r'C:\temp\demo.xlsx';
        print len(self.dupEmail);
        
        #update value
        idexport = exportEmail.id_export_email;
        
       
        #update value
        u = update(model.ExportEmail).where( model.ExportEmail.id_export_email==idexport).\
        values(same_old_row= len(self.dupEmail),insert_real_row= len(self.noDupEmail) )

        self.session.execute(u)
        self.session.flush() ;
        self.session.commit();
        
        
        #export file
        if(len(self.dupEmail) > 0):
            workbook = openpyxl.load_workbook(filename = exportEmail.error_path_file,  use_iterators = False);
            self.writeToExcel(workbook,self.dupEmail,path,'email same old');
        
        
        #insert to data temp
        for emailData in self.noDupEmail:
            emailTemp = model.EmailTemp();
            emailTemp.copyData(emailData);    
            self.session.add(emailTemp);
            self.session.flush() ;
            emailTemp = None;
        
        print "insert success";    
        self.session.commit();
        print "insert commit";  
        
         
        
        
        