

var myApp = angular.module('app', ['ui.calendar','ui.bootstrap', 'angularMoment']);

myApp.controller('MainCtrl', function($scope, $filter, moment, uiCalendarConfig){
		//$scope.isEditEvent = false;
	$scope.eachDayEvents = [];
	$scope.totalHoursPerDay = 0;
	$scope.startDate = null;
	$scope.endDate = null;
	$scope.calendarDate = [{events:[]}];
	$scope.currentViewName;
	$scope.iseditevent = false;
	
	$scope.renderView = function(view) {
		$scope.toggle = true;
		$scope.hasError('a');
		$scope.currentViewName = view.name;
		$scope.currentviewmodal = view.name;
		
		uiCalendarConfig.calendars[0];
		EventsTitleToHours();
		if($scope.eachDayEvents.length > 0)
		{
			getTasksPerDay(view.start, true);
		}
		
	    
		//make server call only if week changes
		if(!moment($scope.startDate).isSame(view.start) && !moment($scope.endDate).isSame(view.End))
		{

			$scope.startDate = view.start;
			$scope.clickedDate = view.start;
			$scope.endDate = moment(view.end).add(-1,'days');

		//server call get events for a week intrval [start, end] $hhtp.post(start,end,'weekView') 
			$scope.projectList = [
				{NameId: 'SD', Name:'SheepDog', Type:'ClientProjects'}, 
				{NameId: 'ACC', Name:'Access', Type:'ClientProjects'}, 
				{NameId: 'ARR', Name:'Arrows', Type:'ClientProjects'}, 
				{NameId: 'EMR', Name:'Emerson', Type:'ClientProjects'},
				{NameId: 'INTERN', Name:'Internal', Type:'Internal'}, 
				{NameId: '10%', Name:'10%', Type:'TenPercent'}
			]; 
			$scope.taskList = { 
				TenPercent:['Own Time-Spending'], 
				ClientProjects:['Development', 'Meetings', 'Non-bilable', 'QA', 'QA NB'], 
				Internal:['Administrative', 'Evaluations', 'Meetings']
			};

			$scope.weekEvents =  
			{
				totals:[8,8,0,0,0,0,8],
						
						start: '2016-02-28',
						end: '2016-03-05',
						events:[
						{
							Project: 'SheepDog',
							ProjectNameId: 'SD',
							Task: 'Development',
							Hours: 8,
							backgroundColor: '#f26522',
							Comments: 'This task is about programming',
							Days: [4,0,0,0,0,0,4]
						},

						{
							Project: 'SheepDog',
							ProjectNameId: 'SD',
							Task: 'QA',
							Hours: 4,
							Comments: 'This task is about testing',
							Days: [4,0,0,0,0,0,0]
						},
						{
							Project: 'Access',
							ProjectNameId: 'AC',
							Task: 'Development',
							Hours: 8,
							Comments: 'This task is about programming',
							Days: [0,4,0,0,0,0,4]
						},
						{

							Project: 'Access',
							ProjectNameId: 'AC',
							Task: 'QA',
							Hours: 4,
							Comments: 'This task is about testing',
							Days: [0,4,0,0,0,0,0]
						}],
					};
					
					$scope.totalHoursPerWeek = TotalHoursInWeek($scope.weekEvents.totals); 
		

		//server call get events for a week intrval [start, end] $hhtp.post(start,end,'weekView') GetTasksForDayView  // cand vin sa fie orderBy id
		
				$scope.eachDayEvents =  
				[{
					title:8,
					id:0,
					events:[
					{
						Project: 'SheepDog',
						ProjectNameId: 'SD',
						Task: 'Development',
						Hours: 4,
						backgroundColor: '#f26522',
						Comments: 'This task is about programming',
					},
					{
						Project: 'SheepDog',
						ProjectNameId: 'SD',
						Task: 'QA',
						Hours: 4,
						Comments: 'This task is about testing',
					}],
				},

				{
					title:8,
					id:1,
					events:[
					{
						Project: 'Access',
						ProjectNameId: 'AC',
						Task: 'Development',
						Hours: 4,
						Comments: 'This task is about programming',
					},
					{

						Project: 'Access',
						ProjectNameId: 'AC',
						Task: 'QA',
						Hours: 4,
						Comments: 'This task is about testing',
					}],
				},
				{
					title:0,
					id:2,
					events:[],
				},
				{
					title:0,
					id:3,
					events:[],
				},
				{
					title:0,
					id:4,
					events:[],
				},
				{
					title:0,
					id:5,
					events:[],
				},
				{
					title:8,
					id:6,
					events:[{
						Project: 'SheepDog',
						ProjectNameId: 'SD',
						Task: 'Development',
						Hours: 4,
						backgroundColor: '#f26522',
						Comments: 'This task is about programming',
					},
					{
						Project: 'Access',
						ProjectNameId: 'AC',
						Task: 'Development',
						Hours: 4,
						Comments: 'This task is about programming',
					}		],
				}];
		
		   InitCalendar($scope.weekEvents.start);
		   $scope.theDayInWeek = view.start.day();
		   $scope.totalHoursPerDay = $scope.eachDayEvents[$scope.theDayInWeek].title;
		   $scope.weekeventslist = $scope.weekEvents.events;
		}
		
	}

	function InitCalendar(startDate){
		
		for(var i = 0;i < $scope.eachDayEvents.length; i++)
		{
			var newTask = {};
			newTask.title = $scope.eachDayEvents[i].title;	
			var date = moment(startDate).add(i,'days')
			newTask.start = date.format("YYYY-MM-DD");
			$scope.calendarDate[0].events.push(newTask);
		}
	}

	$scope.editComments = function($index){
		//get task and data
		var a = $scope.eachDayEvents[$scope.clickedDate.day()].events[$index];
		$scope.iseditevent = true;
		$scope.projectname = getProjectByName(a.Project);
		$scope.taskname = a.Task;

		$scope.comments = a.Comments;
		$scope.hours = a.Hours;


		//$scope.
	}

	$scope.deleteRow = function(rowIndex){

 		 //delete all events from DayView and update Calendar Object
 		 //DeleteAllEvent()

 		 var projectname = $scope.weekEvents.events[rowIndex].Project;
 		 var taskname = $scope.weekEvents.events[rowIndex].Task;
 		 for(var i=0;i<7;i++)
 		 {
 		 	var dayInWeekEvent = $scope.eachDayEvents[i].events.filter(function(item)
 		 	{
 		 		return item.Project === projectname && item.Task === taskname;
 		 	});
 		 	if(dayInWeekEvent.length != 0)
 		 	{
 		 		var index = $scope.eachDayEvents[i].events.indexOf(dayInWeekEvent[0]);
 		 		$scope.eachDayEvents[i].events.splice(index, 1);
 		 		$scope.eachDayEvents[i].title-=dayInWeekEvent[0].Hours;

 		    	//update calendar object
 		    	$scope.calendarDate[0].events[i].title  -= dayInWeekEvent[0].Hours;
 		    }
 		}

 		$scope.weekEvents.events.splice(rowIndex, 1);
 		RecalculateTotals();
 		}

	//on change - recalc totals per project,day,week / Update day Events in dayView / update calendar Object
	$scope.sumHours = function(rowIndex, dayInWeek, value)
	{
        		//calc totals per task
        		$scope.weekEvents.events[rowIndex].Days[dayInWeek] = value;
        		var a = $scope.weekEvents.events[rowIndex].Days;
        		$scope.weekEvents.events[rowIndex].Hours = TotalHoursInWeek(a);

        		//calc totals per day
        		RecalculateTotals();
        		
        		//UpdateDayEvents()
        		var projectname = $scope.weekEvents.events[rowIndex].Project;
        		var taskName = $scope.weekEvents.events[rowIndex].Task;
        		var projectNameId = $scope.weekEvents.events[rowIndex].ProjectNameId;
        		var dayInWeekEvent = $scope.eachDayEvents[dayInWeek].events.filter(function(item)
        		{
        			return item.Project === projectname && item.Task === taskname;
        		});
        		if(dayInWeekEvent.length != 0) // edit one day event hours
        		{		
        			//if value is 0 then delete the task from day view
        			if(value > 0)
        			{
        				dayInWeekEvent[0].Hours = value;
        			}
        			else
        			{
        				var index = $scope.eachDayEvents[dayInWeek].events.indexOf(dayInWeekEvent[0]);
        				$scope.eachDayEvents[dayInWeek].events.splice(index, 1);
        				$scope.eachDayEvents[dayInWeek].title-=dayInWeekEvent[0].Hours;
        			}
        		}
        		else
        		{
        			// it a new task in a existing project
        			var newProjectEntry = {};
        			newProjectEntry.Project = projectname;
        			newProjectEntry.Task = taskname;
        			newProjectEntry.ProjectNameId = projectNameId;
        			newProjectEntry.Comments = ''	;
        			newProjectEntry.Hours = value;

        			$scope.eachDayEvents[dayInWeek].events.push(newProjectEntry);
        		}

        		//UpdateTotalPerDay
        		$scope.eachDayEvents[dayInWeek].title = 0;
        		for(var i=0; i < $scope.eachDayEvents[dayInWeek].events.length; i++)
        		{
        			$scope.eachDayEvents[dayInWeek].title += $scope.eachDayEvents[dayInWeek].events[i].Hours;
        		}
        		
        		//TODO put this in a function
        		//UpdateCalendarObject() 
        		$scope.calendarDate[0].events[dayInWeek].title = $scope.eachDayEvents[dayInWeek].title;
        	}

	//after add refresh day event list panel
	$scope.refreshDayEvents = function( event, element, view ) { 
		getTasksPerDay($scope.clickedDate, true);
	}

	$scope.getDayTasksByDate =  getTasksPerDay;

	$scope.getDayTasksByEvent =  function(event, allDay, jsEvent, view){

		if (allDay && $scope.currentViewName != 'allProjectsInWeekView') {

    			 	//TODO : click on data too and display panel

    			 	SaveClickedDate(event.start);

    			 	$scope.theDayInWeek  =  event.start.day();
					//calculate subTotals per day
					$scope.totalHoursPerDay = $scope.eachDayEvents[$scope.theDayInWeek].title;
				}
			};

			$scope.uiConfig = {
				calendar : {

					header: {
						center: 'prev,next today',
						left: 'title, allProjectsInWeekView',
						right: 'basicWeek' 
					},

					views: {
						name:'customWeekView',
						allProjectsInWeekView: {
							type: 'basicWeek',
							buttonText: 'Week'
						}
					},

					defaultView: 'basicWeek',
					selectable: true,
					editable: true,
					eventLimit: true,
					contentHeight: 'auto',
			
			eventAfterRender: $scope.refreshDayEvents,
			dayClick : $scope.getDayTasksByDate, //$scope.setCalDate,
			eventClick : $scope.getDayTasksByEvent,
			viewRender: $scope.renderView,
			getView: $scope.getCurrentView,
			background: 'red',
			editable : false,
			aspectRatio: 2,
		},
	};
	
	//modal data //TODO: move this at the beginning of the controller
	$scope.header = 'New Time Entry';
	$scope.headerdate = FormatDateModalView($scope.clickedDate);
	$scope.body = 'Project / Task';
	$scope.footer = 'Put here your footer';
   
	//handle comments in day view //TODO: change to edit all events properties in day
 	$scope.$on('addCommentsTaskInDayView', function(e, data) {
 		
 		/*var newProjectEntry = {Project: data.projectname.Name, 
 			ProjectNameId: data.projectName.NameId,
 			Task: data.taskname, 
 			Hours:0,
 			Comments: data.comments, 
 			Days: [0,0,0,0,0,0,0],
 			start: moment( $scope.clickedDate ).format('YYYY-MM-DD'),
 		};*/

 		var task = $scope.eachDayEvents[$scope.clickedDate.day()].events.filter(function(item)
 		{
 				return item.Project === data.Project && item.Task === data.Task;
 		});

 		if(task.length > 0)
 		{	
 		    task[0].Comments = data.Comments;
 		}

 		//$scope.weekEvents.events.push(newProjectEntry);
 	});

    //handle add new task in day view
    $scope.$on('addTaskInDayView', function(e, data) {
    	var newProjectEntry = {Project: data.projectname.Name, 
    		ProjectNameId: data.projectname.NameId,
    		Task: data.taskname, 
    		Comments: data.comments, 
    		Hours: parseFloat(data.hours) === NaN ? 0 : parseFloat(data.hours) , 
    		start: moment( $scope.clickedDate ).format('YYYY-MM-DD'),
    	};
			    //update dayView data
				var dayEvent = $scope.eachDayEvents[$scope.theDayInWeek];
				dayEvent.events.push(newProjectEntry);
				dayEvent.title+= newProjectEntry.Hours;
				$scope.totalHoursPerDay = dayEvent.title;

				//Update Totals per day in Calendar internal object
				$scope.calendarDate[0].events[$scope.theDayInWeek].title = $scope.totalHoursPerDay;

				//UpdateWeekView
				//check if weekEvents have this Project-Task combination already - validation
				var existingProjectTaskCombination = $scope.weekEvents.events.filter(function(item)
				{
					return item.Project === newProjectEntry.Project && 
					item.Task === newProjectEntry.Task;
				});

			   //update totals
				updateWeekEventsColumnHours($scope.theDayInWeek, newProjectEntry.Hours)
				
				//if its a new ProjectTask combination
				if(existingProjectTaskCombination.length == 0)
				{
					var newWeekDisplayTask = newProjectEntry;
					
					newWeekDisplayTask.Days = [0,0,0,0,0,0,0];
					newWeekDisplayTask.Days[$scope.theDayInWeek] = newWeekDisplayTask.Hours;
					
					$scope.weekEvents.events.push(newWeekDisplayTask);
				}
				else
				{
					existingProjectTaskCombination[0].Days[$scope.theDayInWeek]+= newProjectEntry.Hours;
					existingProjectTaskCombination[0].Hours+= newProjectEntry.Hours;
				}

			});

 	//handle add new task in day view
 	$scope.$on('addTaskInWeekView', function(e, data) {
 		var newProjectEntry = {Project: data.projectname.Name, 
 			ProjectNameId: data.projectname.NameId,
 			Task: data.taskname, 
 			Hours:0,
 			Comments: data.comments, 
 			Days: [0,0,0,0,0,0,0],
 			start: moment( $scope.clickedDate ).format('YYYY-MM-DD'),
 		};

 		$scope.weekEvents.events.push(newProjectEntry);
 	});

 	$scope.hasError = function hasError(field, form, submitted, validation){
 		var s = $scope.events;
 		if(form){
 			if(!form[field])
 				return false;
 			if(validation){
 				var validationError = form[field].$error[validation];
 				return submitted && validationError;
 			}
 			return submitted && form[field].$invalid;
 		}
 	}	

   	//private functions
   	function getProjectByName(projectName){
   		var projects = $scope.projectList.filter(function(item){
					   		return item.Name === projectName;
					    });
   		return projects[0];
   	}

   	function setWeekEnventsColumnHours(index, totalHours) {
   		$scope.weekEvents.totals[index] = isNaN(totalHours) ? 0 : totalHours;
   	}

   	function updateWeekEventsColumnHours(index, hours) {
   		if(!isNaN(hours) || hours > 0 )		
   			$scope.weekEvents.totals[index] += hours;
   	}

   	function RecalculateTotals()
   	{
   		var totals = new Array();
   		for(var i = 0; i < $scope.weekEvents.events.length; i++)
   		{
   			totals[i] = $scope.weekEvents.events[i].Days.slice(0);
   		}	

   		var total;
   		for (var col = 0; col < 7; col++)
   		{
   			total = 0;
   			for (var row = 0; row < totals.length; row++){
   				total += totals[row][col];
   			}
   			setWeekEnventsColumnHours(col, total);
   		}	

        //recalc total per week
        $scope.totalHoursPerWeek = TotalHoursInWeek($scope.weekEvents.totals);	
    }	

    function TotalHoursInWeek(totals)
    {
    	var count = 0;
    	totals.forEach(function(item) {
    		count+= item;
    	});
    	return count;
    }

    function getTasksPerDay(date, allDay, jsEvent, view){

    	if (allDay && $scope.currentViewName  != 'allProjectsInWeekView') {

    		SaveClickedDate(date);
    		$scope.theDayInWeek  =  date.day();
    		$scope.totalHoursPerDay = $scope.eachDayEvents[$scope.theDayInWeek].title;
    	}
    };

    function SaveClickedDate(date)
    {
    	$scope.clickedDate = date;
    }

  	function FormatDateEventEntry(date){
			return moment( date ).format('YYYY-MM-DD');
		}

	function FormatDateModalView(date) { 

			if(typeof date === 'undefined')
			{
				date = new Date();

			}
			var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
			var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

			var day = days[ date.getDay() ];
			var month = months[ date.getMonth() ];
			return day + ',' + ' ' + date.getFullYear().toString().substr(2,2) + ' ' + month;
		}
	//adds hours in title for each event
	function EventsTitleToHours()
		{
			var eventList = $scope.calendarDate[0].events;
			for(var i=0; i < eventList.length; i++)
			{
				eventList[i].title = parseFloat(Math.round(eventList[i].title * 100) / 100).toFixed(2);
			}
		}

	} );

myApp.directive('modal', function () {
	return {
		restrict: 'EA',
		scope: {
			projectlist: '=projectlist',
			projectGroups: '=projectGroups',
			taskList: '=taskList',
			title: '=modalTitle',
			header: '=modalHeader',
			headerdate: '=modalHeaderdate',
			body: '=modalBody',
			footer: '=modalFooter',
			callbackbuttonleft: '&ngClickLeftButton',
			callbackbuttonright:'&ngClickRightButton', 
			callbackbuttonrightweek: '&ngSaveTaskWeekView',
			handler: '=lolo',
			taskname: '=modalTaskname',
			projectname: '=modalProjectname', 
			comments: '=modalComments',
			hours: '=modalHours',
			iseditevent: '=modalIseditevent',
			currentviewmodal:'=modalCurrentviewmodal',
			weekeventslist: '=modalWeekeventslist',
		},

		templateUrl: 'app/calendar/partialModal.html',
		transclude: true,

		controller: function ($scope, $http) {
			$scope.handler = 'pop'; 
			$scope.projectlist = [
				{NameId: 'SD', Name:'SheepDog', Type:'ClientProjects'}, 
				{NameId: 'ACC', Name:'Access', Type:'ClientProjects'}, 
				{NameId: 'ARR', Name:'Arrows', Type:'ClientProjects'}, 
				{NameId: 'EMR', Name:'Emerson', Type:'ClientProjects'},
				{NameId: 'INTERN', Name:'Internal', Type:'Internal'}, 
				{NameId: '10%', Name:'10%', Type:'TenPercent'}
			]; 
			$scope.taskList = { 
				TenPercent:['Own Time-Spending'], 
				ClientProjects:['Development', 'Meetings', 'Non-bilable', 'QA', 'QA NB'], 
				Internal:['Administrative', 'Evaluations', 'Meetings']
			};

			$scope.projectTypes=['TenPercent','ClientProjects','Internal']

			//TODO: delete	
			$scope.change = function(){
				var project = $scope.projectlist.filter(function(proj){
					return proj.Name === $scope.projectname.Name;
				});		
				return $scope.projectType = project[0].Type;
			}

			$scope.callbackedittaskcomments = function(projectname, taskname, comments, hours){
				var data={};
				data.projectname = projectname;
				data.taskname = taskname;
				data.comments = comments;
				data.hours = hours;
				$scope.$emit('addCommentsTaskInDayView', data);
			}

			$scope.callbackbuttonright = function(projectname, taskname, comments, hours){
				var data={};
				data.projectname = projectname;
				data.taskname = taskname;
				data.comments = comments;
				data.hours = hours;
				$scope.$emit('addTaskInDayView', data);
			}

			$scope.callbackbuttonrightweek = function(projectname, taskname, comments, hours){
				var data={};
				data.projectname = projectname;								
				data.taskname = taskname;
				data.comments = comments;
								//validate duplicate Project-Task
				var existingProjectTaskCombination = $scope.weekeventslist.filter(function(item)
				{
					return item.Project === projectname.Name && 
					item.Task === taskname;
				});
				if(projectTaskCombinationExists(projectname.Name, taskname))
				{
					$scope.$emit('addTaskInWeekView', data);	
				}
				else
				{
					//show validation errror
				}
								
			}
			
			//check for duplicate Project-Task
			function projectTaskCombinationExists(projectName, taskName){
				var existingProjectTaskCombination = $scope.weekEventsList.filter(function(item)
				{
					return item.Project === projectName && item.Task === taskName;
				});

				return existingProjectTaskCombination.length == 0;
			}
		},
	};
				
});

