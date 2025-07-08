# Dashboard

Django := Fetch json data from third party API for GET request. (Maybe add reverse flag)
python manage.py runserver

React := fetch data via Django GET API call and display in Chart & Table.
npm run dev

Note for Improvements:
Filtering := if users use filtering function heavily, we can invest more time into developing a more convinient 
            filtering interactions such as adding a panel on the right to view/edit all filters.

API call := If we had access to the database, we would create a script to backfill all the currency rate data
            and have the backend run a query on the database instead of third party api. Additionally, a script
            can run monthly or daily to keep the database up-to-date

Database := Non relational database would be best. There are no complex queries needed, and no strong links between tables
            required. Maybe Reddis might be best since it utalizes key-value for fast read operations.

Caching := We can utalize caching between the service and database layer such that the service first checks for cache
            then proceeds to database if no cache found. 

