# Django settings for QBDashboardApp project.
import os
from config import *
DEBUG = True
TEMPLATE_DEBUG = DEBUG
BASE_DIR =os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 

TEMPLATE_DIRS = (os.path.join(BASE_DIR, 'templates'),)

ADMINS = (
    # ('Your Name', 'your_email@example.com'),
)

#AUTHENTICATION_BACKENDS = ('django.contrib.auth.backends.ModelBackend','auth.GoogleBackend', )

LOGIN_URL = Login_Url
#LOGIN_REDIRECT_URL = 'http://djangostaging.qburst.com/day2day/'
LOGIN_REDIRECT_URL = Login_Redirect_Url
LOGIN_ERROR_URL = Login_Error_Url

#LOGOUT_URL = '/logout/'
"""
OPENID_SSO_SERVER_URL = 'https://www.google.com/accounts/o8/id'
OPENID_USE_AS_ADMIN_LOGIN = False
OPENID_CREATE_USERS = True
"""
MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'mydatabase',                      # Or path to database file if using sqlite3.
        'USER': 'postgres',                      # Not used with sqlite3.
        'PASSWORD': 'qburst',                  # Not used with sqlite3.
        'HOST': 'localhost',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'Asia/Kolkata'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = (os.path.join(BASE_DIR, 'Media'),)#'/Media/'

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = '/Media/'

# Absolute path to the directory static files should be collected to.
# Don't put anything in this directory yourself; store your static files
# in apps' "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"

STATIC_ROOT = ''#os.path.join(BASE_DIR, 'static')

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
STATIC_URL = '/day2day/static/'


ADMIN_MEDIA_PREFIX = '/day2day/static/admin/'

# Additional locations of static files
STATICFILES_DIRS = (
    # Put strings here, like "/home/html/static" or "C:/www/django/static".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
   os.path.join(BASE_DIR, 'static'),
   
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

# Make this unique, and don't share it with anybody.
SECRET_KEY = 'y#649&amp;o5gwz=l+l=ib1%=&amp;8v%7(o6ch_g@mu&amp;dwp9snsne0$2c'

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # Uncomment the next line for simple clickjacking protection:
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
)


ROOT_URLCONF = 'QBDashboardApp.urls'

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = 'QBDashboardApp.wsgi.application'

TEMPLATE_DIRS = (
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
    os.path.join(BASE_DIR, 'templates'),
    os.path.join(BASE_DIR,'static/daytoday/templates'),
    
 
)

INSTALLED_APPS = (
   'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'login',
    # Uncomment the next line to enable the admin:
    'django.contrib.admin',
    'social_auth',
    'socialprofile',
)

AUTHENTICATION_BACKENDS = (
  'social_auth.backends.google.GoogleOAuth2Backend',

  'django.contrib.auth.backends.ModelBackend',
)

TEMPLATE_CONTEXT_PROCESSORS = (

  'social_auth.context_processors.social_auth_by_type_backends',
  'django.contrib.auth.context_processors.auth',
  'django.core.context_processors.static',
    
    
    
  
)

SOCIAL_AUTH_DEFAULT_USERNAME = 'new_social_auth_user'
SOCIAL_AUTH_UID_LENGTH = 32
SOCIAL_AUTH_ASSOCIATION_HANDLE_LENGTH = 32
SOCIAL_AUTH_NONCE_SERVER_URL_LENGTH = 32
SOCIAL_AUTH_ASSOCIATION_SERVER_URL_LENGTH = 32
SOCIAL_AUTH_ASSOCIATION_HANDLE_LENGTH = 32

SOCIAL_AUTH_ENABLED_BACKENDS = ('google')

SOCIAL_AUTH_RAISE_EXCEPTIONS = False

# for localhost (redirect URI)
GOOGLE_OAUTH2_CLIENT_ID = Google_Oauth2_Client_Id
GOOGLE_OAUTH2_CLIENT_SECRET = Google_Oauth2_Client_Secret

"""
# for django staging (redirect URI)
GOOGLE_OAUTH2_CLIENT_ID = '1079377102250.apps.googleusercontent.com'
GOOGLE_OAUTH2_CLIENT_SECRET = '-RBwAJmzsD3_43oE50ezi6pe'

GOOGLE_OAUTH_EXTRA_SCOPE     = ['https://www.googleapis.com/auth/userinfo.profile',]
"""

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        #'require_debug_false': {
        #    '()': 'django.utils.log.RequireDebugFalse'
        #}
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            #'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
