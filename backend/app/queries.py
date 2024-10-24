from sqlalchemy.orm import Session
from .models import Process


def create_process(db: Session, **process):
    object = Process(**process)
    db.add(object)
    db.commit()
    db.refresh(object)
    return object

def get_process_by_id(db: Session, id: int):
    return db.query(Process).filter(Process.id == id).first()

def update_process_by_id(db: Session, id: int, status: str, content: str):
    object = db.query(Process).filter(Process.id == id)
    object.update({'status': status, 'content': content})
    db.commit()
