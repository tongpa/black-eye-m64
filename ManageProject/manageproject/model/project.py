import os
from datetime import datetime
from hashlib import sha256


from sqlalchemy import Table, ForeignKey, Column
from sqlalchemy.types import Unicode, Integer, DateTime,String,Text,BLOB
from sqlalchemy.orm import relation, synonym
from sqlalchemy.exc import IntegrityError
from manageproject.model import DeclarativeBase, metadata, DBSession
from json import dumps
from collections import OrderedDict
__all__ = ['Projects','TasksProject','CategoryTasks','GroupTasks','ResourceProjects','TaskType','TaskStatus','ResourceTasksProjects','CommentTasksProjects','FilesTasksProjects']

class Projects(DeclarativeBase):
    __tablename__ = 'projects'
    #__table_args__ = {'mysql_engine':'InnoDB'}
    id_projects = Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255), unique=True, nullable=False);     
    active =  Column(String(1) , nullable=False,default =1);
    create_date = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)
    
    
     

    def __repr__(self):
        return '<Project: name=%s>' % repr(self.description )

    def __unicode__(self):
        return Unicode(str(self.description).encode('utf8'))
    
    @classmethod
    def selectAll(cls):
        return  DBSession.query(cls).all();
    
    @classmethod
    def getByDescription(cls,description):
        DBSession.query(cls).all();
        pass;
    
    @classmethod
    def getById(cls,id):
        return  DBSession.query(cls).get(id);


    @classmethod
    def deleteById(cls,id):
        return  DBSession.query(cls).filter(cls.id_projects== id ).delete();


    
    def save(self):
        try:
            DBSession.add(self); 
            DBSession.flush() ;
            print "save project"
            return None;
        except  IntegrityError:
            print "Duplicate entry" 
            return "Duplicate entry"
        
        
    def _asdict(self):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():
            #print key;
            #print self.__table__.c[key].type
            #print self.__mapper__.c[key] 
            result[key] = getattr(self, key)
        return result
    
    
class TasksProject(DeclarativeBase):
    __tablename__ = 'tasks_project'

    id_tasks_project = Column(Integer, autoincrement=True, primary_key=True)
    id_projects = Column(   Integer,ForeignKey('projects.id_projects'), nullable=False, index=True) ;
    projects = relation('Projects', backref='tasksProject_projects');
     
    
    description = Column(String(255),   nullable=False);     
    activate  =  Column(String(1) , nullable=False,default =1);
    create_date = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
    
     

    def __repr__(self):
        return '<tasks_project: name=%s>' % repr(str(self.description))

    def __unicode__(self):
        return str(self.description)
    
class CategoryTasks(DeclarativeBase):
    __tablename__ = 'category_tasks'

    id_category_tasks = Column(Integer, autoincrement=True, primary_key=True)
    id_projects = Column(   Integer,ForeignKey('projects.id_projects'), nullable=False, index=True) ;
    projects = relation('Projects', backref='categoryTasks_projects');
    id_parents = Column(   Integer,ForeignKey('category_tasks.id_category_tasks'), nullable=True, index=True) ;
    parents = relation('CategoryTasks', backref='categoryTasks_parents', remote_side='CategoryTasks.id_category_tasks');
    description = Column(String(255),  nullable=False);     
    activate  =  Column(String(1) , nullable=False,default =1);
    create_date = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
    
     

    def __repr__(self):
        return '<category_tasks: name=%s>' % repr(self.description)

    def __unicode__(self):
        return self.group_name

class GroupTasks(DeclarativeBase):
    __tablename__ = 'group_tasks'

    id_group_tasks = Column(Integer, autoincrement=True, primary_key=True)
    id_category_tasks = Column(   Integer,ForeignKey('category_tasks.id_category_tasks'), nullable=False, index=True) ;
    category_tasks = relation('CategoryTasks', backref='groupTasks_category_tasks');
    
    id_tasks_project = Column(   Integer,ForeignKey('tasks_project.id_tasks_project'), nullable=False, index=True) ;
    task_projects = relation('TasksProject', backref='groupTasks_task_projects');
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)   

    def __repr__(self):
        return '<group_tasks: name=%s>' % repr(str(self.id_group_tasks))

    def __unicode__(self):
        return str(self.id_group_tasks)
    
class ResourceProjects(DeclarativeBase):
    __tablename__ = 'resource_projects'

    id_resource_projects = Column(Integer, autoincrement=True, primary_key=True)
    
    id_projects = Column(   Integer,ForeignKey('projects.id_projects'), nullable=False, index=True) ;
    projects = relation('Projects', backref='resourceProjects_projects');
    
    id_user = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='resourceProjects_user');
    
    activate  =  Column(String(1) , nullable=False,default =1);
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
     

    def __repr__(self):
        return '<resource_projects: name=%s>' % repr(self.user.user_name)

    def __unicode__(self):
        return self.user.user_name
    
class TaskType(DeclarativeBase):
    __tablename__ = 'task_type'

    id_task_type = Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255), unique=True, nullable=False);     
    activate  =  Column(String(1) , nullable=False,default =1);
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
     

    def __repr__(self):
        return '<task_type: name=%s>' % repr(self.description)

    def __unicode__(self):
        return self.description
    
class TaskStatus(DeclarativeBase):
    __tablename__ = 'task_status'

    id_task_status = Column(Integer, autoincrement=True, primary_key=True)
    description = Column(String(255), unique=True, nullable=False);     
    activate  =  Column(String(1) , nullable=False,default =1);
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
     

    def __repr__(self):
        return '<task_status: name=%s>' % repr(self.description)

    def __unicode__(self):
        return self.description   
    
class ResourceTasksProjects(DeclarativeBase):
    __tablename__ = 'resource_tasks_projects'

    id_resource_tasks_projects = Column(Integer, autoincrement=True, primary_key=True)
    
    id_resource_projects = Column(   Integer,ForeignKey('resource_projects.id_resource_projects'), nullable=False, index=True) ;
    resource_projects = relation('ResourceProjects', backref='resourceTasksProjects_resource_projects');
    
    id_tasks_project = Column(   Integer,ForeignKey('tasks_project.id_tasks_project'), nullable=False, index=True) ;
    tasks_project = relation('TasksProject', backref='resourceTasksProjects_tasks_project');
    
    id_projects = Column(   Integer,ForeignKey('projects.id_projects'), nullable=False, index=True) ;
    projects = relation('Projects', backref='resourceTasksProjects_projects');
    
    id_task_status = Column(   Integer,ForeignKey('task_status.id_task_status'), nullable=False, index=True) ;
    task_status = relation('TaskStatus', backref='resourceTasksProjects_task_status');
    
    id_task_type = Column(   Integer,ForeignKey('task_type.id_task_type'), nullable=False, index=True) ;
    task_type = relation('TaskType', backref='resourceTasksProjects_task_type');
    
    description = Column(String(255),   nullable=True);   
    
    start_date = Column(DateTime,  nullable=True );
    stop_date  = Column(DateTime,  nullable=True );
    
    
    activate  =  Column(String(1) , nullable=False,default =1);
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
     

    def __repr__(self):
        return '<resource_tasks_projects: name=%s>' % repr(self.tasks_project.description)

    def __unicode__(self):
        return self.user.tasks_project.description 
    
class CommentTasksProjects(DeclarativeBase):
    __tablename__ = 'comment_tasks_projects'

    id_comment_tasks_projects = Column(Integer, autoincrement=True, primary_key=True)
    
    id_resource_projects = Column(   Integer,ForeignKey('resource_projects.id_resource_projects'), nullable=False, index=True) ;
    resource_projects = relation('ResourceProjects', backref='commentTasksProjects_resource_projects');
    
    id_resource_tasks_projects = Column(   Integer,ForeignKey('resource_tasks_projects.id_resource_tasks_projects'), nullable=False, index=True) ;
    resource_tasks_projects = relation('ResourceTasksProjects', backref='commentTasksProjects_resource_tasks_projects');
    
    id_user = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='commentTasksProjects_user');
    
    comment = Column(Text,   nullable=True);     
    activate  =  Column(String(1) , nullable=False,default =1);
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
     

    def __repr__(self):
        return '<comment_tasks_projects: name=%s>' % repr(self.user.user_name)

    def __unicode__(self):
        return self.user.user_name      
    
class FilesTasksProjects(DeclarativeBase):
    __tablename__ = 'files_tasks_projects'

    id_comment_tasks_projects = Column(Integer, autoincrement=True, primary_key=True)
    
    id_resource_projects = Column(   Integer,ForeignKey('resource_projects.id_resource_projects'), nullable=False, index=True) ;
    resource_projects = relation('ResourceProjects', backref='filesTasksProjects_resource_projects');
    
    id_resource_tasks_projects = Column(   Integer,ForeignKey('resource_tasks_projects.id_resource_tasks_projects'), nullable=False, index=True) ;
    resource_tasks_projects = relation('ResourceTasksProjects', backref='filesTasksProjects_resource_tasks_projects');
    
    id_user = Column(   Integer,ForeignKey('tg_user.user_id'), nullable=False, index=True) ;
    user = relation('User', backref='filesTasksProjects_user');
    
    file_name  =  Column(String(255) , nullable=False,default =1);
    file_path  =  Column(String(255) , nullable=False,default =1);
    file_data =  Column(BLOB , nullable=True,default =1);
    comment = Column(Text,   nullable=True);     
    activate  =  Column(String(1) , nullable=False,default =1);
    created = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime, default=datetime.now)  
     

    def __repr__(self):
        return '<comment_tasks_projects: name=%s>' % repr(self.file_name)

    def __unicode__(self):
        return self.file_name