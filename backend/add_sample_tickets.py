#!/usr/bin/env python3
"""
Add new sample tickets to the existing database without resetting users or tickets.
"""
from app.db import SessionLocal
from app.models import User, Ticket
from datetime import datetime, timedelta

def add_sample_tickets():
    db = SessionLocal()
    try:
        # Kullanıcıları bul
        customer1 = db.query(User).filter_by(username="alice").first()
        customer2 = db.query(User).filter_by(username="bob").first()
        if not customer1 or not customer2:
            print("Sample customers not found. Add users first.")
            return

        new_tickets = [
            # customer1 için
            {
                "title": "Dark mode is not working",
                "description": "When I switch to dark mode, some text remains black and unreadable.",
                "status": "Yeni",
                "priority": "Orta",
                "user_id": customer1.id,
                "created_at": datetime.utcnow() - timedelta(minutes=45)
            },
            {
                "title": "Notification emails delayed",
                "description": "Email notifications for ticket updates arrive hours late.",
                "status": "Açık",
                "priority": "Düşük",
                "user_id": customer1.id,
                "created_at": datetime.utcnow() - timedelta(hours=2)
            },
            # customer2 için
            {
                "title": "Attachment upload fails",
                "description": "Trying to upload a PDF attachment results in an error message.",
                "status": "Yeni",
                "priority": "Yüksek",
                "user_id": customer2.id,
                "created_at": datetime.utcnow() - timedelta(minutes=30)
            },
            {
                "title": "Calendar integration missing events",
                "description": "Some events are not showing up in the integrated calendar view.",
                "status": "Açık",
                "priority": "Orta",
                "user_id": customer2.id,
                "created_at": datetime.utcnow() - timedelta(hours=7)
            }
        ]

        for ticket_data in new_tickets:
            ticket = Ticket(**ticket_data)
            db.add(ticket)
        db.commit()
        print(f"✅ {len(new_tickets)} yeni ticket eklendi.")
    except Exception as e:
        print(f"❌ Hata: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_sample_tickets() 