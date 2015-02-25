from api.models import employee, tasks, meetings, todo, scribling_data, category, projects
import datetime
from django.db.models import Q
import json
import time
from dateutil.parser import parse
from api.utils import *


#  The below function returns the todo and tasks count  for the present and other days

def taskOverview(request):

  
  webresponse = {}
  response = {}
  try:  
   
    webresponse['errorMessages'] = [] 
    response['task_details'] = [] 
    data = []
    date = datetime.datetime.now()
    date = date + datetime.timedelta(-2)
    Employee = employee.objects.get(email_id = str( request.session.get('loginID')))
    for i in range(5): 
        task_data = tasks.objects.filter(Q(scheduled_date=date) & Q(task_type=True)& Q(emp_id = Employee))
        todo_data = todo.objects.filter(Q(scheduled_date=date) & Q(task_type=False)& Q(emp_id = Employee) )
        current_date = str(date.strftime("%d %B %Y"))
        split_date = current_date.split(" ")
        task = {
               
            "date" :str(split_date[0]) ,
             "tasks": len(task_data),
             "todo" : len(todo_data),
             "week" : week_day(date.weekday()) + ", " + split_date[1] + " " + split_date[2]
             }  
        
        data.append(task)
        date = date + datetime.timedelta(1)
    response['task_details'] = data
    webresponse['data'] = response
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
  return json_response(webresponse)

# saves new tasks

def save_tasks (request):
  
  webresponse = {}
  req_data = json_request(request)
  response = {}
  
  try:
     
    weekMode =False 
    webresponse['errorMessages'] = [] 
    webresponse['Status'] = False
   
    req_date = req_data['date']
    task = req_data['task']
    my_time = req_data['time']
    req_project = req_data['project'].strip()
    req_category = req_data['category'].strip()
    task = task.replace("\"", "")
    if req_project ==  "":
        req_project = "N/A"
    if req_category == "":
        req_category = "N/A"
        
    my_new_time = time.strftime("%H:%M:%S", time.strptime(my_time, "%I:%M:%S %p"))
    id = employee.objects.get(email_id = str( request.session.get('loginID')))   
    
    if(req_date == "null"):
    
       current_date = datetime.datetime.now();
       if "today" in task.lower():
        task = task.replace("today", "")
        req_date = current_date
            
       elif "tomorrow" in task.lower():
        task = task.replace("tomorrow", "")
        req_date = current_date + datetime.timedelta(1)
           
            
       elif "monday" in task.lower():
        if "next monday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("monday", "")
        req_date =  calculate_date(0, weekMode) 
           
       elif "tuesday" in task.lower():
        if "next tuesday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("tuesday", "")
        req_date = calculate_date(1, weekMode) 
                
       elif "wednesday" in task.lower():
        if "next wednesday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("wednesday", "")
        req_date = calculate_date(2, weekMode) 
                
       elif "thursday" in task.lower():
        if "next thursday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("thursday", "")
        req_date =  calculate_date(3,weekMode) 
            
       elif "friday" in task.lower():
        if "next friday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("friday", "")
        req_date = calculate_date(4,weekMode) 
                
       elif "saturday" in task.lower():
        if "next saturday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("saturday", "")
        req_date = calculate_date(5,weekMode) 
            
       elif "sunday" in task.lower():
        if "next sunday" in task.lower():
            task = task.replace("next ", "")
            weekMode = True
        task = task.replace("sunday", "")
        req_date =  calculate_date(6,weekMode)
                
       elif "next week" in task.lower():
         task = task.replace("next week", "")
         req_date =  calculate_date(0,weekMode) 
            
       else:
                      
            for word in task.split():                           
             if word.startswith(':'):           
               
                try:      
                  req_date =  parse(word.replace(":", ""))    
                  task = task.replace(word, "") 
                except Exception as name:
                  req_date = current_date  
               
             else :
               req_date = current_date
    
    if(req_project == "N/A"):
        
        for word in task.split():
             if word.startswith('+'):
                 task = task.replace(word, "")
                 req_project = word.replace("+", "")
                 break
             
    if(req_category == "N/A"):
        
        for word in task.split():
             if word.startswith('@'):
                task = task.replace(word, "")
                req_category = word.replace("@", "")
                break
            
    todo_data = todo(emp_id=id, scheduled_date=req_date, tasks=task, task_type=False, priority=int(req_data['priority']), task_status=True, category=req_category, project=req_project, scheduled_time=my_new_time)
    todo_data.save()
    todoTask = todo.objects.filter(Q(tasks=task) & Q(scheduled_date=req_date) & Q(emp_id=id) & Q(task_type=False) &Q(priority=int(req_data['priority'])) & Q(task_status=True) & Q(category=req_category) & Q( project=req_project) & Q( scheduled_time=my_new_time))
    count =todoTask.count()
    
    last_item = todoTask[ count-1 ]  
   
    response_date = str(req_date).split(" ")
    response = generate_response(last_item)
    
    response ['projects'] = update_project(req_project, id)
    response ['categories'] =update_category(req_category, id)
   
    webresponse['Status'] = True
    
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
  webresponse['data'] = response     
  return json_response(webresponse)

  
def profile_data (request):
  webresponse= {} 
  webresponse['errorMessages'] = [] 
  try: 
    
    Employee = employee.objects.get(email_id = str( request.session.get('loginID')))
    data = {
           "first_name" : Employee.first_name,
           "Last_name" : Employee.last_name,
           "image_url" : str(Employee.image),
           "desig" : Employee.designation,
           "email_id" : Employee.email_id,
           }
    webresponse['data'] = data
    

  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
  return json_response(webresponse)
# the below function returns the upcoming task summary

def upcomingTasks (request):
    
    
  webresponse = {}
  response = {}
  try: 
    
    webresponse ['errorMessages'] = [] 
    response ['pending_task'] = []
    response ['todays_task'] = []
    response ['tomarrows_task'] = []
    response ['week_task'] = []
    response ['week_heading'] = "This Week"
    response ['categories'] = []
 
    categories = [ "feature", "support", "task", "codereview", "bug", "wireframe", "testcase"]
   
    id = employee.objects.get(email_id = str( request.session.get('loginID')))   
    date = datetime.datetime.now()
    # pending tasks
    
    task_details = todo.objects.filter(Q(scheduled_date__lt=date) & Q(task_status=True) & Q(emp_id=id))
    response ['pending_task'] = fetch_taskDetails(task_details)
    
    # todays task
    
    task_details = todo.objects.filter(Q(scheduled_date=date) & Q(emp_id=id))
    response ['todays_task'] = fetch_taskDetails(task_details)
      
    # tomorrows task    
   
    date += datetime.timedelta(1)
    task_details = todo.objects.filter(Q(scheduled_date=date) & Q(emp_id=id))
    response ['tomarrows_task'] = fetch_taskDetails(task_details)
      
    # task of next week or this week
    
    week = date.weekday()
    
    if(week > 3):
        
      nextMonday = date + datetime.timedelta(7 - date.weekday())
      nextsatday = nextMonday + datetime.timedelta(5)
      task_details = todo.objects.filter(Q (scheduled_date__gte=nextMonday) & Q (scheduled_date__lte=nextsatday) & Q(emp_id=id))
      response ['week_task'] = fetch_taskDetails(task_details)  
      response ['week_heading'] = "Next Week"  
      
    else:
        
      nextday = date + datetime.timedelta(1)
      nextsatday = date + datetime.timedelta(4 - date.weekday()+1 )   
      task_details = todo.objects.filter(Q (scheduled_date__gte=nextday) & Q (scheduled_date__lte=nextsatday) & Q(emp_id=id))
      response ['week_task'] = fetch_taskDetails(task_details)
     
    
    category_data = category.objects.filter(emp_id=id)
    
    for data in category_data:
        categories.append(data.category)
        
    response ['categories'] = categories
    
    project_data = projects.objects.filter(emp_id=id)
    project=[]
    for data in project_data:
        project.append(data.projects)
        
    response ['projects'] = project
    webresponse['data'] = response
    
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
 
  return json_response(webresponse)
  
# The below function returns the pending leave requests holidays and birthdays of this month

def otherdetails (request):
    req_date = request.GET.get('date')
    id = request.GET.get('id')
    return json_response({"pending_leave_request" : "0", "holidays" :"0", "birthdays" :"0"})

def projectsummary (request):
    return json_response({"projects" : [ ] })
    
# The below function returns the first five meeting details of the given day

def meetingsummary (request):
    
  webresponse = {}
  response = {}
  
  try: 
         
    id = employee.objects.get(email_id = str( request.session.get('loginID')))
    webresponse['errorMessages'] = []
    response['meetings'] = []
    date = datetime.datetime.now()
    
    meeting_details = [] 
    
    meeting_content = meetings.objects.filter(Q(scheduled_date=date)& Q(emp_id = id))[:5]
    
    for data in meeting_content :
        meeting_data = {
                        "meeting_topic" : data.meeting_topic,
                        "meeting_time" : str(data.meeting_time),
                        "meeting_id"    : data.id
                        }
        meeting_details.append(meeting_data)
    
    response['meetings'] = meeting_details
    webresponse['data'] = response

  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 

  return json_response(webresponse)

# The below function returns the first 5 tasks of the day

def tasksummary (request):
 
 webresponse = {}
 response = {}
 try: 
    id = employee.objects.get(email_id = str( request.session.get('loginID')))
    webresponse['errorMessages'] = []
    response["tasks"] = []
    date = datetime.datetime.now()
    task_summary = [] 
    
    task_data = tasks.objects.filter(Q(scheduled_date=date)& Q(emp_id = id))[:5]
    for data in task_data:
        task_summary.append(data.tasks)
     
    response["tasks"] = task_summary
    webresponse['data'] = response
 except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
   
 return json_response(webresponse)  

def completeTask (request):

  webresponse = {}
  response = {}
  try:   
    webresponse['errorMessages'] = [] 
    response['Success'] = False  
    if(  request.session.get('loginID') != None):
     
     task_id = request.GET.get('id')
     task_data = todo.objects.get(id=task_id)
     task_data.task_status = False
     task_data.save()
     response['Success'] = True
     
    else:
        webresponse['errorMessages'] = 'your session expired refresh page to login again'
    
  except Exception as name:

      webresponse['errorMessages'] = generate_error_response(name.__unicode__() )
    
  webresponse['data'] = response
  return json_response(webresponse)

def deleteTask (request):

  webresponse= {}
  response = {}
  response['errorMessages'] = [] 
  response['Success'] = False  
  try: 
       
   if(  request.session.get('loginID') != None): 
     
    task_id = request.GET.get('id')
    todo.objects.filter(id=task_id).delete()
    response['Success'] = True
    
   else:
        webresponse['errorMessages'] = 'your session expired refresh page to login again'
    
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
  webresponse['data'] = response
  return json_response(webresponse)
 

def update_task_date(request):
    
  content = json_request(request)
  webresponse = {}
  try: 
    
    webresponse['errorMessages'] = [] 
    webresponse['status'] = False    
    if( request.session.get('loginID') != None):
      task_id = content['id']
      date = content['date']   
      task_details = todo.objects.get(id=task_id)
      task_details.scheduled_date = date
      task_details.scheduled_time = content['time'] 
      task_details.save()
      webresponse['status'] = True
    
      webresponse['data'] = generate_response(task_details)
    else:
        webresponse['errorMessages'] = 'your session expired refresh page to login again'
    
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
     
    
  return json_response(webresponse)
  
def scriblingData (request): 
  
  req_data = json_request(request)
  webresponse = {}
  response = {}
  webresponse['Success'] = False   
  try: 
    
    webresponse['errorMessages'] = [] 
    
    data = req_data['task']
    
    id = employee.objects.get(email_id = str( request.session.get('loginID')))
    Quicknote = scribling_data(emp_id=id, date=datetime.datetime.now(), data=data)
    Quicknote.save()
    response['data'] = Quicknote.data
    response['id'] = Quicknote.id
    response['date']= str(Quicknote.date)
    webresponse['Success'] = True
   
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
  webresponse['data'] = response
  return json_response(webresponse)
  
def updateTask(request):
      
  req_data = json_request(request)
  webresponse = {}    
  
  try: 
    
   webresponse['errorMessages'] = [] 
   webresponse['status'] = False 
   if(  request.session.get('loginID') != None): 
    my_time = req_data['time']
    my_new_time = time.strftime("%H:%M:%S", time.strptime(my_time, "%I:%M:%S %p"))
     
    task_id = req_data ['id']
    task_details = todo.objects.get(id=task_id)
    
    task_details.scheduled_date = req_data ['date']
    task_details.tasks = req_data ['tasks']
    task_details.priority = req_data ['priority']
    
    if(req_data ['task_status'] == "false"):
     task_details.task_status = False
    else:
      task_details.task_status = True
        
    task_details.category = req_data ['category']
    task_details.project = req_data ['project']
    task_details.scheduled_time = my_new_time
    task_details.save()
    
    webresponse['status'] = True
    webresponse['data'] = generate_response(task_details)
   else:
        webresponse['errorMessages'] = 'your session expired refresh page to login again'
    
  except Exception as name:
    webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
      
  return json_response(webresponse) 
  
  
def search(request):
     webresponse = {}
     response = {}
     try: 
       webresponse['status']= False
       search_term = request.GET.get('q')
       if(search_term != None):
        id = employee.objects.get(email_id = str( request.session.get('loginID')))  
        task_details = todo.objects.filter( Q(tasks__icontains=search_term) & Q(emp_id=id))
        response = fetch_taskDetails(task_details)
        webresponse['status'] = True
        webresponse['data'] = response
       else:
        webresponse['errorMessages'] = 'Search parameter not entered' 
     except Exception as name:
       webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
             
       webresponse['status'] = False
         
     return json_response(webresponse)
     
def myscriblings(request): 
    
  webresponse = {}
  response = {}
  try: 
    
    webresponse['errorMessages'] = [] 
    webresponse['status'] = False   
    scriblings =[]
    id = employee.objects.get(email_id = str( request.session.get('loginID'))) 
    scribling_datas= scribling_data.objects.filter(emp_id=id)
    for data in scribling_datas:
        scribling = {
                     "data":data.data,
                     "date": str(data.date),
                     "id" : data.id
                     }
        
        scriblings.append(scribling)
        
    webresponse['status'] = True
    webresponse["data"] = scriblings
  except Exception as name:
       webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
             
       webresponse['status'] = False
         
  return json_response(webresponse)
  
def deleteScriblingData (request):
    
  webresponse = {}
  response = {}
  try: 
    
    webresponse['errorMessages'] = [] 
    webresponse['status'] = False   
    scriblings =[]
    scriblingID = request.GET.get('id')
    id = employee.objects.get(email_id = str( request.session.get('loginID'))) 
    scribling_data.objects.filter(Q(emp_id=id) & Q (id = scriblingID)).delete()
    
        
    webresponse['status'] = True
    
  except Exception as name:
       webresponse['errorMessages'] = generate_error_response(name.__unicode__() ) 
             
       webresponse['status'] = False
         
  return json_response(webresponse)
