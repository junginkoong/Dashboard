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

