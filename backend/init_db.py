#!/usr/bin/env python3
"""
Database initialization script for HelpDesk application
Creates sample users and tickets for testing
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db import SessionLocal, engine
from app.models import Base, User, Ticket
from datetime import datetime, timedelta

def init_database():
    """Initialize database with sample data"""
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        print("Initializing database with sample data...")
        
        # Create sample users with plain text passwords
        customer1 = User(
            username="alice",
            email="alice@example.com",
            role="customer",
            password_hash="alicepass"
        )
        customer2 = User(
            username="bob",
            email="bob@example.com",
            role="customer",
            password_hash="bobpass"
        )
        support1 = User(
            username="carol",
            email="carol@example.com",
            role="support",
            password_hash="carolpass"
        )
        support2 = User(
            username="dave",
            email="dave@example.com",
            role="support",
            password_hash="davepass"
        )
        db.add_all([customer1, customer2, support1, support2])
        db.commit()
        db.refresh(customer1)
        db.refresh(customer2)
        db.refresh(support1)
        db.refresh(support2)
        
        # Create 5 sample tickets
        sample_tickets = [
            {
                "title": "Login page not loading",
                "description": "The login page stays blank after entering the URL.",
                "status": "Yeni",
                "priority": "Yüksek",
                "user_id": customer1.id,
                "created_at": datetime.utcnow() - timedelta(hours=1)
            },
            {
                "title": "Password reset email not received",
                "description": "I tried to reset my password but did not get any email.",
                "status": "Açık",
                "priority": "Orta",
                "user_id": customer2.id,
                "created_at": datetime.utcnow() - timedelta(hours=2)
            },
            {
                "title": "Dashboard loads slowly",
                "description": "It takes more than 20 seconds for the dashboard to load.",
                "status": "Açık",
                "priority": "Düşük",
                "user_id": customer1.id,
                "created_at": datetime.utcnow() - timedelta(hours=3)
            },
            {
                "title": "Cannot upload attachments",
                "description": "Uploading PDF files fails with an error.",
                "status": "Kapalı",
                "priority": "Yüksek",
                "user_id": customer2.id,
                "created_at": datetime.utcnow() - timedelta(hours=4)
            },
            {
                "title": "Sidebar menu overlaps content",
                "description": "On mobile, the sidebar covers the main content.",
                "status": "Yeni",
                "priority": "Orta",
                "user_id": customer1.id,
                "created_at": datetime.utcnow() - timedelta(hours=5)
            }
        ]
        
        for ticket_data in sample_tickets:
            ticket = Ticket(**ticket_data)
            db.add(ticket)
        
        db.commit()
        
        print(f"✅ Created {len(sample_tickets)} sample tickets")
        print(f"✅ Created 4 sample users (2 customers, 2 support)")
        print("Database initialization completed successfully!")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database() 