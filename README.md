# BioLabData - Biostatistics Website

Професионален уебсайт за биостатистически услуги.

## 🚀 Quick Start (на хостинга)

### 1. Качване на файловете

Качи цялата папка `biolabdata` на хостинга чрез FTP/SFTP или git.

### 2. Инсталиране на dependencies

```bash
cd biolabdata
npm install
```

### 3. Настройка на .env

Копирай `.env.example` към `.env` и редактирай:

```bash
cp .env.example .env
nano .env
```

**Задължителни настройки:**

```env
# Database - PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/biolabdata"

# NextAuth
NEXTAUTH_URL="https://biolabdata.com"
NEXTAUTH_SECRET="генерирай-случаен-низ-тук"

# Email (опционално, за notifications)
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-email"
SMTP_PASSWORD="your-password"
SMTP_FROM="noreply@biolabdata.com"
CONTACT_EMAIL="contact@biolabdata.com"
```

**Генериране на NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Създаване на база данни

```bash
# Създай PostgreSQL база
createdb biolabdata

# Или в psql:
# CREATE DATABASE biolabdata;

# Инициализирай схемата
npx prisma db push
npx prisma generate
```

### 5. Създаване на admin потребител

```bash
# Задай парола в environment
export ADMIN_EMAIL="admin@biolabdata.com"
export ADMIN_PASSWORD="твоята-сигурна-парола"

# Изпълни setup script
npx ts-node scripts/setup-admin.ts
```

### 6. Build и стартиране

```bash
# Production build
npm run build

# Стартиране
npm run start
```

За постоянна работа използвай PM2:

```bash
npm install -g pm2
pm2 start npm --name "biolabdata" -- start
pm2 save
pm2 startup
```

### 7. Настройка на Nginx (примерна конфигурация)

```nginx
server {
    listen 80;
    server_name biolabdata.com www.biolabdata.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name biolabdata.com www.biolabdata.com;

    ssl_certificate /etc/letsencrypt/live/biolabdata.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/biolabdata.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. SSL сертификат (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d biolabdata.com -d www.biolabdata.com
```

---

## 📁 Структура на проекта

```
biolabdata/
├── src/
│   ├── app/
│   │   ├── [locale]/     # Публични страници (bg/en)
│   │   ├── admin/        # Админ панел
│   │   └── api/          # API endpoints
│   ├── components/       # React компоненти
│   ├── lib/              # Utilities и конфигурация
│   └── messages/         # Преводи (bg.json, en.json)
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Статични файлове
└── scripts/              # Setup scripts
```

---

## 🔐 Достъп до админ панела

URL: `https://biolabdata.com/admin`

---

## 📝 Често използвани команди

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Database
npx prisma db push      # Sync schema
npx prisma generate     # Generate client
npx prisma studio       # GUI за базата

# PM2
pm2 status              # Статус
pm2 logs biolabdata     # Логове
pm2 restart biolabdata  # Рестарт
```

---

## 🛠 Технологии

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL + Prisma
- **Auth:** NextAuth.js
- **i18n:** next-intl (BG/EN)
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion

---

## 📧 Поддръжка

За въпроси: contact@biolabdata.com
