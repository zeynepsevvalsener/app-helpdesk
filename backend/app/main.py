from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from .routers import tickets


from .db import SessionLocal, engine
from .models import Base, Ticket, User
from .schemas import TicketCreate, TicketRead, UserCreate, UserRead, TicketUpdate
from .core.auth import get_current_user, get_current_role, require_support_role, require_customer_role
from .routers import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HelpDesk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tickets.router)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    current_role: str = Depends(get_current_role)
):
    query = db.query(Ticket)
    if current_role == "customer":
        query = query.filter(Ticket.user_id == current_user.id)
    total = query.count()
    new = query.filter(Ticket.status == "Yeni").count()
    open_ = query.filter(Ticket.status == "Açık").count()
    closed = query.filter(Ticket.status == "Kapalı").count()
    return {"total": total, "new": new, "open": open_, "closed": closed}

