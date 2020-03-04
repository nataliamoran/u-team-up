# team17

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
