# Kobi CRM 3 - Hızlı Başlangıç Rehberi

## 🚀 Projeyi Çalıştırma

```bash
# Frontend başlat
cd "Kobi CRM 3/client"
npm run dev
# http://localhost:5174
```

---

## 📁 Önemli Dosyalar

| Dosya | Satır | Açıklama |
|-------|-------|----------|
| `client/src/App.jsx` | 1770+ | Ana component - tüm logic burada |
| `client/src/FunnelBoard.jsx` | 402 | Kanban board - Drag & Drop |
| `client/src/components/FunnelChart.jsx` | 333 | Sales funnel görselleştirme |
| `client/src/theme.js` | - | Design system & tema |
| `client/src/components/Header.jsx` | 235 | Header & notifications |

---

## 🎯 Ana Özellikler (Çalışan)

- ✅ Müşteri yönetimi (CRUD)
- ✅ Proje takibi
- ✅ Funnel Board (Drag & Drop)
- ✅ Gerçek zamanlı senkronizasyon
- ✅ Dashboard & Analytics
- ✅ Bildirim sistemi
- ✅ Dark/Light tema

---

## ⚠️ Bilinen Sorunlar

1. **Mantık hataları** (Kullanıcı belirtti - detay yok)
2. **Bazı eksiklikler** (Kullanıcı belirtti - detay yok)
3. Search özelliği henüz aktif değil
4. Mobile responsive test edilmedi
5. Error handling minimal

---

## 🔧 Sonraki Adımlar

1. ⏸️ **Kullanıcı ile görüşme** - sorunları netleştir
2. 🐛 **Bug fixing** - belirtilen hataları çöz
3. 🔍 **Search implement** - header search'ü aktif et
4. 📱 **Mobile responsive** - tablet/mobil test
5. ⚡ **Performance** - optimizasyon yap

---

## 💾 Veri Akışı (Funnel Sync)

```
User drags card
    ↓
FunnelBoard → POST /api/funnel/move
    ↓
Database update
    ↓
Parent callback → App state update
    ↓
React re-render (StatCards, FunnelChart, Lists, Notification)
```

---

## 🎨 Tema Kullanımı

```javascript
import modernTheme from './theme';

// Renkler
modernTheme.colors.primary
modernTheme.colors.success
modernTheme.colors.warning
modernTheme.colors.danger

// Spacing
modernTheme.spacing.sm
modernTheme.spacing.md
modernTheme.spacing.lg

// Typography
modernTheme.fontSize.sm
modernTheme.fontWeight.semibold

// Layout
modernTheme.layout.headerHeight
modernTheme.layout.sidebarWidth
```

---

## 🔗 API Endpoints

```javascript
const API_URL = 'http://localhost:3001/api';

// Auth
POST   /auth/login
POST   /auth/register

// Customers
GET    /customers
POST   /customers
PUT    /customers/:id
DELETE /customers/:id

// Funnel
GET    /funnel/kanban
POST   /funnel/move
GET    /funnel/analytics
```

---

## 📊 Component Hierarchy

```
App.jsx
├── Sidebar
├── Header
│   └── NotificationDropdown
└── Main Content
    ├── Dashboard View
    ├── Funnel View → FunnelBoard → FunnelChart
    ├── Customers View → DataTable
    └── Projects View → Project Cards
```

---

## 🔑 Key State Variables

```javascript
// App.jsx içinde
const [customers, setCustomers] = useState([]);
const [currentView, setCurrentView] = useState('dashboard');
const [selectedCustomer, setSelectedCustomer] = useState(null);
const [notifications, setNotifications] = useState([]);
const [theme, setTheme] = useState('light');
```

---

## 🎨 Funnel Chart - Doğru Yapı

```
TOP (100% width)
┌─────────────────────────┐
│   POTANSIYEL (45)       │ ← En geniş
└─────────────────────────┘
         ⬇
    ┌───────────────┐
    │  AKTİF (21)   │      ← Orta
    └───────────────┘
         ⬇
      ┌─────────┐
      │HEDEF(8) │          ← En dar
      └─────────┘
BOTTOM (40% width)
```

**NOT:** Satış hunisi standardına uygun (wide top → narrow bottom)

---

## 🧪 Test Senaryoları

### Funnel Board
1. Dashboard → Funnel menüsüne git
2. Potansiyel kolonundan bir müşteriyi sürükle
3. Aktif kolonuna bırak
4. **Bekle:**
   - Kart Aktif'e taşınsın
   - Kolon başlıklarındaki sayılar güncellensinn
   - Bildirim görünsün
   - Dashboard'a dönünce istatistikler güncel olsun

### Customer Management
1. "Yeni Müşteri" butonuna tıkla
2. Formu doldur
3. Kaydet
4. **Bekle:**
   - Customer list'te görünsün
   - Dashboard stats güncellensin
   - Bildirim gelsin

---

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "vite": "^7.2.4",
  "recharts": "^2.15.0",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^9.0.0"
}
```

---

## 🚨 Acil Durum Komutları

```bash
# Port çakışması
lsof -ti:5174 | xargs kill -9

# Cache temizle
cd client
rm -rf node_modules
rm package-lock.json
npm install

# Yeni terminal ile başlat
cd "Kobi CRM 3/client"
npm run dev
```

---

## 📝 Notlar

- **Backend:** Ayrı bir server gerekiyor (port 3001)
- **Token:** localStorage'da tutuluyor
- **Dil:** Türkçe (şimdilik)
- **Browser:** Chrome/Firefox önerilir

---

## 📞 Devam Etmek İçin

Detaylı bilgi için: `PROJE_DURUM_RAPORU.md`

---

**Son Güncelleme:** 24 Aralık 2025
**Durum:** Mola (Kullanıcı sorunları belirtecek)
