import time
import openpyxl
import os
import os.path

class ExcellExportData(object):
   

    def __init__(self):
        pass;
        
    def readExcell(self,pathFile):
        workbook = openpyxl.load_workbook(filename = pathFile, use_iterators = True);
        