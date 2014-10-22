import tw2.core
import tw2.forms
import tw2.sqla
import tw2.dynforms
import tw2.jqplugins.jqgrid
import tw2.bootstrap.forms

from formencode import Schema
from formencode.validators import FieldsMatch
from tg import lurl,url
 
#class RegisterForm(tw2.forms.FormPage): 
class RegisterForm1(tw2.forms.Form):
    #entity = model.Movie
    resources = [tw2.core.CSSLink(link=url('/css/myapp.css'))]
    title = 'Create User'
    submit = tw2.forms.SubmitButton(value='Update')
    #class child(tw2.dynforms.CustomisedTableForm):
    class child(tw2.forms.TableLayout):
        #action = lurl('/register/create')
        hover_help = True
        user_id = tw2.forms.HiddenField()
        user_name = tw2.forms.TextField(validator=tw2.core.Required)
        
        email_address = tw2.forms.TextField( help_text='Enter a new login email.',validator=tw2.core.EmailValidator)
        display_name= tw2.forms.TextField( )
        password= tw2.forms.PasswordField( )
        confirm_password= tw2.forms.PasswordField(validator=tw2.core.MatchValidator('password'))
        #genres = tw2.forms.CheckBoxList(options=['Action', 'Comedy', 'Romance', 'Sci-fi'])
    #validator = tw2.core.MatchValidator('password', 'confirm_password')
    #validator = FieldsMatch('password', 'confirm_password')
   # validator= FieldsMatch('password','confirm_password',messages={'invalidNoMatch': "Passwords do not match"})
    
passwordValidator = Schema(chained_validators=(FieldsMatch('password', 'confirm_password',  messages={'invalidNoMatch':     "Passwords do not match"}),))

#class RegisterForm(tw2.forms.FormPage): 
class RegisterForm(tw2.forms.Form):
    submit = tw2.bootstrap.forms.SubmitButton(value='Update')
    action = '/register'
    show_errors = True
 
    class child(tw2.bootstrap.forms.TableLayout):
        hover_help = True
        new_login_email = tw2.bootstrap.forms.TextField(
                                          help_text='Enter a new login email.',
                                          validator=tw2.core.EmailValidator,
                                          attrs=dict(style='display:block;height:25px'))
    
        confirm_new_email = tw2.bootstrap.forms.TextField(
                                            help_text='Confirm new login email address.',
                                            validator=tw2.core.MatchValidator('new_login_email'),
                                          attrs=dict(style='display:block;height:25px')
                                            )
        new_password = tw2.bootstrap.forms.PasswordField(
                                           help_text='Enter new password.',
                                          attrs=dict(style='display:block;height:25px'))
        confirm_new_password = tw2.bootstrap.forms.PasswordField(
                                            help_text='Confirm new password.',
                                                     validator=tw2.core.MatchValidator('new_password'),
                                          attrs=dict(style='display:block;height:25px')
                                                     )
        current_password = tw2.bootstrap.forms.PasswordField(
                                               help_text='Enter current password.',
                                               validator=tw2.core.Required,
                                          attrs=dict(style='display:block;height:25px'))
     
     
if __name__ == '__main__':
    # This succeeeds, since new_login_email == confirm_new_email. They are
    # both blank.
    RegisterForm.validate({
    'new_password': 'secret',
    'confirm_new_password': 'secret',
        'current_password': 'oldpass',
        })
         
        # This fails appropriately.
    RegisterForm.validate({
        'new_login_email': 'hello@awesome.com',
        'new_password': 'secret',
        'confirm_new_password': 'secret',
        'current_password': 'oldpass',
    })