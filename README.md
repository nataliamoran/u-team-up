# team17

# Instructions 

## Installation

To install on your computer:

1. Go into u_team_up_app folder on terminal.
2. Type "npm install".
3. Type "npm start" or click on index.html to view the website.

## Pre-login Functionality

There are some features of the website, that a guest user
(non-logged-in user), can access. We can search current teams, and can 
view them. If we click on the menu, we see "Login" and "Sign Up". 

## How to Sign Up

Click on Sign Up on the menu, and this will take you to the sign up
page. Here, you can enter your information to sign up. 

## How to Login

To Login as user 1, the username and password are "user" and "user", 
respectively. To Login as user 2, the username and password are "user2" 
and "user2", respectively. To Login as admin, the username and password 
are "admin" and "admin", respectively. Once logged in, you can view user 
and admin functionality by browsing the menu.

## End-user instructions for User (post-Login)

You start at the team-search page, the core functionality of the webapp.
You are a student at a university, and would like to search for team advertisements
and join a team. Once you click join, you can view the team profile, answer the quiz 
questions and click apply to submit you application to the team. 

If you'd like to create your own team, enter University, Course
and Team Description into the input fields and click CREATE. 

If you'd like to view Your Profile, Your Inbox or Your Appointments, click
on the menu, and then click on the respective button. In your Profile, you can also view your
applications (teams you've applied to) and invitations (teams that have invited you). You can
edit your information by clicking on edit profile. 

If you'd like to search for a fellow student/user (perhaps a friend from class),
open menu and click on Search Students, where you can enter the student's information
and then click Search. And you can view student profile, by clicking on the student.  

Once you've made it into a team, you can edit the team profile by clicking on Edit Profile
on the team profile page (which you visited earlier), and edit team information. To see team 
appointments, click Team Calendar. To see team applications, click on Team Applications. 
Here you can also view applications (students who've applied to your team) and invitations 
(students your team has invited). 

If you'd like to Logout, go to Menu and click Logout. 

## End-user instructions for Admin (post-Login)

You start at the team-search page, the core functionality of the webapp.
You are an admin of the webapp, and would like to search for team advertisements
and view team profiles. Once you click join, you can view the team profile and see 
their calendar. 

If you'd like to create a new team, enter University, Course and Team Description 
into the input fields and click CREATE. 

If you'd like to search for students/users, open menu and click on Search Students, where you 
can enter the student's information and then click Search. And you can view student profile, 
by clicking on the student.  

You can edit the team profile by clicking on Edit Profile on the team profile page 
(which you visited earlier), and edit team information.

If you'd like to see the admin dashboard, to view its various functionalities, go to Menu and click
Admin Dashboard. Here, you can view, add and remove Administrators. You can create a student profile. 
You can view, add and remove universities. You can view, add and remove courses. All of this you can do, 
by clicking the respective links at the top of the page.

# Frontend Functionality

## Page structure

In the following sections, we will be defining and using these terms:

1. The page refers to all the content shown in the browser window/tab.
2. The navigator refers to the horizontal bar located on the top of
   the page, together with all content within it.
3. An action refers to a link or button that leads the visitor to
   somewhere *within* the website.
4. A view refers to everything on the page except the navigator.
   There can be only one view at a time in the page, but the view
   may change when the visitor is clicking on an action. View names
   are represented in **bold font**.

## Navigator

There are three main components in the navigator: the back button,
the app title, and the menu.

The back button allows you to go back to a previous view when you
click on it.

The app title shows the name of this web app, and will lead you to
the default view (**team search**) when you click on it.

The menu, when clicked, will show a list of actions, depending on
whether the visitor is logged in or not, and its identity (admin
or normal user).

## Views

### Team Search
**Team Search View** has 2 modes:
 - Unregistered User 
 - Registered User: Student / Admin
 
 
  - Unregistered User can see only the 'Search' form and can filter existing teams
  using 'University' and 'Course' filter parameters.
  Clicking on each team's button 'Join', shown in the search results, will lead the
   user to this team profile.
  
  
  - Registered User: Student / Admin
  
  Registered User mode includes the search form described above. Also this mode has 'Create a New Team'
  form at the top of the view. To create a new team the user needs to provide 'University',
  'Course' and 'Description' information and click on the button 'Create'. A new team
  will immediately appear at the **Team Search View**.
  
  **IMPORTANT:** new teams do not have a **Team View** (because their data is not hardcoded
  in the **Team View**), clicking on the button 'Join' for the newly created teams will
  result in an error (when the backend is implemented, this error wouldn't exist because 
  the new team data will be pulled from the database).

### Team 
**Team View** has 5 modes:
 - Unregistered User
 - Registered User: Student - VIEW Mode
 - Registered User: Student - EDIT Mode
 - Registered User: Admin - VIEW Mode
 - Registered User: Admin - EDIT Mode
 
 
 - Unregistered User can only view team information: team description, team members and quiz.
 
 
 - Registered User: Student - VIEW Mode: 
 
 If a student is the team member 
 then she/he can see and use 'Edit Team Profile', 'Team Calendar' and 'Applications'
 buttons in the top right corner of the view.
 Team members can see the quiz, but without the 'Apply' button.
 
 If a student is not a team member then she/he will not see the team configuration buttons.
 Non-member can answer quiz questions and submit application to join the team,
 using the button 'Apply'.
 
 
 
 - Registered User: Student - EDIT Mode:
 
 Button 'Edit Team Profile' switches the view to the EDIT mode. Team member can 
 edit the team description, remove team members, add/remove quiz questions,
 close the team for new applications or delete the team.
 
 
 - Registered User: Admin - VIEW Mode:
 
 Admin can see the team description, team members and quiz (without 'Apply' button).
 'Edit Team Profile' button in the right top corner of the view switches the view to
 the admin EDIT mode.
 
 
 - Registered User: Admin - EDIT Mode
 Admin can add and remove team members or delete the team.

### Student Search
**Student Search View** has 2 modes:
 - Unregistered User / Registered User: Student
 - Registered User: Admin
 
 
 - Unregistered users and registered student users can use the search form to search 
 for a student, using 'name', 'university' and 'course' filter options. Each student has 
 multiple courses; in the hardcoded data, both students (uid#1 and uid#2) have 'CSC309' 
 course. Student #1 (Alice Alison) is also registered to 'CSC207' and Student #2 (Bob Bobson) is registered
 to 'CSC369'. Both students have 'UofT' as their university.
 Clicking on a student profile picture, shown in the search results, will lead the
 user to this student profile.
 
 
 - Admin mode includes the search form described above as well as the functionality 
 to create and remove students. To create a new student the admin needs to provide 
 the student's name and university in the 'Create a New Student' form at the top of the view.
 To remove a student the admin can press the 'Remove' button located near each student.

### Team Appointments and User Appointments

These views only allows users to access.

In each view, there would be a calendar. The buttons on the top of
the calendar can be used to switch to different months. Below it
there are all the days in this month, and also some days of the
next or last month, if there is space remaining. Each day is
clickable, and will select that day on click. Under the number for
each day there will display events for that day. (Sample events are
all in February.)

The very bottom of the page sits the "add event" form. You can input
the time in H:M format. Once a valid time representation is filled
in, a preview will display on the calendar. The date for the new
event is set to the selected date, and you can select other days in
the calendar if you need to change. Clicking "Add Event" button will
put the event in the calendar formally.

### Message Box

This view only allows users to access.

In this view, there is a list of messages you have received. The
type, sender, title and content of each message will be displayed.
Unread messages will be marked with a light background.

### Team Applications and Invitations

Here you can view applications (students who've applied to your team) and invitations 
(students your team has invited). 

### Admin Dashboard

Here, you can view, add and remove Administrators. You can create a student profile. 
You can view, add and remove universities. You can view, add and remove courses. All of this you can do, 
by clicking the respective links at the top of the page.

### Student Profile

Each student user will have a profile page. After logged in, the user will be able to edit his/her own profile information including name, university, year and major of study, courses taken, currrent courses, description, location, GPA, past project, past experience by clicking the "edit your profile" button on the bottom right of the page.

To see his/her current applications and team invitations, click on "My application" link above the "description" section on the top right of the page.

Student user can also edit the "Reviews" section of other users by going to other user's profile page and typing a review then clicking on the "ADD" button, then a review will be added to that user's profile page.

### Student Applications and Invitations 

Here, you can view your applications (teams you've applied to) and 
invitations (teams that have invited you). 

### Your Profile

You can view your own information, and edit them by clicking on edit profile. 
In your Profile, you can also view your applications (teams you've applied to) 
and invitations (teams that have invited you). 

### Your Inbox

Your messages. 



