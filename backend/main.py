from fastapi import FastAPI, UploadFile, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.utils import random_string
from app.database import SessionLocal, engine
from app.models import Process
from app.settings import settings
from app.queries import create_process, get_process_by_id, update_process_by_id
from app.analyze import search_strings, analyze_strings

import os
import json

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

Process.metadata.create_all(bind = engine)

# Dependency
def get_db():
    db = SessionLocal()
    try: 
        yield db
    finally: 
        db.close()

def analyze_file(db, process_id):
    process = get_process_by_id(db, process_id)

    strings = search_strings(process.path)
    content = analyze_strings(strings)

    os.remove(process.path)
    update_process_by_id(db, process_id, 'COMPLETE', json.dumps(content))

@app.post('/api/upload/')
async def upload(file: UploadFile, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    contents = await file.read()
    filename_split = file.filename.split('.')
    path = settings.files_folder + random_string(length=6)

    if len(filename_split) > 1:
        path += '.' + filename_split[-1]

    with open(path, 'wb') as f:
        f.write(contents)

    process = create_process(db, path = path, status = 'ANALYZING')

    background_tasks.add_task(analyze_file, db, process.id)
    
    return { 'process': process }

@app.get('/api/process/{process_id}/')
async def get_process(process_id: int, db: Session = Depends(get_db)):
    return { 'process': get_process_by_id(db, process_id) }
