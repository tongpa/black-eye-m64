from tg import expose, flash, require, url, lurl, request, redirect, tmpl_context
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from trackproblems import model
from trackproblems.controllers.secure import SecureController
from trackproblems.model import DBSession, metadata
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from trackproblems.lib.base import BaseController
from trackproblems.controllers.error import ErrorController
 
__all__ = ['TrackProblemController']


class TrackProblemController(BaseController):
    
    @expose('trackproblems.templates.track.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    
    @expose('json')
    def showFieldByPage(self, **kw):
        fields = [];
        idpage = kw.get('id');
        
        fieldOwner = model.FieldOwnerName.getByPageId(idpage);
        
        parent = {};
        for field in fieldOwner:
            print "-----field : " + str(field.id_field_owner_name);
            if(field.id_parent is not None):
                field.child = [];
                parent[field.id_field_owner_name] = field;
                print "---------------------- root : " + str(field.id_field_owner_name);
            else:
                temp_field = parent.get(field.id_field_owner_name);
                if(temp_field):
                    temp_field.child.append(field);
                    
                    print "add child : " + str(field.id_field_owner_name);
                
            
            
            fields.append(field.to_json_field());
        return dict(fields = fields);
    
    @expose('json')
    def showField(self,**kw):
        field = [];
        fields = [];
        field.append({'id':1 ,'seq':1,'field_label': 'Email','type': 'text', 'name' : 'email'   });
        field.append({'id':2 ,'seq':2,'field_label': 'Page','type': 'text', 'name' : 'page'   });
        field.append({'id':3 ,'seq':3,'field_label': 'Problem type','type': 'combobox', 'name' : 'problem_type'   });
        
        field.append({'id':4 ,'seq':4,'field_label': 'Score','type': 'score_image', 'name' : 'score_image'   });
        field.append({'id':5 ,'seq':5,'field_label': 'File','type': 'file', 'name' : 'problem_file'   });
        field.append({'id':6 ,'seq':6,'field_label': 'Detail','type': 'textarea', 'name' : 'detail'   });
        
        
        
        
        fields.append({'id': 1, 'field' : field});
        return dict(fields = fields);