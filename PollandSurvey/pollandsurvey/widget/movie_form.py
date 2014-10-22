"""Movie Form"""
from tw2.core import CSSLink,Validator,Required, widgets
from tw2.forms import (TableForm, CalendarDatePicker, SingleSelectField, Spacer, TextField, TextArea,TableLayout,SubmitButton)
from formencode.validators import Int, DateConverter  
import tw2.sqla
import tw2.dynforms
import tw2.jqplugins.jqgrid
import tw2.bootstrap.forms


from tg import url

class MovieForm (TableForm):
    resources = [CSSLink(link=url('/css/myapp.css'))]
    show_errors = True
    submit = SubmitButton(value='Update')
    action = '/create'
    class child( TableLayout):
        hover_help = True
        title = TextField(  validator=  Required,
            label_text='Movie Title',
            help_text='Please enter the full title of the movie.')
        year = TextField(validator=Int(min=1900, max=2100), size=4,
            help_text='Please enter the year this movie was made.')
        release_date = CalendarDatePicker(  validator=DateConverter(),
            help_text='Please pick the exact release date.')
        genre_options = [x for x in enumerate((
            'Action & Adventure', 'Animation', 'Comedy',
            'Documentary', 'Drama', 'Sci-Fi & Fantasy'))]
        genre = SingleSelectField(options=genre_options)
        description = TextArea( 
            help_text = 'Please provide a short description of the plot.')
        
class MovieForm1(TableForm):

    #template = "toscasample.widgets.templates.table_form"
    #css = [CSSLink(link=url('/css/tooltips.css'))]
    resources = [CSSLink(link=url('/css/myapp.css'))]
    show_errors = True
   
    genre_options = [x for x in enumerate((
        'Action & Adventure', 'Animation', 'Comedy',
        'Documentary', 'Drama', 'Sci-Fi & Fantasy'))]

    fields = [
        TextField('title', validator=  Required,
            label_text='Movie Title',
            help_text='Please enter the full title of the movie.'),
        Spacer(),
        TextField('year', validator=Int(min=1900, max=2100), size=4,
            help_text='Please enter the year this movie was made.'),
        CalendarDatePicker('release_date', validator=DateConverter(),
            help_text='Please pick the exact release date.'),
        SingleSelectField('genre', options=genre_options,
            help_text = 'Please choose the genre of the movie.'),
        Spacer(),
        TextArea('description', attrs=dict(rows=3, cols=25),
            help_text = 'Please provide a short description of the plot.'),
        Spacer()]

    submit_text = 'Save Movie'


create_movie_form = MovieForm( )