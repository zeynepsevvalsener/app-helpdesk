from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "customer"

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Ticket schemas
class TicketBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "Yeni"
    priority: str = "Orta"

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None

class TicketRead(TicketBase):
    id: int
    created_at: datetime
    user_id: int
    user: Optional[UserRead] = None

    class Config:
        orm_mode = True
