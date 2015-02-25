# Create your views here.

from django.shortcuts import redirect
from django.shortcuts import render, render_to_response
from api.models import employee
from QBDashboardApp.config import *

def loginSuccess(request):
 
 webresponse = {}
 try:
  test =str( request.user.email)
  if ( "@qburst.com" in test):
      
      webresponse['loginID'] =str( request.user.email) 
      request.session['loginID'] =str(request.user.email) 
      
      try:
          
       Employee = employee.objects.get(email_id = request.user.email)
       
      except Exception as name:
       if ("employee matching" in name.__unicode__() ):
          #if("@qburst.com" in str( request.user.email)):
        Employee = employee(first_name = request.user.first_name, last_name =request.user.last_name,email_id = request.user.email  )
        Employee.save()
  else:
    return redirect(Logout_url)
 except Exception as name:
     return redirect(Base_Url + "login/google-oauth2")
 
    
 return render(request, 'index.html')
 

def Dashboard(request):
   return render(request, 'html/dashboard.html')      

def Footer(request):
   return render(request, 'html/footer.html')      

def Settings(request):
   return render(request, 'html/settings.html')      

def SearchResultPage(request):
   return render(request, 'html/SearchResultPage.html')      

def SearchResultList(request):
   return render(request, 'html/SearchResultList.html')     

def MyTodoPage(request):
   return render(request, 'html/MyTodoPage.html')      

def MyTodoPageList(request):
   return render(request, 'html/MyTodoPageList.html')      

def ScribblingPadSummaryPage(request):
   return render(request, 'html/ScribblingPadSummaryPage.html')                

def ScribblingPadSummaryList(request):
   return render(request, 'html/ScribblingPadSummaryList.html')       

def Header(request):
   return render(request, 'html/header.html')

def Help(request):
    return render(request, 'html/help.html')

def DayPanel(request):
    return render(request, 'html/dayPanel.html')

def Todo(request):
    return render(request, 'html/todo.html')

def Meetings(request):
    return render(request, 'html/meetings.html')

def QuickLinks(request):
    return render(request, 'html/quickLinks.html')

def MyProjects(request):
    return render(request, 'html/myProjects.html')

def notifications(request):
    return render(request, 'html/notifications.html')

def Tasks(request):
    return render(request, 'html/tasks.html')


def TodoSummary(request):
    return render(request, 'html/todoSummary.html')

def TodoList(request):
    return render(request, 'html/todoList.html')

def NoTodo(request):
    return render(request, 'html/noTodo.html')

def ScribblingPad(request):
    return render(request, 'html/scribblingPad.html')

def PopupMessage(request):
    return render(request, 'html/popupMessage.html')

def TodoProjectList(request):
    return render(request, 'html/todoProjectList.html')

def LoginError(request):
    return render(request, 'errorPage.html')
        
   
  
