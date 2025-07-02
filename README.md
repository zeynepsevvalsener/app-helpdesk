# HelpDesk Uygulaması

## Proje Hakkında
HelpDesk, müşteri destek taleplerinin yönetilmesi için geliştirilmiş modern ve kullanıcı dostu bir uygulamadır. Hem müşteri (customer) hem de destek (support) rolleriyle giriş yapılabilir, ticket oluşturma, listeleme, filtreleme, güncelleme ve rol bazlı erişim gibi özellikler sunar.

---

## Özellikler
- **Kullanıcı Giriş** (JWT tabanlı authentication)
- **Rol Bazlı Yetkilendirme** (customer/support)
- **Ticket Oluşturma, Listeleme, Detay, Güncelleme, Silme**
- **Filtreleme & Sıralama** (Durum, Öncelik, Tarih)
- **Dashboard'da istatistikler** (Toplam, Yeni, Açık, Kapalı ticket sayısı)
- **Modern ve Responsive Arayüz** (React + Vite + TypeScript)
- **Estetik ve Kurumsal Tasarım**

---

## Kurulum

### 1. Backend (FastAPI)

#### Gereksinimler
- Python 3.9+
- pip

#### Kurulum Adımları
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate
pip install -r requirements.txt
```

#### Veritabanı Oluşturma & Örnek Veri
```bash
python init_db.py
python add_sample_tickets.py
```

#### Sunucuyu Başlatma
```bash
uvicorn app.main:app --reload
```

API varsayılan olarak `http://127.0.0.1:8000` adresinde çalışır.

---

### 2. Frontend (React)

#### Gereksinimler
- Node.js 18+
- npm

#### Kurulum Adımları
```bash
cd frontend
npm install
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır.

---

## Kullanıcı Rolleri & Demo Hesaplar

| Rol      | Kullanıcı Adı | Şifre      |
|----------|---------------|------------|
| Support  | carol         | carolpass  |
| Customer | bob           | bobpass    |

> **Not:** Sisteme sadece yukarıdaki demo kullanıcılarla giriş yapılabilir. Kayıt ile yeni kullanıcı eklenemez.

---

## Kullanım
- **Customer:** Ticket oluşturabilir, kendi ticketlarını görebilir.
- **Support:** Tüm ticketları görebilir, güncelleyebilir, silebilir.
- Dashboard'da istatistikler ve hızlı erişim butonları bulunur.
- Ticket listesinde filtreleme ve sıralama yapılabilir.
- Ticket detayında yetkiliyseniz güncelleme ve silme işlemleri yapılabilir.

---

## Proje Yapısı
```
helpdesk-app/
  backend/    # FastAPI backend
    app/
    requirements.txt
    ...
  frontend/   # React frontend
    src/
    package.json
    ...
```

---

## Geliştirici Notları
- Kodlar ve arayüz tamamen özelleştirilebilir.
- Geliştirme ortamında CORS açıktır.
- Geri bildirim ve katkılar için PR gönderebilirsiniz.

---

## Lisans
MIT

# trigger
