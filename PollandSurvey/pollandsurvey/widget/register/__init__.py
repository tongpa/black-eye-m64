"""
import tw2.core
import tw2.forms
import tw2.sqla
import tw2.dynforms
import tw2.jqplugins.jqgrid
#import tw2.captcha

from pollandsurvey import model

class RegisterForm(tw2.forms.FormPage):
    #entity = model.User
    #resources = [tw2.core.CSSLink(link='/css/myapp.css')]
    title = 'Create User'

    class child(tw2.dynforms.CustomisedTableForm):
        action = '/register/create'
        user_id = tw2.forms.HiddenField()
        user_name = tw2.forms.TextField(validator=tw2.core.Required)
        email_address = tw2.forms.TextField(validator=tw2.core.Required)
        display_name= tw2.forms.TextField(validator=tw2.core.Required)
        password = tw2.forms.PasswordField(validator=tw2.core.Required)
        
        confirm_password = tw2.forms.PasswordField(validator=tw2.core.Required)
        #captcha = tw2.captcha(validator=tw2.core.Required);
        
#create_movie_form = RegisterForm("create_movie_form")
"""       