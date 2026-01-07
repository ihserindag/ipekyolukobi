# Kobi CRM - UI Redesign Specification
**Based on SmartHR Template Design System**

## 🎨 Design System Overview

### Color Palette (Updated)
```css
Primary Colors:
- Primary Blue: #2563EB
- Success Green: #10B981
- Warning Orange: #F59E0B
- Danger Red: #EF4444
- Neutral Gray: #6B7280

Background Colors:
- Light BG: #F9FAFB
- Card BG: #FFFFFF
- Dark BG: #111827

Text Colors:
- Primary Text: #111827
- Secondary Text: #6B7280
- Muted Text: #9CA3AF
```

### Typography
```css
Headings:
- H1: 32px, font-weight: 700
- H2: 24px, font-weight: 700
- H3: 18px, font-weight: 600
- H4: 16px, font-weight: 600

Body:
- Large: 16px, font-weight: 400
- Default: 14px, font-weight: 400
- Small: 12px, font-weight: 400
```

### Spacing System
```css
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 20px
- 2xl: 24px
- 3xl: 32px
```

### Shadows
```css
- Card Shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1)
- Card Shadow Hover: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Dropdown Shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

---

## 🏗️ Layout Structure

### 1. Left Sidebar Navigation (280px width)

```
┌─────────────────────────┐
│ 🏢 İpek Yolu CRM       │
│   [Collapse Toggle]     │
├─────────────────────────┤
│ 📊 Dashboard            │
│ 📈 Funnel               │
│ 👥 Müşteriler           │
│ 🎯 Projeler             │
│ ⚙️  Ayarlar             │
│ 🗑️  Arşiv              │
└─────────────────────────┘
```

**Features:**
- Fixed position on left
- Collapsible (toggle to 60px icon-only mode)
- Active state highlighting
- Smooth transitions
- Sticky positioning

**Styling:**
- Background: #FFFFFF
- Border Right: 1px solid #E5E7EB
- Active Item: #EFF6FF background, #2563EB text
- Hover: #F9FAFB background

---

### 2. Top Header (60px height)

```
┌──────────────────────────────────────────────────────────────┐
│ Welcome back, Admin! | [Search...] | [+Customer] [Settings] [Logout] │
└──────────────────────────────────────────────────────────────┘
```

**Components:**
- Welcome message with user name
- Global search bar (300px width)
- Quick action buttons
- User profile dropdown
- Theme selector

**Styling:**
- Background: #FFFFFF
- Border Bottom: 1px solid #E5E7EB
- Fixed position at top
- z-index: 100

---

### 3. Main Content Area

**Dashboard Grid Layout:**

```
┌─────────────────────────────────────────────────┐
│ Row 1: Stat Cards (4 columns)                   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐           │
│ │ 👥   │ │ 🎯   │ │ 💰   │ │ 📊   │           │
│ │Total │ │Active│ │Revenue│ │Funnel│           │
│ └──────┘ └──────┘ └──────┘ └──────┘           │
├─────────────────────────────────────────────────┤
│ Row 2: Funnel Chart (full width)                │
│ ┌───────────────────────────────────────────┐   │
│ │        📊 Customer Conversion Funnel      │   │
│ └───────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│ Row 3: 2 Column Layout                          │
│ ┌────────────────────┐ ┌──────────────────┐    │
│ │ Recent Activities  │ │ Top Customers    │    │
│ │                    │ │                  │    │
│ └────────────────────┘ └──────────────────┘    │
├─────────────────────────────────────────────────┤
│ Row 4: 2 Column Layout                          │
│ ┌────────────────────┐ ┌──────────────────┐    │
│ │ Projects Timeline  │ │ Quick Kanban     │    │
│ │                    │ │                  │    │
│ └────────────────────┘ └──────────────────┘    │
└─────────────────────────────────────────────────┘
```

---

## 🎴 Component Designs

### Stat Cards

**Design:**
```
┌─────────────────────────────┐
│ ┌─┐ Toplam Müşteri         │
│ │👥│                         │
│ └─┘ 145                     │
│     ↑ +12% bu ay            │
└─────────────────────────────┘
```

**Features:**
- Circular colored icon (40px diameter)
- Large number display (28px)
- Trend indicator with percentage
- Hover effect: lift shadow
- Clean borders, subtle shadow

**CSS:**
```css
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 12px;
}
```

---

### Buttons

**Primary Button:**
```css
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #1D4ED8;
  box-shadow: 0 4px 6px rgba(37,99,235,0.2);
}
```

**Secondary Button:**
```css
.btn-secondary {
  background: #F9FAFB;
  color: #374151;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  border: 1px solid #E5E7EB;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #F3F4F6;
  border-color: #D1D5DB;
}
```

---

### Status Badges

**Design:**
```
┌────────────┐
│ ● Aktif    │  (Green)
└────────────┘

┌────────────┐
│ ● Bekliyor │  (Orange)
└────────────┘

┌────────────┐
│ ● Tamamlandı│ (Blue)
└────────────┘
```

**CSS:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.badge-success {
  background: #D1FAE5;
  color: #065F46;
}

.badge-warning {
  background: #FEF3C7;
  color: #92400E;
}

.badge-primary {
  background: #DBEAFE;
  color: #1E40AF;
}

.badge-danger {
  background: #FEE2E2;
  color: #991B1B;
}
```

---

### Cards

**Modern Card Design:**
```css
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
  background: #F9FAFB;
}

.card-body {
  padding: 20px;
}

.card-footer {
  padding: 12px 20px;
  border-top: 1px solid #E5E7EB;
  background: #F9FAFB;
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
```

### Mobile Adaptations
- Sidebar becomes off-canvas drawer
- Header stacks vertically
- Stat cards: 1 column on mobile, 2 on tablet, 4 on desktop
- Hide secondary actions in compact view
- Touch-friendly button sizes (min 44px)

---

## 🎯 Implementation Priority

### Phase 1 - Foundation (High Priority)
1. ✅ Update color palette
2. ✅ Create sidebar navigation
3. ✅ Redesign header
4. ✅ Update stat cards with icons

### Phase 2 - Components (Medium Priority)
5. ✅ Implement modern buttons
6. ✅ Create status badges
7. ✅ Update card styles
8. ✅ Add circular icons

### Phase 3 - Layout (Low Priority)
9. ✅ Restructure dashboard grid
10. ✅ Add responsive breakpoints
11. ✅ Implement smooth transitions
12. ✅ Add hover effects

---

## 🚀 Next Steps

1. Create new theme configuration file
2. Build reusable component library
3. Update App.jsx with new layout structure
4. Test across different screen sizes
5. Gather user feedback
6. Iterate on design

---

**Design Inspiration:** SmartHR Template
**Target Completion:** Incremental implementation
**Compatibility:** React 19, Vite 7, Modern browsers
