# Yapılacaklar Listesi

**Proje:** Kobi CRM 3
**Tarih:** 24 Aralık 2025
**Durum:** Mola - Sonraki oturumda devam edilecek

---

## 🔴 Öncelikli - İlk Yapılacaklar

### 1. Kullanıcı Sorunlarını Netleştirme
**Durum:** ⏸️ Bekliyor
**Açıklama:** Kullanıcı "bazı eksiklikler ve mantık hatası var" dedi ancak detay vermedi.

**Yapılması Gerekenler:**
- [ ] Kullanıcıyla görüşme yap
- [ ] Hangi mantık hataları var? Listele
- [ ] Hangi eksiklikler var? Listele
- [ ] Her sorunu önceliklendirme (kritik/orta/düşük)
- [ ] Her sorun için çözüm planı oluştur

**Sorulacak Sorular:**
```
1. Hangi özellikte mantık hatası fark ettiniz?
   - Müşteri yönetiminde mi?
   - Proje takibinde mi?
   - Funnel Board'da mı?
   - Dashboard istatistiklerinde mi?

2. Eksiklerden en önemlileri neler?
   - Hangi özellik eksik?
   - Hangi sayfada sorun var?
   - Beklenen davranış neydi, gerçekleşen ne?

3. Veri akışında sorun var mı?
   - Senkronizasyon çalışıyor mu?
   - API cevapları doğru mu?
   - State güncellemeleri beklendiği gibi mi?
```

---

## 🟡 Orta Öncelikli - Bilinen Sorunlar

### 2. Search Functionality
**Durum:** ❌ Yapılmadı
**Açıklama:** Header'da search bar var ama aktif değil

**Yapılacaklar:**
- [ ] Backend search endpoint oluştur
  ```javascript
  GET /api/search?q={query}&type={customer|project|all}
  ```
- [ ] Frontend search handler ekle
- [ ] Debounced search implementasyonu
- [ ] Search results dropdown tasarımı
- [ ] Keyboard navigation (arrow keys, enter)
- [ ] Search history (optional)
- [ ] Search filters (müşteri/proje/program)

**Dosyalar:**
- `client/src/components/Header.jsx` - Line 76-106
- `client/src/App.jsx` - Yeni handler eklenecek
- Backend: Yeni endpoint

---

### 3. Error Handling & User Feedback
**Durum:** ⚠️ Minimal
**Açıklama:** Error handling var ama kullanıcıya yansıtma eksik

**Yapılacaklar:**
- [ ] Toast notification sistemi
  - Success messages
  - Error messages
  - Warning messages
  - Info messages
- [ ] Error boundaries (React)
- [ ] API error handling standardization
- [ ] Loading states (skeleton loaders)
- [ ] Empty states (açıklayıcı mesajlar)
- [ ] Retry mechanisms

**Örnek Implementation:**
```javascript
// Toast Component
<Toast
  message="Müşteri başarıyla eklendi!"
  type="success"
  duration={3000}
  position="top-right"
/>

// Error Boundary
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>
```

---

### 4. Mobile Responsive
**Durum:** ⚠️ Test Edilmedi
**Açıklama:** Desktop'ta çalışıyor, mobile test edilmedi

**Yapılacaklar:**
- [ ] Breakpoint testleri
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- [ ] Sidebar mobilde overlay olmalı
- [ ] FunnelBoard horizontal scroll düzenlemesi
- [ ] DataTable mobile view
- [ ] Header buttons stacking
- [ ] Modal'lar full-screen (mobile)
- [ ] Touch gestures test

**Test Cihazlar:**
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)

---

### 5. Performance Optimization
**Durum:** ⚠️ Large datasets test edilmedi
**Açıklama:** 1000+ müşteri ile performance testi yapılmadı

**Yapılacaklar:**
- [ ] React.memo implementasyonu
  ```javascript
  export default React.memo(CustomerCard, (prev, next) => {
    return prev.customer.id === next.customer.id;
  });
  ```
- [ ] useMemo optimizations
  ```javascript
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => c.durum === selectedStatus);
  }, [customers, selectedStatus]);
  ```
- [ ] useCallback optimizations
- [ ] Virtual scrolling (react-window veya react-virtualized)
- [ ] Lazy loading components
- [ ] Image optimization
- [ ] Bundle size analysis
- [ ] Code splitting

---

## 🟢 Düşük Öncelikli - Nice to Have

### 6. Confirmation Dialogs
**Durum:** ❌ Yok
**Açıklama:** Kritik işlemler için onay sorulmuyor

**Yapılacaklar:**
- [ ] Müşteri silme confirmation
- [ ] Proje silme confirmation
- [ ] Arşivleme confirmation
- [ ] Stage değiştirme confirmation (optional)
- [ ] Toplu işlemler confirmation

**Örnek:**
```javascript
<ConfirmDialog
  title="Müşteriyi Sil"
  message="Bu müşteri ve tüm projeleri silinecek. Emin misiniz?"
  onConfirm={handleDelete}
  onCancel={closeDialog}
  confirmText="Sil"
  cancelText="İptal"
  type="danger"
/>
```

---

### 7. Advanced Filters
**Durum:** ❌ Yok
**Açıklama:** Sadece temel filtreleme var

**Yapılacaklar:**
- [ ] Multi-select filters
  - Durum (potansiyel, aktif, hedef)
  - Program türü
  - Tarih aralığı
  - Ödeme durumu
- [ ] Filter combinations (AND/OR)
- [ ] Saved filter presets
- [ ] Filter chips (görsel gösterim)
- [ ] Clear all filters button
- [ ] Filter count badge

---

### 8. Export Functionality
**Durum:** ❌ Yok
**Açıklama:** Veri dışa aktarma özelliği yok

**Yapılacaklar:**
- [ ] PDF export
  - Customer reports
  - Project reports
  - Analytics reports
- [ ] CSV export
  - Customer list
  - Project list
  - Payment history
- [ ] Excel export (XLSX)
- [ ] Print view optimization
- [ ] Scheduled exports (optional)

**Libraries:**
- PDF: `jspdf`, `react-pdf`
- CSV: `papaparse`, `react-csv`
- Excel: `xlsx`

---

### 9. User Preferences
**Durum:** ⚠️ Kısmi (sadece theme)
**Açıklama:** Kullanıcı tercihleri sınırlı

**Yapılacaklar:**
- [ ] Dashboard layout customization
- [ ] Default view preference
- [ ] Notification preferences
- [ ] Time format preference
- [ ] Date format preference
- [ ] Language preference
- [ ] Sidebar default state (collapsed/expanded)
- [ ] Table column visibility
- [ ] Preferences persist (localStorage/API)

---

### 10. Accessibility (a11y)
**Durum:** ❌ Yapılmadı
**Açıklama:** Accessibility features eksik

**Yapılacaklar:**
- [ ] Keyboard navigation
  - Tab order
  - Enter/Space actions
  - Escape to close
  - Arrow keys (lists, menus)
- [ ] ARIA labels
  - aria-label
  - aria-describedby
  - aria-expanded
  - role attributes
- [ ] Focus management
  - Focus trap (modals)
  - Focus indicators
  - Skip to main content
- [ ] Screen reader testing
- [ ] Color contrast (WCAG AA)
- [ ] Alt text for images

**Tools:**
- Chrome Lighthouse
- axe DevTools
- WAVE

---

## 📝 Documentation Tasks

### 11. Code Documentation
**Durum:** ⚠️ Minimal
**Açıklama:** JSDoc comments eksik

**Yapılacaklar:**
- [ ] JSDoc comments (functions, components)
  ```javascript
  /**
   * Handles customer status change
   * @param {string} customerId - Customer ID
   * @param {string} newDurum - New status (potansiyel|aktif|hedef)
   */
  const handleCustomerStatusChange = (customerId, newDurum) => {
    // ...
  }
  ```
- [ ] README files (setup, development, deployment)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Component storybook (optional)
- [ ] Architectural decision records (ADRs)

---

### 12. Testing
**Durum:** ❌ Test yok
**Açıklama:** Unit test veya integration test yok

**Yapılacaklar:**
- [ ] Testing framework setup (Jest, React Testing Library)
- [ ] Unit tests
  - Utility functions
  - Hooks
  - API helpers
- [ ] Component tests
  - Render tests
  - User interaction tests
  - Props validation
- [ ] Integration tests
  - User flows
  - API integration
- [ ] E2E tests (Cypress, Playwright)
- [ ] Visual regression tests (optional)
- [ ] Test coverage (aim: 80%+)

---

## 🚀 Deployment Tasks

### 13. Production Ready
**Durum:** ❌ Dev ortamında
**Açıklama:** Production deployment yapılmadı

**Yapılacaklar:**
- [ ] Environment variables
  ```javascript
  VITE_API_URL=https://api.production.com
  VITE_ENV=production
  ```
- [ ] Build optimization
  - Minification
  - Tree shaking
  - Code splitting
- [ ] Security
  - HTTPS
  - CORS configuration
  - Rate limiting
  - Input sanitization
- [ ] Monitoring
  - Error tracking (Sentry)
  - Analytics (Google Analytics, Mixpanel)
  - Performance monitoring
- [ ] CI/CD pipeline
  - GitHub Actions / GitLab CI
  - Automated tests
  - Automated deployment
- [ ] Hosting
  - Frontend: Vercel, Netlify, Cloudflare Pages
  - Backend: AWS, Heroku, DigitalOcean
  - Database: PostgreSQL, MongoDB

---

## 📊 Prioritization Matrix

| Görev | Öncelik | Effort | Impact | Başlangıç |
|-------|---------|--------|--------|-----------|
| 1. Kullanıcı sorunları | 🔴 Yüksek | Düşük | Yüksek | Hemen |
| 2. Search functionality | 🟡 Orta | Orta | Yüksek | Sonra |
| 3. Error handling | 🟡 Orta | Orta | Yüksek | Sonra |
| 4. Mobile responsive | 🟡 Orta | Yüksek | Yüksek | Sonra |
| 5. Performance | 🟡 Orta | Yüksek | Orta | Gerekirse |
| 6. Confirmations | 🟢 Düşük | Düşük | Orta | İsteğe bağlı |
| 7. Advanced filters | 🟢 Düşük | Yüksek | Orta | İsteğe bağlı |
| 8. Export | 🟢 Düşük | Orta | Orta | İsteğe bağlı |
| 9. User prefs | 🟢 Düşük | Orta | Düşük | İsteğe bağlı |
| 10. Accessibility | 🟢 Düşük | Yüksek | Orta | İsteğe bağlı |
| 11. Documentation | 🟢 Düşük | Orta | Orta | Zamanla |
| 12. Testing | 🟢 Düşük | Yüksek | Yüksek | Zamanla |
| 13. Production | 🟢 Düşük | Yüksek | Yüksek | Son aşama |

---

## 🎯 Sprint Planning (Öneri)

### Sprint 1: Sorun Giderme (1-2 hafta)
- [x] Phase 1-7 completed
- [ ] Kullanıcı sorunlarını tespit et
- [ ] Kritik bug'ları çöz
- [ ] Mantık hatalarını düzelt

### Sprint 2: Core Features (2-3 hafta)
- [ ] Search functionality
- [ ] Error handling & feedback
- [ ] Confirmation dialogs
- [ ] Basic testing

### Sprint 3: Polish & UX (2-3 hafta)
- [ ] Mobile responsive
- [ ] Performance optimization
- [ ] Loading states
- [ ] Empty states

### Sprint 4: Advanced Features (3-4 hafta)
- [ ] Advanced filters
- [ ] Export functionality
- [ ] User preferences
- [ ] Accessibility

### Sprint 5: Production (2-3 hafta)
- [ ] Testing (full coverage)
- [ ] Documentation
- [ ] Deployment setup
- [ ] Monitoring & analytics

---

## 🔖 Quick Links

- **Detaylı Rapor:** `PROJE_DURUM_RAPORU.md`
- **Hızlı Başlangıç:** `HIZLI_BASLANGIC.md`
- **Bu Dosya:** `YAPILACAKLAR.md`

---

## ✅ Tamamlanan Görevler (Referans)

Bu görevler önceki oturumlarda tamamlandı:

- [x] Phase 1: Modern UI Foundation
- [x] Phase 2: Component Library
- [x] Phase 3: Dashboard Components
- [x] Phase 4: Funnel System
- [x] Phase 5: Data Synchronization
- [x] Phase 6: Multi-View System
- [x] Phase 7: Revenue Integration
- [x] Funnel chart direction fix (wide top → narrow bottom)
- [x] Drag & Drop implementation
- [x] Real-time state sync
- [x] Notification system
- [x] Dark/Light theme

---

**Son Güncelleme:** 24 Aralık 2025
**Bir Sonraki Oturum:** Kullanıcı sorunlarını netleştirme
**Tahmini Süre:** Sprint 1'i tamamlamak için 1-2 hafta

---

## 📌 Hatırlatmalar

1. **Önce sorunları çöz** - Yeni özellik eklemeden önce mevcut sorunları çöz
2. **Test et** - Her değişiklikten sonra manual test yap
3. **Dokümante et** - Yapılan değişiklikleri not al
4. **Commit düzenli** - Git commit'leri düzenli ve açıklayıcı olsun
5. **Kullanıcı geri bildirimi** - Her milestone'dan sonra kullanıcıya göster

---

**Başarılar! 🚀**
