from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_restful import Api
db = SQLAlchemy()
from .resources import JobListResource, JobResource
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///jobs.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    CORS(app)

    api = Api(app)
    db.init_app(app)
    from . import models

    api.add_resource(JobListResource, '/jobs')
    api.add_resource(JobResource, '/jobs/<int:job_id>')
    
    with app.app_context():
        db.create_all()

    return app