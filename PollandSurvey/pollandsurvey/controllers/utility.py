
class Utility(object):

    def __init__(self, params):
        pass;
    
    
import ast
print ast.literal_eval('True')
print bool('true')
print bool('false')

answer = 'false'

print ({True: True, False: False}[ answer in 'true'])
