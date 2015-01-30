import os
import os.path
import base64 
import json 
import logging;
log = logging.getLogger(__name__); 
class Utility(object):
    
    def joinPathFileAndCreatePath(self,orig_path,subpath,filename):
         
        self.target_file_name = os.path.join(os.getcwd(), orig_path , subpath, filename);
        print self.target_file_name;
        self.createPathFile(self.target_file_name);        
        return self.target_file_name;
    
    def createPathFile(self,path):         
        if os.path.exists(path):
            return True;
        else:
            path = os.path.dirname(path);
            if(not self.createPathFile(path)):
                os.makedirs(path);
            return False;
    
    
    def createFileImageb64data(self,b64data,path):
        imgData = base64.b64decode(b64data) ;
        f = open(path, 'wb')
        f.write(imgData)
        f.close() 
        
        return self.checkFileExist(path);
        
    
    def checkPathFile(self,path):
        #print os.path.exists(path) ;
        print 'check'
        print os.path.exists(path)
        
        if not os.path.exists(path):
            os.makedirs(path)
             
        #print os.path.exists(path) ;
        
    def checkFileExist(self,pathFile):
        return os.path.isfile(pathFile) ;
    
    def readDataFile(self,pathFile ):
        
        file = open(pathFile,'rb');
        return file.read();
   
    
    def getDic(self):
        value =  dict(test= 'test1',
                    data = 'data1');
                    
        print value.get('test');
        print value['test'];
         

u = Utility();
#u.createPathFile('C:/Tem/upload/14/Data2.xlsx');  
#u.joinPathFileAndCreatePath('test','dddd','dddd');
#print u.checkPathFile('c:/temp/test1');
#print u.checkFileExist('C:/Tem/upload/14/Data2.xlsx');  
#u.checkFileExist('c:/temp/upload/Data2.xlsx');  
#u.getDic();
 
#print os.path.dirname('c:/temp/upload/Data2.xlsx');
 
        