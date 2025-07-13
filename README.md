# Job Listing App

A full-stack job listing web application with a **React.js frontend** and a **Flask RESTful API backend**. It allows job listings to be added, fetched, updated, and deleted. The backend is connected to a SQLite database and can be populated using a Selenium-based scraper.

# video links 
### backend link 
- https://drive.google.com/file/d/1PHg27hlvC41NU4iZW2rXQbp33Sbn7XHx/view?usp=drive_link
### front end 
- https://drive.google.com/file/d/1svWRuuUY-Wp9_f7N6vzCdusgi5TNiNQa/view?usp=drive_link

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Python (Flask + Flask-RESTful)
- SQLite
- Virtual environment (`env`)
- Selenium

---

##  Features

- Job CRUD operations
- Job scraper to populate the database
- Responsive frontend UI
- RESTful API design
- Environment and version control

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
# #Required 
#  node (v22.14.0) 
#  (Python 3.12.0
#  Flask 3.1.1
# -Werkzeug 3.1.3

git clone https://github.com/your-username/job-listing-app.git
cd job-listing-app

cd FrontEnd
npm install
npm start

cd ..
cd backend
python -m venv env
env\Scripts\activate  

#you will find requirements.txt install it 
pip install -r requirements.txt
#now everything has setup. there is need to run backend project so that it creates databse files after it we will scrap data
python run.py
#now run python scrapper.py
python Scrapper.py
#will initialize data base, you don't need to download chromweb driver it will acutomatically downlaod depending you your version.

## Assumptions

#I used **SQLite** as the database because the dataset is limited and not very large.  
#It is simple, lightweight, and easy to set up for development.






