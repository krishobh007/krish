import os, sys

sys.stdout = sys.stderr
apache_configuration= os.path.dirname(__file__)
project = os.path.dirname(apache_configuration)

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ['DJANGO_SETTINGS_MODULE'] = 'QBDashboardApp.settings'
import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
