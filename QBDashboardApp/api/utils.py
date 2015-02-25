

from django.http import HttpResponse
from django.utils import simplejson
from api.models import employee, tasks, meetings, todo, scribling_data, category, projects
import datetime
from django.db.models import Q
import json
import time
from dateutil.parser import parse




def json_response(response):
    header_res = HttpResponse(simplejson.dumps(response))
    header_res['Access-Control-Allow-Origin'] = '*'
    header_res['Access-Control-Request-Method'] = '*'
    return header_res

def json_request(request):
    
    req = ""
    if (request.method == 'GET'):
       req = request.GET.get('data')
    else:
       req = request.raw_post_data
   
    if (req):
       try:
           return simplejson.loads(req)
       except Exception as name:

           return name.__unicode__()
    else:
       return None
   

def week_day(week):
    return { 0: "Monday",
      1 : "Tuesday",
      2 : "Wednesday",
      3:  "Thursday",
      4: "Friday",
      5: "Saturday",
      6: "Sunday",
      
  }[week]



def calculate_date(week, mode):
    today = datetime.date.today()
    day_to_add = (week - today.weekday()) % 7
    if (day_to_add < 1) :
        day_to_add += 7
        mode = False
    elif (mode):
        day_to_add += 7
    
    return (today + datetime.timedelta(day_to_add))


def update_category(data, id): 
     
    
    categry_data = [ "feature", "support", "task", "codereview", "bug", "wireframe", "testcase", "N/A"]
    category_data = category.objects.filter(emp_id=id)
    
    if(category_data != None): 
      for datas in category_data:
        categry_data.append(datas.category)     
       
        
    if data not in categry_data:
      new_category = category(emp_id=id, category=data)  
      new_category.save()
      return data
    else:
        return "N/A"
    
      
def update_project(data, id): 
    
    project_datas = ["N/A"]
    project_data = projects.objects.filter(emp_id=id)   
    
    if(project_data != None): 
      for datas in project_data:
        project_datas.append(datas.projects)  
  
        
    if data not in project_datas:
      new_project = projects(emp_id=id, projects=data)  
      new_project.save()
      return data
    else :
      return "N/A"
    
    
   
#def update_project(data, id): 
    
      
def fetch_taskDetails(task_details):
    task =[]
    for data in task_details:
        task_details = {
                        "task" : data.tasks,
                        "date" :str(data.scheduled_date),  # .strftime("%d %B %Y") ),
                        "time" : str(data.scheduled_time),
                        "category" : data.category,
                        'priority' : data.priority,
                        "taskid" : data.id,
                        "project" : data.project,
                        "task_status" : data.task_status                    
                       }    
        
        task.append(task_details)
    return task

def generate_response(task_details):
    
    response= {}
    response["task"] = task_details.tasks
    response["date"] = str(task_details.scheduled_date)  # .strftime("%d %B %Y") ),
    response["time"] = str(task_details.scheduled_time)
    response["category"] = task_details.category
    response['priority']= task_details.priority
    response["taskid"]= task_details.id
    response["project"]= task_details.project
    response["task_status"]= task_details.task_status 
    return response  

def generate_error_response(error):
    if ("employee matching" in error) or ("loginID" in error) :
        
      return( "your session expired refresh page to login again")
    return error