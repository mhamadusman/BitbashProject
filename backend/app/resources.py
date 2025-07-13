from flask import request
from flask_restful  import Resource
from .models import Job
from app import db


class JobListResource(Resource):
    def get(self):
        job_type = request.args.get('job_type')
        location = request.args.get('location')
        tags = request.args.getlist('tag')  # e.g., ?tag=AI&tag=ML

        query = Job.query

        if job_type:
            query = query.filter_by(job_type=job_type)
        if location:
            query = query.filter_by(location=location)
        if tags:
            for tag in tags:
                query = query.filter(Job.tags.like(f"%{tag}%"))

        query = query.order_by(Job.id.desc())

        job_list = [job.to_dict() for job in query.all()]

        if not job_list:
            return {"message": "No matching jobs found."}, 200

        return job_list, 200



            
    def post(self):
        data = request.get_json()
        required = ['title', 'company', 'location', 'country', 'posting_date', 'job_type', 'tags']

        # Find which required fields are missing or empty
        missing_fields = [f for f in required if not data.get(f)]

        if missing_fields:
            print("Missing fields:", missing_fields)  # <-- Clear logging
            return {"error": f"Missing required fields: {', '.join(missing_fields)}"}, 400
        else:
            print("all fields pressent")

        job = Job(
            title=data['title'],
            company=data['company'],
            country=data['country'],
            location=data['location'],
            posting_date=data['posting_date'],
            job_type=data['job_type'],
            tags=','.join(data.get('tags', []))
        )
        db.session.add(job)
        db.session.commit()
        return job.to_dict(), 201


class JobResource(Resource):
    def get(self, job_id):
        job = Job.query.get(job_id)
        if job:
            print("Job found with id and title:", job.id, job.title)
            return job.to_dict(), 200
        else:
            print("Job not found")
            return {"error": "Job not found"}, 404

    def put(self, job_id):
        job = Job.query.get(job_id)
        if not job:
            print("here not updating")
            return {"error": "Job not found with id"}, 404

        data = request.get_json()

        # Safely update all editable fields
        if 'title' in data:
            job.title = data['title']
        if 'company' in data:
            job.company = data['company']
        if 'location' in data:
            job.location = data['location']
        if 'country' in data:
            job.country = data['country']
        if 'posting_date' in data:
            job.posting_date = data['posting_date']
        if 'job_type' in data:
            job.job_type = data['job_type']
        if 'tags' in data:
            # Expecting tags to be a list, convert to comma-separated string
            job.tags = ','.join(data['tags']) if isinstance(data['tags'], list) else data['tags']

        # Commit to the database
        db.session.commit()

        return job.to_dict()

    def delete(self, job_id):
        job = Job.query.get(job_id)
        if not job:
            return {"error": "Job not found"}, 404

        db.session.delete(job)
        db.session.commit()
        return {"message": "Job deleted"}