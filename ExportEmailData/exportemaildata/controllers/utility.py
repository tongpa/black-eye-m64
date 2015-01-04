import os
import os.path

class Utility(object):

    def checkPathFile(self,path):
        #print os.path.exists(path) ;
         
        
        
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

print u.checkPathFile('c:/temp/test1');
print u.checkFileExist('C:/Temp/upload/14/Data2.xlsx');  
u.checkFileExist('c:/temp/upload/Data2.xlsx');  
u.getDic();
 
print os.path.dirname('c:/temp/upload/Data2.xlsx');
 
        