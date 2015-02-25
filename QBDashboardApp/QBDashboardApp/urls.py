from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'QBDashboardApp.views.home', name='home'),
    # url(r'^QBDashboardApp/', include('QBDashboardApp.foo.urls')),
   url(r'^taskoverview/', 'api.views.taskOverview'),
    
    url(r'^createtask','api.views.save_tasks'),
    url(r'^upcomingtasks','api.views.upcomingTasks'),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^profile/', 'api.views.profile_data'),
    url(r'^notifications', 'api.views.otherdetails'),
    url(r'^projectsummary', 'api.views.projectsummary'),
    url(r'^meetingsummary', 'api.views.meetingsummary'),
    url(r'^tasksummary', 'api.views.tasksummary'),
    url(r'^completetask', 'api.views.completeTask'),
    url(r'^deletetask', 'api.views.deleteTask'),    
    url(r'^updatetaskdate', 'api.views.update_task_date'),
    url(r'^createscriblingdata', 'api.views.scriblingData'),
    url(r'^updatetask', 'api.views.updateTask'),
    url(r'^search', 'api.views.search'),
    url(r'^getmyscriblings', 'api.views.myscriblings'),
    url(r'^deletemyscriblings', 'api.views.deleteScriblingData'),
    
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=/day2day/login/google-oauth2/',}, name='logout'),
   
    url(r'^footer/$', 'login.views.Footer'),
    url(r'^Settings/$', 'login.views.Settings'),
    url(r'^ScribblingPadSummaryPage/$', 'login.views.ScribblingPadSummaryPage'),
    url(r'^ScribblingPadSummaryList/$', 'login.views.ScribblingPadSummaryList'),
    url(r'^SearchResultPage/$', 'login.views.SearchResultPage'),
    url(r'^SearchResultList/$', 'login.views.SearchResultList'),
    url(r'^MyTodoPageList/$', 'login.views.MyTodoPageList'), 
    url(r'^MyTodoPage/$', 'login.views.MyTodoPage'), 
    url(r'^Dashboard/$', 'login.views.Dashboard'),    
    url(r'^header/$', 'login.views.Header'),
    url(r'^help/$', 'login.views.Help'),
    url(r'^dayPanel/$', 'login.views.DayPanel'),
    url(r'^todo/$', 'login.views.Todo'),
    url(r'^meetings/$', 'login.views.Meetings'),
    url(r'^quickLinks/$', 'login.views.QuickLinks'),
    url(r'^Tasks/$', 'login.views.Tasks'),
    url(r'^myProjects/$', 'login.views.MyProjects'),
    url(r'^Notifications/$', 'login.views.notifications'),
    url(r'^todoSummary/$', 'login.views.TodoSummary'),
    url(r'^todoList/$', 'login.views.TodoList'),
    url(r'^noTodo/$', 'login.views.NoTodo'),
    url(r'^scribblingPad/$', 'login.views.ScribblingPad'),
    url(r'^popupMessage/$', 'login.views.PopupMessage'),
    url(r'^todoProjectList/$', 'login.views.TodoProjectList'),
    url(r'^$','login.views.loginSuccess'),
    url(r'', include('social_auth.urls')),
    url(r'^login-error/$', 'login.views.LoginError'),
    
)
"""
 url(r'^login/$', 'django_openid_auth.views.login_begin', name='openid-login'),
    url(r'^login-complete/$', 'django_openid_auth.views.login_complete', name='openid-complete'),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=/day2day/login/',}, name='logout'),
"""
