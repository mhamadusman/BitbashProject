import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from app.models import Job
from app import db, create_app
import time
import random

def scrape_actuary_jobs():
    app = create_app()

    # Job types list
    job_types = ["Remote", "Full Time", "Onsite", "Part Time", "Freelancer", "Contract", "Internship"]

    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    driver.get("https://www.actuarylist.com")
    time.sleep(5)  # Wait for JS to load content

    jobs_data = []
    jobs = driver.find_elements(By.TAG_NAME, "article")
    print(f"Found {len(jobs)} jobs")

    for job in jobs:
        try:
            title = job.find_element(By.CLASS_NAME, "Job_job-card__position__ic1rc").text.strip()
            company = job.find_element(By.CLASS_NAME, "Job_job-card__company__7T9qY").text.strip()
            country = job.find_element(By.CLASS_NAME, "Job_job-card__country__GRVhK").text.strip()

            location = job.find_element(By.CLASS_NAME, "Job_job-card__location__bq7jX").text.strip()
            days = job.find_element(By.CLASS_NAME, "Job_job-card__posted-on__NCZaJ").text.strip()
            tag_elements = job.find_elements(By.CSS_SELECTOR, "div.Job_job-card__tags__zfriA a")

            # Random job type selection
            job_type = random.choice(job_types)

            tags_list = []
            for tag in tag_elements:
                tag_text = tag.text.strip()
                if tag_text: 
                    tags_list.append(tag_text)

            # Only take the first 5 tags if available
            if len(tags_list) > 0:
                tags = ", ".join(tags_list[:5])
            else:
                tags = "Full Time"  # leave it empty if no tags found

            jobs_data.append({
                "Title": title,
                "Company": company,
                "Location": location,
                "Country": country,
                "Tags": tags,
                "job_type": job_type,
                "days": days
            })

        except Exception as e:
            print("Error extracting job info:", e)

    driver.quit()
    with app.app_context():
        for job in jobs_data:
            if not job['Title'] or not job['Company'] or not job['Country'] or not job['Location'] or not job['days'] or not job['job_type'] or not job['Tags']:
                print(f"New job saved: {job['Title']} at {job['Company']}")
                continue  

            new_job = Job(
                title=job['Title'],
                company=job['Company'],
                country=job['Country'],
                location=job['Location'],
                posting_date=job['days'],
                job_type=job['job_type'],
                tags=job['Tags']
            )
            db.session.add(new_job)

            try:
                 db.session.commit()
                 print(f"Saved {len(jobs_data)} jobs")
            except Exception as e:
                print("Error saving job:", e)
                db.session.rollback()

if __name__ == "__main__":
    scrape_actuary_jobs()