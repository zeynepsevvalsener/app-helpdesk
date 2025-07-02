from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

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

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/tickets", response_model=TicketRead)
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    current_role: str = Depends(require_customer_role)
):
    db_ticket = Ticket(**ticket.dict(), user_id=current_user.id)
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@app.get("/tickets", response_model=list[TicketRead])
def list_tickets(
    status: Optional[str] = None,
    priority: Optional[str] = None,
    sort: Optional[str] = "newest",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    current_role: str = Depends(get_current_role)
):
    query = db.query(Ticket)
    if current_role == "customer":
        query = query.filter(Ticket.user_id == current_user.id)
    if status:
        query = query.filter(Ticket.status == status)
    if priority:
        query = query.filter(Ticket.priority == priority)
    if sort == "oldest":
        query = query.order_by(Ticket.created_at.asc())
    else:
        query = query.order_by(Ticket.created_at.desc())
    tickets = query.all()
    return tickets

@app.get("/tickets/{ticket_id}", response_model=TicketRead)
def get_ticket(
    ticket_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    current_role: str = Depends(get_current_role)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(404, "Ticket not found")
    if current_role == "customer" and ticket.user_id != current_user.id:
        raise HTTPException(403, "Access denied")
    return ticket

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

@app.put("/tickets/{ticket_id}", response_model=TicketRead)
def update_ticket(
    ticket_id: int,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    current_role: str = Depends(require_support_role)
):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket:
        raise HTTPException(404, "Ticket not found")
    for field, value in ticket_update.dict(exclude_unset=True).items():
        setattr(ticket, field, value)
    db.commit()
    db.refresh(ticket)
    return ticket
