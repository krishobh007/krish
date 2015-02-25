from django.db import models
# Create your models here.
class employee(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name =  models.CharField(max_length=200)
    image = models.ImageField(upload_to='Media')
    designation = models.CharField(max_length=200)
    email_id = models.EmailField()
    
class tasks(models.Model):
    emp_id = models.ForeignKey(employee)
    scheduled_date = models.DateField()
    tasks = models.CharField(max_length=900)
    priority  = models.IntegerField()
    task_type = models.BooleanField()
    task_status =  models.BooleanField()

class meetings (models.Model):
    emp_id = models.ForeignKey(employee)
    scheduled_date = models.DateField()
    meeting_topic = models.CharField(max_length=900)
    meeting_time = models.TimeField()
    
class todo(models.Model):
    emp_id = models.ForeignKey(employee)
    scheduled_date = models.DateField()
    tasks = models.CharField(max_length=900)
    priority  = models.IntegerField()
    task_type = models.BooleanField()
    task_status =  models.BooleanField()
    category =  models.CharField(max_length=900)
    project = models.CharField(max_length=900)
    scheduled_time = models.TimeField()
    
class scribling_data(models.Model):
    emp_id = models.ForeignKey(employee)
    date = models.DateField()
    data = models.CharField(max_length=900)
 
class category(models.Model):
    emp_id = models.ForeignKey(employee) 
    category =   models.CharField(max_length=30)
    
class projects(models.Model):
    emp_id = models.ForeignKey(employee) 
    projects =   models.CharField(max_length=30)
