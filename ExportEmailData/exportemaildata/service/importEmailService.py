from exportemaildata import model

from exportemaildata.controllers.utility import Utility
class ImportEmailService(object):
 
    utility = Utility();
    def __init__(self):
        '''
        Constructor
        '''
        
    def downloadFile(self,id,isOrigFile):
        exportEmail = model.ExportEmail.getId(id);
        
        if isOrigFile :
            data =  self.utility.readDataFile(exportEmail.path_file);
        else:
            data =  self.utility.readDataFile(exportEmail.error_path_file);
        
        return dict(content_type = 'application/ms-excel',
                    headers =  "attachment;filename=" + str(exportEmail.file_name),
                    dataFile =  data);
        