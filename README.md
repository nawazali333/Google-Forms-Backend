# Google-Forms-Backend


# Backend Server Description

1. The front end should make API calls to the backend for Saving Submissions and Retrieving Saved Submissions..
   
2. The backend will be an Express App made with TypeScript and using a JSON file as a database to store submissions. 

3. WThe backend should have the following endpoints -
   
        1. /ping - A GET request that always returns True
        2. /submit - A POST request with parameters "name", "email", "phone", "github_link" and "stopwatch_time"
        3. /read - A GET request with query parameter "index" which is a 0-index for reading the (index+1)th form submission.
  
4. JSON file (name it as "db.json") as a database for storing the submissions. which come up with a suitable structure for the JSON file. 


   


# Requirments

Visual Studio (2022 is prefferred)

TypeScript

Express

Libraries


# How to run

1. Just Download Google-Forms-App---Backend zip file
   
2. Setup envirnoment in visual studio
   
3. import necessary libraries
   
4. Compile the project
   
5. Run in cmd
       1. Intialize the project using below commond
            mkdir google-forms-app-backend
            cd google-forms-app-backend
            npm init -y
       2. Compile typescript using below commond
             tsc
       3. Run commond
           node dist/server.js

6. As Output interface Backend server will activate will be shown using http copy that url into browser

Note : dont forgot to intall all necessary libraries  before run 
