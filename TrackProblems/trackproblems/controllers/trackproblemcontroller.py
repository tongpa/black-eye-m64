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

import urllib, json
 
__all__ = ['TrackProblemController']


class TrackProblemController(BaseController):
    
    @expose('trackproblems.templates.track.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    
    @expose('trackproblems.templates.track.sample_grid')
    def sample(self):
        """Handle the front-page."""
        return dict(page='index')
     
    @expose('json')
    def showFieldByPage(self, **kw):
        fields = [];
        idpage = kw.get('id');
        
        fieldOwner = model.FieldOwnerName.getByPageId(idpage);
        
        #print request.application_url ;
        
        parent = {};
        for field in fieldOwner:
            print "-----field : " + str(field.id_field_owner_name) + " ID_parent : " + str(field.id_parent);
            if(field.id_parent is not None):
                temp_field = parent.get(field.id_parent);
                if(temp_field):
                    print "add id : " + str(field.id_field_owner_name) + " in " + str(temp_field.id_field_owner_name);
                    
                    #option
                    if field.url_get_option :
                        print "get from url";
                    else:
                        print "get table";
                        options = field.options;
                        
                        if options :
                            field.select_options = [];
                            for option in options:
                                 
                                field.select_options.append(option.to_json());
                            
                    
                    temp_field.child.append(field.to_json_field());
            else:
                print "id " + str(field.id_field_owner_name) + " is Root";
                field.child = [];
                parent[field.id_field_owner_name] = field;
            
            
            
            
        
        print"check parent "
        
        for f in parent:
            val = parent.get(f);
            fields.append(val.to_json_field());
            #print val.child;
            
        
        
        return dict(fields = fields);
    
    @expose('json')
    def showField(self,**kw):
        field = [];
        fields = [];
        field.append({'id':1 ,'seq':1,'field_label': 'Email','type': 'text', 'field_name' : 'email'   });
        field.append({'id':2 ,'seq':2,'field_label': 'Page','type': 'text', 'field_name' : 'page'   });
        field.append({'id':3 ,'seq':3,'field_label': 'Problem type','type': 'combobox', 'field_name' : 'problem_type'   });
        
        field.append({'id':4 ,'seq':4,'field_label': 'Score','type': 'score_image', 'field_name' : 'score_image'   });
        field.append({'id':5 ,'seq':5,'field_label': 'File','type': 'file', 'field_name' : 'problem_file'   });
        field.append({'id':6 ,'seq':6,'field_label': 'Detail','type': 'textarea', 'field_name' : 'detail'   });
        
        
        
        
        fields.append({'id': 1, 'field' : field});
        return dict(fields = fields);