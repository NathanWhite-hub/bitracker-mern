# Bitracker
A fully functional Corporate performance management web app based dashboard made with MERN stack.

![Dashboard Home](https://i.imgur.com/9EwJXmX.png)

## Introduction
The idea of Bitracker came in October 2021 for my company to handle data management and to offer technicians ease of access in the field. Without notifying my bosses, I began work on Bitracker and attempted to tackle key issues observed through the project my company was undertaking. I decided to write the web app in ReactJS, and more specifically utilize the MERN stack. This was my first time writing in ReactJS, NodeJS, and Javascript this in-depth. Work concluded in December 2021 with 200+ hours put into Bitracker. I presented it to my bosses who were ecstatic with the work I had accomplished. Field testing was then commenced with Bitracker being deployed via Netlify (Front-End) and Heroku (Back-End), and used in a production environment in one of the world's largest hospital systems.

Reception from both technicians and management was wonderful with only minor bugs being reported. Unfortunately due to funding issues, the web app could not move forward, so I have decided to release my work for others to use and learn from.

## Authentication
Authentication was something I decided to tackle early on before moving on to the meat and potatoes of the application. I chose to handle authentication via Passport JS's local strategy as I found this to be the most secure method I could implement at that moment. User passwords are hashed in the database and require at least seven characters.

## Users

### Cart Tracking
Under the rounding tab, users are greeted with a table provided by Material UI's library. This table tracks the carts that the user "rounded" and displays the serial number of the cart, the workstation number, and the date the cart was rounded on (see image below). If the user indicated a repair needed with the cart while rounding it, the table will highlight that row in red.

![User Table](https://i.imgur.com/jIQi76V.png)

### Rounding a Cart
When a user is ready to round a cart they will be required to enter the Cart Serial Number and PC Number. If there are any repairs needed, they may select any of the option checkboxes to indicate the type or types needed, as well as enter notes to review later. They must then select which hospital this cart was rounded at. If the cart already exists in the database, it will update the document rather than creating a new one.

![Create Cart](https://i.imgur.com/57VaANV.png)

## Management
The design philosophy behind Bitracker was that each tab on the dashboard was considered what I called a "module" and could be linked together or communicate with other modules. The management module was designed not only to provide managers with the ability to create new users and edit them but also to provide an up-to-date dashboard with statistics regarding the carts rounded monthly. There were plans to add in quarterly reports, however, the project was scrapped before implementation.

### Management Dashboard
Managers are greeted with a pie graph displaying the current month's total carts rounded and the percentages that required repair versus those that did not.

### Create Users
From here, a manager can create a new user, assign them to a team, give them a username and password, as well as set permissions. If the manager checks management permissions, a warning will display detailing that giving this user these permissions will allow them full management access.

### Manager Table
Similar to the user's rounding table, however, this table displays every cart rounded for the current month, as well as the technician's name, and the hospital rounded at. The manager can export this table to a CSV file for data processing. This table is updated in real-time while technicians are adding carts.

### Report Generation
Managers can generate a PDF report that contains detailed statistics. The report will display the company logo, the current month and year, the current quarter, as well as the total number of carts rounded, the same pie graph on the manager dashboard, and a total of each category of repair. At the bottom of the report will be the user's full name who generated the report as well as the date and time.

## Closing Thoughts
The feedback from this project was incredible and to see it used in a real production environment was humbling. By the project's end, the database held a total of approximately 2,500 carts all rounded by technicians. This was my first time for quite a lot; from authentication, writing a back-end API, database design, to even writing in ReactJS. I'd like to give thanks to Curtis for giving me tips during the development of this app.
