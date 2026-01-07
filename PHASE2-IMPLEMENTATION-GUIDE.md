# Phase 2 Implementation Guide
**Component Library Enhancement**

## ✅ Completed Components

### 1. Button Component (`/client/src/components/Button.jsx`)

Modern button with multiple variants, sizes, and states.

**Features:**
- ✅ Variants: primary, secondary, success, warning, danger, ghost
- ✅ Sizes: sm, md, lg
- ✅ States: default, hover, active, disabled, loading
- ✅ Icon support (left/right positioning)
- ✅ Full width option
- ✅ Loading spinner animation
- ✅ Theme integration

**Usage:**
```jsx
import Button from './components/Button';

// Primary button
<Button variant="primary" size="md" onClick={handleClick}>
  Kaydet
</Button>

// Button with icon
<Button variant="success" icon="✓" iconPosition="left">
  Onayla
</Button>

// Loading button
<Button variant="primary" loading={isLoading}>
  Yükleniyor...
</Button>

// Full width button
<Button variant="danger" fullWidth>
  Sil
</Button>

// Ghost button
<Button variant="ghost" size="sm">
  İptal
</Button>
```

---

### 2. Badge Component (`/client/src/components/Badge.jsx`)

Status indicator badges with multiple variants and features.

**Features:**
- ✅ Variants: primary, success, warning, danger, neutral, info
- ✅ Sizes: sm, md, lg
- ✅ Dot indicator option
- ✅ Dismissible option
- ✅ Outline variant
- ✅ Pill-shaped design

**Usage:**
```jsx
import Badge from './components/Badge';

// Status badges
<Badge variant="success">Aktif</Badge>
<Badge variant="warning">Beklemede</Badge>
<Badge variant="danger">Gecikmiş</Badge>

// With dot indicator
<Badge variant="success" dot>
  Online
</Badge>

// Outline variant
<Badge variant="primary" outline>
  Yeni
</Badge>

// Dismissible badge
<Badge
  variant="info"
  dismissible
  onDismiss={() => console.log('Dismissed')}
>
  Bildirim
</Badge>

// Different sizes
<Badge variant="primary" size="sm">Küçük</Badge>
<Badge variant="primary" size="md">Orta</Badge>
<Badge variant="primary" size="lg">Büyük</Badge>
```

---

### 3. Card Component (`/client/src/components/Card.jsx`)

Enhanced card component with header, footer, and multiple variants.

**Features:**
- ✅ Variants: default, bordered, elevated, flat, interactive
- ✅ Header and footer support
- ✅ Padding variants: none, sm, md, lg, xl
- ✅ Hover effects
- ✅ Click handler support
- ✅ Subcomponents: Card.Header, Card.Body, Card.Footer

**Usage:**
```jsx
import Card from './components/Card';

// Simple card
<Card padding="md">
  <h3>Card başlık</h3>
  <p>Card içeriği</p>
</Card>

// Card with header and footer
<Card
  header="Müşteri Bilgileri"
  footer="Son güncelleme: 12.12.2024"
  variant="elevated"
>
  <p>Müşteri detayları burada</p>
</Card>

// Interactive card
<Card
  variant="interactive"
  hoverable
  onClick={() => console.log('Card clicked')}
>
  Tıklanabilir kart
</Card>

// Using subcomponents
<Card variant="bordered">
  <Card.Header>Özel Başlık</Card.Header>
  <Card.Body padding="lg">
    İçerik alanı
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">İşlem</Button>
  </Card.Footer>
</Card>
```

---

### 4. Input Component (`/client/src/components/Input.jsx`)

Modern input with validation, icons, and textarea support.

**Features:**
- ✅ Types: text, password, email, number, textarea
- ✅ States: default, focused, error, success, disabled
- ✅ Label and helper text
- ✅ Prefix/suffix icons
- ✅ Password visibility toggle
- ✅ Character count
- ✅ Sizes: sm, md, lg
- ✅ Full width option

**Usage:**
```jsx
import Input from './components/Input';

// Basic input
<Input
  label="Müşteri Adı"
  placeholder="Adı giriniz"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Input with error
<Input
  label="E-posta"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Geçerli bir e-posta giriniz"
  required
/>

// Password input
<Input
  label="Şifre"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

// Input with icon
<Input
  placeholder="Ara..."
  prefix="🔍"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

// Textarea with character count
<Input
  type="textarea"
  label="Notlar"
  rows={4}
  maxLength={500}
  showCharCount
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
/>

// Success state
<Input
  label="Kullanıcı Adı"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  success
  helperText="Kullanıcı adı müsait"
/>
```

---

### 5. Select Component (`/client/src/components/Select.jsx`)

Styled dropdown select with custom options.

**Features:**
- ✅ Label and error state
- ✅ Placeholder support
- ✅ Disabled state
- ✅ Custom styling
- ✅ Sizes: sm, md, lg
- ✅ Full width option
- ✅ Object or string array options

**Usage:**
```jsx
import Select from './components/Select';

// Basic select
<Select
  label="Durum"
  placeholder="Durum seçiniz"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={['Potansiyel', 'Aktif', 'Hedef']}
/>

// Select with object options
<Select
  label="Program"
  value={program}
  onChange={(e) => setProgram(e.target.value)}
  options={[
    { value: 'crm', label: 'CRM Sistemi' },
    { value: 'website', label: 'Web Sitesi' },
    { value: 'mobile', label: 'Mobil Uygulama', disabled: true }
  ]}
  required
/>

// Select with error
<Select
  label="Kategori"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={categories}
  error="Kategori seçimi zorunludur"
/>

// Full width select
<Select
  label="Şehir"
  value={city}
  onChange={(e) => setCity(e.target.value)}
  options={cities}
  fullWidth
/>
```

---

## 🔄 Integration Examples

### Replacing Old Buttons

**Before:**
```jsx
<button
  onClick={handleSave}
  style={{
    background: '#2563EB',
    color: 'white',
    padding: '10px 20px',
    // ... lots of inline styles
  }}
>
  Kaydet
</button>
```

**After:**
```jsx
<Button variant="primary" onClick={handleSave}>
  Kaydet
</Button>
```

---

### Replacing Old Form Inputs

**Before:**
```jsx
<div>
  <label>Müşteri Adı:</label>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={{ /* inline styles */ }}
  />
</div>
```

**After:**
```jsx
<Input
  label="Müşteri Adı"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Müşteri adını giriniz"
  fullWidth
/>
```

---

### Using Cards for Sections

**Before:**
```jsx
<div style={{
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
}}>
  <h3>Müşteri Bilgileri</h3>
  {/* content */}
</div>
```

**After:**
```jsx
<Card header="Müşteri Bilgileri" variant="elevated">
  {/* content */}
</Card>
```

---

### Status Badges in Tables

**Before:**
```jsx
<span style={{
  background: customer.durum === 'aktif' ? '#10B981' : '#6B7280',
  color: 'white',
  padding: '4px 12px',
  borderRadius: '9999px',
}}>
  {customer.durum}
</span>
```

**After:**
```jsx
<Badge
  variant={customer.durum === 'aktif' ? 'success' : 'neutral'}
>
  {customer.durum}
</Badge>
```

---

## 🎯 Component Combination Examples

### Form with Modern Components
```jsx
<Card header="Yeni Müşteri Ekle" variant="elevated" padding="lg">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input
      label="Müşteri Adı"
      placeholder="Ad Soyad"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      fullWidth
    />

    <Input
      label="E-posta"
      type="email"
      placeholder="ornek@email.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      prefix="📧"
      fullWidth
    />

    <Select
      label="Durum"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      options={['Potansiyel', 'Aktif', 'Hedef']}
      fullWidth
    />

    <Input
      type="textarea"
      label="Notlar"
      rows={4}
      placeholder="Ek notlar..."
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      maxLength={500}
      showCharCount
      fullWidth
    />

    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
      <Button variant="primary" onClick={handleSave} fullWidth>
        Kaydet
      </Button>
      <Button variant="ghost" onClick={handleCancel}>
        İptal
      </Button>
    </div>
  </div>
</Card>
```

### Customer Card with Badges
```jsx
<Card variant="interactive" hoverable onClick={() => viewCustomer(customer.id)}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
    <div>
      <h3>{customer.isim}</h3>
      <p style={{ color: '#6B7280', fontSize: '13px' }}>{customer.firma}</p>
    </div>
    <Badge variant={getStatusVariant(customer.durum)}>
      {customer.durum}
    </Badge>
  </div>

  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
    <Badge variant="primary" size="sm" dot>
      {customer.program}
    </Badge>
    {customer.gecmisAlacak > 0 && (
      <Badge variant="danger" size="sm">
        Alacak: {formatCurrency(customer.gecmisAlacak)}
      </Badge>
    )}
  </div>
</Card>
```

---

## 🎨 Design System Benefits

### Consistency
All components use the same design tokens from `theme.js`:
- Colors, spacing, shadows, typography
- Consistent hover effects and transitions
- Unified border radius and sizing

### Accessibility
- Proper focus states
- Keyboard navigation support
- ARIA labels where appropriate
- Disabled state handling

### Maintainability
- Single source of truth (theme.js)
- Reusable components
- Easy to update globally
- Reduces inline styles

### Developer Experience
- Simple, intuitive props
- TypeScript-ready (JSDoc comments)
- Flexible and composable
- Works with existing code

---

## 📋 Next Steps

### Integration Priority

1. **Replace Modal Buttons** (High Priority)
   - AddCustomerModal, EditCustomerModal buttons
   - Settings modal buttons
   - Archive modal buttons

2. **Replace Form Inputs** (High Priority)
   - Customer form inputs
   - Project form inputs
   - Settings forms

3. **Add Status Badges** (Medium Priority)
   - Customer status in tables
   - Project stage indicators
   - Payment status badges

4. **Card Wrappers** (Medium Priority)
   - Wrap stat sections in Cards
   - Customer detail sections
   - Project timeline cards

5. **Select Dropdowns** (Low Priority)
   - Filter dropdowns
   - Status selectors
   - Program selectors

---

## 🧪 Testing Checklist

- [ ] Button variants render correctly
- [ ] Button hover/focus states work
- [ ] Loading spinner displays properly
- [ ] Badge variants have correct colors
- [ ] Dismissible badges can be closed
- [ ] Card hover effects work smoothly
- [ ] Input validation states display correctly
- [ ] Password toggle works
- [ ] Character count updates
- [ ] Select dropdown opens/closes
- [ ] All components are mobile responsive
- [ ] Theme colors are consistent
- [ ] Focus states are visible
- [ ] Disabled states work correctly

---

**Status:** Phase 2 Complete ✅
**Components Created:** Button, Badge, Card, Input, Select
**Next Phase:** Integration & Testing
