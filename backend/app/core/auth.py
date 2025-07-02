from fastapi import HTTPException, Depends, Header
from sqlalchemy.orm import Session
from typing import Optional
from ..db import get_db
from ..models import User

def get_current_user(
    x_username: Optional[str] = Header(None),
    db: Session = Depends(get_db)
) -> User:
    if x_username:
        user = db.query(User).filter(User.username == x_username).first()
        if user:
            return user
    raise HTTPException(status_code=401, detail="Not authenticated")

def get_current_role(current_user: User = Depends(get_current_user)):
    return current_user.role

def require_support_role(current_role: str = Depends(get_current_role)):
    if current_role != "support":
        raise HTTPException(status_code=403, detail="Support role required")
    return current_role

def require_customer_role(current_role: str = Depends(get_current_role)):
    if current_role != "customer":
        raise HTTPException(status_code=403, detail="Customer role required")
    return current_role 