from sqlalchemy import Column, String, Integer
from .database import Base

class Process(Base):
    __tablename__ = 'processes'

    id = Column(Integer, primary_key=True, index=True)
    path = Column(String, index=True)
    status = Column(String, index=True)
    content = Column(String, index=True, default='')
