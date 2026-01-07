import React, { useState } from 'react';

// Tema tanımlamaları
const themes = {
  koyu: {
    name: 'Koyu', icon: '🌙',
    bg: '#0f172a', bgGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    card: 'rgba(255,255,255,0.05)', cardBorder: 'rgba(255,255,255,0.1)',
    text: '#e2e8f0', textMuted: '#94a3b8',
    input: 'rgba(255,255,255,0.08)', inputBorder: 'rgba(255,255,255,0.15)',
    primary: '#3b82f6', secondary: '#8b5cf6', success: '#10b981', warning: '#f59e0b', danger: '#ef4444',
    titleColors: ['#3b82f6', '#8b5cf6', '#10b981']
  },
  acik: {
    name: 'Açık', icon: '☀️',
    bg: '#f1f5f9', bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    card: 'rgba(255,255,255,0.95)', cardBorder: 'rgba(0,0,0,0.1)',
    text: '#1e293b', textMuted: '#64748b',
    input: 'rgba(0,0,0,0.05)', inputBorder: 'rgba(0,0,0,0.15)',
    primary: '#2563eb', secondary: '#7c3aed', success: '#059669', warning: '#d97706', danger: '#dc2626',
    titleColors: ['#2563eb', '#7c3aed', '#059669']
  },
  sepya: {
    name: 'Sepya', icon: '📜',
    bg: '#f5f0e6', bgGradient: 'linear-gradient(135deg, #faf6ee 0%, #e8dcc8 100%)',
    card: 'rgba(255,250,240,0.95)', cardBorder: 'rgba(139,119,90,0.25)',
    text: '#5c4d3c', textMuted: '#8b7355',
    input: 'rgba(139,119,90,0.12)', inputBorder: 'rgba(139,119,90,0.3)',
    primary: '#a67c52', secondary: '#8b6f5c', success: '#6b8e5c', warning: '#c4943a', danger: '#a65252',
    titleColors: ['#a67c52', '#8b6f5c', '#6b8e5c']
  },
  geceMavisi: {
    name: 'Gece Mavisi', icon: '🌊',
    bg: '#0c1929', bgGradient: 'linear-gradient(135deg, #0c1929 0%, #1a2f4a 100%)',
    card: 'rgba(30,58,95,0.5)', cardBorder: 'rgba(100,150,200,0.2)',
    text: '#c5d5e8', textMuted: '#8aa4c4',
    input: 'rgba(100,150,200,0.12)', inputBorder: 'rgba(100,150,200,0.25)',
    primary: '#5b9bd5', secondary: '#7b8fce', success: '#5cb85c', warning: '#f0ad4e', danger: '#d9534f',
    titleColors: ['#5b9bd5', '#7b8fce', '#5cb85c']
  },
  orman: {
    name: 'Orman', icon: '🌲',
    bg: '#1c2a1c', bgGradient: 'linear-gradient(135deg, #1c2a1c 0%, #243524 100%)',
    card: 'rgba(30,50,30,0.6)', cardBorder: 'rgba(80,130,80,0.25)',
    text: '#e0efe0', textMuted: '#a0c4a0',
    input: 'rgba(60,100,60,0.2)', inputBorder: 'rgba(80,130,80,0.3)',
    primary: '#4ade80', secondary: '#86efac', success: '#22c55e', warning: '#facc15', danger: '#f87171',
    titleColors: ['#4ade80', '#86efac', '#22c55e']
  }
};

// Proje şablonları
const projeTemplates = {
  'KOBİGEL': [
    { baslik: 'Ön Değerlendirme', sure: 3 }, { baslik: 'Evrak Hazırlığı', sure: 7 },
    { baslik: 'Proje Yazımı', sure: 14 }, { baslik: 'Bütçe Planlaması', sure: 5 },
    { baslik: 'Online Başvuru', sure: 2 }, { baslik: 'Evrak Teslimi', sure: 3 },
    { baslik: 'Ön İnceleme', sure: 30 }, { baslik: 'Kurul Değerlendirme', sure: 45 },
    { baslik: 'Sözleşme', sure: 15 }, { baslik: 'Uygulama & Ödeme', sure: 180 }
  ],
  'KOSGEB Genel': [
    { baslik: 'KOBİ Beyanı', sure: 2 }, { baslik: 'Evrak Hazırlığı', sure: 5 },
    { baslik: 'Online Başvuru', sure: 1 }, { baslik: 'Değerlendirme', sure: 15 },
    { baslik: 'Onay', sure: 10 }, { baslik: 'Ödeme', sure: 30 }
  ],
  'TÜBİTAK TEYDEB': [
    { baslik: 'Ön Görüşme', sure: 7 }, { baslik: 'Proje Fikri Geliştirme', sure: 14 },
    { baslik: 'AGY300 Formu', sure: 21 }, { baslik: 'Bütçe Detaylandırma', sure: 7 },
    { baslik: 'Online Başvuru', sure: 3 }, { baslik: 'Hakem Değerlendirme', sure: 60 },
    { baslik: 'Komite Kararı', sure: 30 }, { baslik: 'Sözleşme', sure: 15 },
    { baslik: 'Dönem Raporları', sure: 180 }, { baslik: 'Sonuç Raporu', sure: 30 }
  ],
  'IPARD': [
    { baslik: 'Uygunluk Kontrolü', sure: 5 }, { baslik: 'Yatırım Planı', sure: 14 },
    { baslik: 'Teknik Proje', sure: 30 }, { baslik: 'Çevresel Etki', sure: 45 },
    { baslik: 'Online Başvuru', sure: 3 }, { baslik: 'İdari Kontrol', sure: 30 },
    { baslik: 'Yerinde Kontrol', sure: 15 }, { baslik: 'Onay & Sözleşme', sure: 20 },
    { baslik: 'Uygulama', sure: 365 }, { baslik: 'Ödeme Talebi', sure: 60 }
  ],
  'Kalkınma Ajansı': [
    { baslik: 'Teklif Çağrısı', sure: 7 }, { baslik: 'Proje Fikri', sure: 10 },
    { baslik: 'Başvuru Formu', sure: 14 }, { baslik: 'Bütçe Hazırlama', sure: 7 },
    { baslik: 'Ekler Hazırlama', sure: 7 }, { baslik: 'Online Başvuru', sure: 2 },
    { baslik: 'Ön İnceleme', sure: 30 }, { baslik: 'Değerlendirme', sure: 45 },
    { baslik: 'Sözleşme', sure: 20 }, { baslik: 'Uygulama', sure: 365 }
  ],
  'Özel': [
    { baslik: 'Aşama 1', sure: 7 }, { baslik: 'Aşama 2', sure: 7 },
    { baslik: 'Aşama 3', sure: 7 }, { baslik: 'Aşama 4', sure: 7 }, { baslik: 'Aşama 5', sure: 7 }
  ]
};

// Başlangıç verileri
const initialCustomers = [
  {
    id: 1, firmaAdi: 'Tekno Yazılım A.Ş.', naceKodu: '62.01', faaliyetKonusu: 'Yazılım Geliştirme',
    kurulusYili: 2015, sonYilCiro: 5000000, calisanSayisi: 25, adres: 'Ankara, Çankaya',
    oncekiDestekler: ['KOSGEB', 'TÜBİTAK'], yetkiliAdi: 'Ahmet Yılmaz', vergiNo: '1234567890',
    yetkiliTC: '12345678901', oda: 'Ankara Ticaret Odası',
    yatirimPlani: { personel: true, makina: true, hizmet: false },
    cariDurum: { toplamBorc: 15000, gecmisBorc: 5000, tahsilEdilen: 10000 },
    ekAciklamalar: 'KOSGEB başvurusu devam ediyor',
    iletisim: { telefon: '0312 123 4567', email: 'info@teknoyazilim.com', whatsapp: '05321234567' },
    durum: 'aktif',
    islemler: [
      { tarih: '2024-01-15', islem: 'İlk görüşme yapıldı', tip: 'gorusme' },
      { tarih: '2024-01-20', islem: 'KOSGEB başvurusu hazırlandı', tip: 'basvuru' },
      { tarih: '2024-02-10', islem: 'Danışmanlık ücreti tahsil edildi', tip: 'odeme' }
    ],
    projeler: [{
      id: 1, projeAdi: 'Yazılım Ar-Ge Projesi', programTuru: 'KOBİGEL',
      baslangicTarihi: '2024-01-10', tahminiButce: 500000, durum: 'devam',
      anlasma: {
        bedel: 15000,
        tarih: '2024-01-10',
        aciklama: 'KOBİGEL danışmanlık hizmeti'
      },
      odemeler: [
        { id: 1, aciklama: 'Ön Ödeme (Sözleşme)', tutar: 5000, vadeTarihi: '2024-01-15', tahsilatTarihi: '2024-01-15', durum: 'tahsil' },
        { id: 2, aciklama: '2. Ödeme (Başvuru Sonrası)', tutar: 5000, vadeTarihi: '2024-02-15', tahsilatTarihi: '2024-02-10', durum: 'tahsil' },
        { id: 3, aciklama: '3. Ödeme (Onay Sonrası)', tutar: 5000, vadeTarihi: '2024-12-25', tahsilatTarihi: '', durum: 'bekliyor' }
      ],
      asamalar: [
        { asamaNo: 1, baslik: 'Ön Değerlendirme', tamamlandi: true, planlananTarih: '2024-01-15', gerceklesenTarih: '2024-01-10', notlar: 'Firma uygun bulundu' },
        { asamaNo: 2, baslik: 'Evrak Hazırlığı', tamamlandi: true, planlananTarih: '2024-01-25', gerceklesenTarih: '2024-01-20', notlar: 'Tüm evraklar toplandı' },
        { asamaNo: 3, baslik: 'Proje Yazımı', tamamlandi: true, planlananTarih: '2024-02-10', gerceklesenTarih: '2024-02-05', notlar: 'Proje dokümanı hazır' },
        { asamaNo: 4, baslik: 'Bütçe Planlaması', tamamlandi: true, planlananTarih: '2024-02-15', gerceklesenTarih: '2024-02-12', notlar: '500K bütçe onaylandı' },
        { asamaNo: 5, baslik: 'Online Başvuru', tamamlandi: true, planlananTarih: '2024-02-20', gerceklesenTarih: '2024-02-18', notlar: 'Başvuru no: KBG-2024-1234' },
        { asamaNo: 6, baslik: 'Evrak Teslimi', tamamlandi: true, planlananTarih: '2024-02-25', gerceklesenTarih: '2024-02-22', notlar: 'KOSGEB\'e teslim edildi' },
        { asamaNo: 7, baslik: 'Ön İnceleme', tamamlandi: false, planlananTarih: '2024-12-22', gerceklesenTarih: '', notlar: 'Bekleniyor' },
        { asamaNo: 8, baslik: 'Kurul Değerlendirme', tamamlandi: false, planlananTarih: '2025-01-15', gerceklesenTarih: '', notlar: '' },
        { asamaNo: 9, baslik: 'Sözleşme', tamamlandi: false, planlananTarih: '2025-02-01', gerceklesenTarih: '', notlar: '' },
        { asamaNo: 10, baslik: 'Uygulama & Ödeme', tamamlandi: false, planlananTarih: '2025-08-01', gerceklesenTarih: '', notlar: '' }
      ]
    }]
  },
  {
    id: 2, firmaAdi: 'Yeşil Tarım Ltd.', naceKodu: '01.11', faaliyetKonusu: 'Tarımsal Üretim',
    kurulusYili: 2010, sonYilCiro: 2500000, calisanSayisi: 12, adres: 'Konya, Selçuklu',
    oncekiDestekler: ['IPARD'], yetkiliAdi: 'Fatma Demir', vergiNo: '9876543210',
    yetkiliTC: '98765432109', oda: 'Konya Ticaret Odası',
    yatirimPlani: { personel: false, makina: true, hizmet: true },
    cariDurum: { toplamBorc: 8000, gecmisBorc: 0, tahsilEdilen: 22000 },
    ekAciklamalar: 'Sera yatırımı planlıyor',
    iletisim: { telefon: '0332 987 6543', email: 'info@yesiltarim.com', whatsapp: '05339876543' },
    durum: 'potansiyel',
    islemler: [{ tarih: '2024-02-01', islem: 'Telefon görüşmesi yapıldı', tip: 'gorusme' }],
    projeler: []
  },
  {
    id: 3, firmaAdi: 'Mavi Deniz Turizm', naceKodu: '79.12', faaliyetKonusu: 'Turizm Hizmetleri',
    kurulusYili: 2018, sonYilCiro: 3200000, calisanSayisi: 8, adres: 'Antalya, Muratpaşa',
    oncekiDestekler: [], yetkiliAdi: 'Mehmet Kaya', vergiNo: '5678901234',
    yetkiliTC: '56789012345', oda: 'Antalya Ticaret Odası',
    yatirimPlani: { personel: true, makina: false, hizmet: true },
    cariDurum: { toplamBorc: 0, gecmisBorc: 0, tahsilEdilen: 5000 },
    ekAciklamalar: 'Dijital pazarlama desteği istiyor',
    iletisim: { telefon: '0242 555 1234', email: 'info@mavideniz.com', whatsapp: '05425551234' },
    durum: 'hedef', islemler: [], projeler: []
  }
];

export default function KobiCRM() {
  const [currentTheme, setCurrentTheme] = useState('koyu');
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('genel');
  const [filterStatus, setFilterStatus] = useState('hepsi');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProjeModal, setShowProjeModal] = useState(false);
  const [showIslemModal, setShowIslemModal] = useState(false);
  const [selectedProje, setSelectedProje] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const theme = themes[currentTheme];

  const [newCustomer, setNewCustomer] = useState({
    firmaAdi: '', naceKodu: '', faaliyetKonusu: '', kurulusYili: '', sonYilCiro: '', calisanSayisi: '',
    adres: '', oncekiDestekler: [], yetkiliAdi: '', vergiNo: '', yetkiliTC: '', oda: '',
    yatirimPlani: { personel: false, makina: false, hizmet: false },
    cariDurum: { toplamBorc: 0, gecmisBorc: 0, tahsilEdilen: 0 }, ekAciklamalar: '',
    iletisim: { telefon: '', email: '', whatsapp: '' }, durum: 'potansiyel', islemler: [], projeler: []
  });

  const [newProje, setNewProje] = useState({ projeAdi: '', programTuru: 'KOBİGEL', baslangicTarihi: '', tahminiButce: '' });
  const [newIslem, setNewIslem] = useState({ tarih: '', islem: '', tip: 'gorusme' });

  // Bildirim göster
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Yardımcı fonksiyonlar
  const formatCurrency = (amount) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
  
  const getStatusColor = (status) => {
    const colors = { aktif: theme.success, potansiyel: theme.warning, hedef: theme.secondary };
    return colors[status] || theme.textMuted;
  };

  const getIslemIcon = (tip) => {
    const icons = { gorusme: '📞', basvuru: '📋', odeme: '💰', toplanti: '🤝' };
    return icons[tip] || '📌';
  };

  const getDaysRemaining = (date) => {
    if (!date) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  };

  const getProjeProgress = (proje) => {
    if (!proje?.asamalar?.length) return 0;
    return Math.round((proje.asamalar.filter(a => a.tamamlandi).length / proje.asamalar.length) * 100);
  };

  const getAsamaColor = (asama) => {
    if (asama.tamamlandi) return theme.success;
    const days = getDaysRemaining(asama.planlananTarih);
    if (days === null) return theme.textMuted;
    if (days < 0) return theme.danger;
    if (days <= 3) return theme.warning;
    if (days <= 7) return '#eab308';
    return theme.primary;
  };

  const getAsamaBgColor = (asama) => {
    if (asama.tamamlandi) return `${theme.success}20`;
    const days = getDaysRemaining(asama.planlananTarih);
    if (days === null) return 'transparent';
    if (days < 0) return `${theme.danger}20`;
    if (days <= 3) return `${theme.warning}20`;
    return 'transparent';
  };

  // Yaklaşan tarihler
  const getUpcomingDeadlines = () => {
    if (!selectedCustomer?.projeler) return [];
    const deadlines = [];
    selectedCustomer.projeler.forEach(proje => {
      proje.asamalar.forEach(asama => {
        if (!asama.tamamlandi && asama.planlananTarih) {
          const days = getDaysRemaining(asama.planlananTarih);
          if (days !== null && days <= 7) {
            deadlines.push({ ...asama, projeAdi: proje.projeAdi, projeId: proje.id, days });
          }
        }
      });
    });
    return deadlines.sort((a, b) => a.days - b.days);
  };

  // CRUD işlemleri
  const filteredCustomers = customers.filter(c => {
    const matchStatus = filterStatus === 'hepsi' || c.durum === filterStatus;
    const matchSearch = c.firmaAdi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       c.yetkiliAdi.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = {
    toplam: customers.length,
    aktif: customers.filter(c => c.durum === 'aktif').length,
    potansiyel: customers.filter(c => c.durum === 'potansiyel').length,
    hedef: customers.filter(c => c.durum === 'hedef').length,
    toplamAlacak: customers.reduce((sum, c) => sum + c.cariDurum.toplamBorc, 0),
    gecmisAlacak: customers.reduce((sum, c) => sum + c.cariDurum.gecmisBorc, 0)
  };

  const handleAddCustomer = () => {
    const customer = { 
      ...newCustomer, 
      id: Date.now(), 
      sonYilCiro: Number(newCustomer.sonYilCiro) || 0, 
      calisanSayisi: Number(newCustomer.calisanSayisi) || 0, 
      kurulusYili: Number(newCustomer.kurulusYili) || 2024 
    };
    setCustomers([...customers, customer]);
    setShowAddModal(false);
    setNewCustomer({
      firmaAdi: '', naceKodu: '', faaliyetKonusu: '', kurulusYili: '', sonYilCiro: '', calisanSayisi: '',
      adres: '', oncekiDestekler: [], yetkiliAdi: '', vergiNo: '', yetkiliTC: '', oda: '',
      yatirimPlani: { personel: false, makina: false, hizmet: false },
      cariDurum: { toplamBorc: 0, gecmisBorc: 0, tahsilEdilen: 0 }, ekAciklamalar: '',
      iletisim: { telefon: '', email: '', whatsapp: '' }, durum: 'potansiyel', islemler: [], projeler: []
    });
    showNotification('Müşteri eklendi!');
  };

  const handleUpdateCustomer = (updates) => {
    const updated = { ...selectedCustomer, ...updates };
    setCustomers(customers.map(c => c.id === selectedCustomer.id ? updated : c));
    setSelectedCustomer(updated);
  };

  const handleDeleteCustomer = () => {
    if (window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      setSelectedCustomer(null);
      showNotification('Müşteri silindi!', 'warning');
    }
  };

  const handleAddProje = () => {
    const startDate = newProje.baslangicTarihi || new Date().toISOString().split('T')[0];
    let currentDate = new Date(startDate);
    
    const asamalar = projeTemplates[newProje.programTuru].map((a, idx) => {
      currentDate.setDate(currentDate.getDate() + a.sure);
      return {
        asamaNo: idx + 1, 
        baslik: a.baslik, 
        tamamlandi: false, 
        planlananTarih: currentDate.toISOString().split('T')[0], 
        gerceklesenTarih: '', 
        notlar: ''
      };
    });
    
    const proje = { 
      id: Date.now(), 
      ...newProje, 
      baslangicTarihi: startDate,
      tahminiButce: Number(newProje.tahminiButce) || 0, 
      durum: 'devam', 
      anlasma: {
        bedel: 0,
        tarih: startDate,
        aciklama: ''
      },
      odemeler: [],
      asamalar 
    };
    handleUpdateCustomer({ projeler: [...(selectedCustomer.projeler || []), proje] });
    setShowProjeModal(false);
    setNewProje({ projeAdi: '', programTuru: 'KOBİGEL', baslangicTarihi: '', tahminiButce: '' });
    showNotification('Proje eklendi!');
  };

  const handleAddIslem = () => {
    const islem = { 
      ...newIslem, 
      tarih: newIslem.tarih || new Date().toISOString().split('T')[0] 
    };
    handleUpdateCustomer({ islemler: [...selectedCustomer.islemler, islem] });
    setShowIslemModal(false);
    setNewIslem({ tarih: '', islem: '', tip: 'gorusme' });
    showNotification('İşlem kaydedildi!');
  };

  const handleUpdateAsama = (projeId, asamaNo, updates) => {
    const updatedProjeler = selectedCustomer.projeler.map(p => {
      if (p.id === projeId) {
        return { 
          ...p, 
          asamalar: p.asamalar.map(a => a.asamaNo === asamaNo ? { ...a, ...updates } : a) 
        };
      }
      return p;
    });
    handleUpdateCustomer({ projeler: updatedProjeler });
  };

  const handleAddAsama = (projeId) => {
    const proje = selectedCustomer.projeler.find(p => p.id === projeId);
    const lastAsama = proje.asamalar[proje.asamalar.length - 1];
    const newDate = new Date(lastAsama?.planlananTarih || new Date());
    newDate.setDate(newDate.getDate() + 7);
    
    const newAsama = { 
      asamaNo: proje.asamalar.length + 1, 
      baslik: 'Yeni Aşama', 
      tamamlandi: false, 
      planlananTarih: newDate.toISOString().split('T')[0], 
      gerceklesenTarih: '', 
      notlar: '' 
    };
    
    const updatedProjeler = selectedCustomer.projeler.map(p => 
      p.id === projeId ? { ...p, asamalar: [...p.asamalar, newAsama] } : p
    );
    handleUpdateCustomer({ projeler: updatedProjeler });
    showNotification('Aşama eklendi!');
  };

  const handleDeleteAsama = (projeId, asamaNo) => {
    const updatedProjeler = selectedCustomer.projeler.map(p => {
      if (p.id === projeId) {
        const newAsamalar = p.asamalar
          .filter(a => a.asamaNo !== asamaNo)
          .map((a, idx) => ({ ...a, asamaNo: idx + 1 }));
        return { ...p, asamalar: newAsamalar };
      }
      return p;
    });
    handleUpdateCustomer({ projeler: updatedProjeler });
    showNotification('Aşama silindi!', 'warning');
  };

  const handleDeleteProje = (projeId) => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      handleUpdateCustomer({ projeler: selectedCustomer.projeler.filter(p => p.id !== projeId) });
      setSelectedProje(null);
      showNotification('Proje silindi!', 'warning');
    }
  };

  // Stiller
  const inputStyle = {
    width: '100%', padding: '12px', background: theme.input, 
    border: `1px solid ${theme.inputBorder}`, borderRadius: '8px', 
    color: theme.text, fontSize: '14px', boxSizing: 'border-box', outline: 'none'
  };

  const buttonStyle = {
    padding: '12px 24px', background: theme.primary, border: 'none', 
    borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '14px'
  };

  const buttonSecondaryStyle = {
    padding: '10px 16px', background: theme.input, 
    border: `1px solid ${theme.inputBorder}`, borderRadius: '8px', 
    color: theme.text, cursor: 'pointer', fontSize: '13px'
  };

  const cardStyle = {
    background: theme.card, border: `1px solid ${theme.cardBorder}`, 
    borderRadius: '16px', padding: '20px'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: theme.bgGradient, 
      color: theme.text, 
      fontFamily: "'Segoe UI', Tahoma, sans-serif", 
      padding: '20px',
      transition: 'all 0.3s ease'
    }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 20, right: 20, padding: '16px 24px',
          background: notification.type === 'success' ? theme.success : theme.warning,
          borderRadius: '12px', color: 'white', fontWeight: 500, zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)', animation: 'slideIn 0.3s ease'
        }}>
          {notification.message}
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.input}; border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: ${theme.inputBorder}; border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ ...cardStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700 }}>
            <span style={{ color: theme.titleColors[0] }}>KOBİ</span>
            <span style={{ color: theme.text }}> Danışmanlık </span>
            <span style={{ color: theme.titleColors[1] }}>CRM</span>
          </h1>
          <p style={{ margin: '4px 0 0', color: theme.textMuted, fontSize: '14px' }}>
            Müşteri İlişkileri Yönetim Sistemi
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Tema Seçici */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: theme.input, borderRadius: '10px', border: `1px solid ${theme.inputBorder}` }}>
            <span>{theme.icon}</span>
            <select 
              value={currentTheme} 
              onChange={e => setCurrentTheme(e.target.value)} 
              style={{ background: 'transparent', border: 'none', color: theme.text, fontSize: '14px', cursor: 'pointer', outline: 'none' }}
            >
              {Object.entries(themes).map(([key, t]) => (
                <option key={key} value={key} style={{ background: theme.card, color: theme.text }}>{t.icon} {t.name}</option>
              ))}
            </select>
          </div>
          <button onClick={() => setShowAddModal(true)} style={buttonStyle}>
            ➕ Yeni Müşteri
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Toplam Müşteri', value: stats.toplam, color: theme.primary, icon: '👥' },
          { label: 'Aktif', value: stats.aktif, color: theme.success, icon: '✅' },
          { label: 'Potansiyel', value: stats.potansiyel, color: theme.warning, icon: '🎯' },
          { label: 'Hedef', value: stats.hedef, color: theme.secondary, icon: '🔮' },
          { label: 'Toplam Alacak', value: formatCurrency(stats.toplamAlacak), color: theme.primary, icon: '💰' },
          { label: 'Vadesi Geçen', value: formatCurrency(stats.gecmisAlacak), color: theme.danger, icon: '⚠️' }
        ].map((s, i) => (
          <div key={i} style={{ ...cardStyle, padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '12px', color: theme.textMuted }}>{s.label}</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: s.color, marginTop: '4px' }}>{s.value}</div>
              </div>
              <span style={{ fontSize: '24px' }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedCustomer ? '380px 1fr' : '1fr', gap: '20px' }}>
        
        {/* Customer List */}
        <div style={cardStyle}>
          <input 
            type="text" 
            placeholder="🔍 Müşteri ara..." 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            style={{ ...inputStyle, marginBottom: '12px' }} 
          />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {['hepsi', 'aktif', 'potansiyel', 'hedef'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilterStatus(s)} 
                style={{ 
                  ...buttonSecondaryStyle, 
                  background: filterStatus === s ? getStatusColor(s) || theme.primary : theme.input, 
                  color: filterStatus === s ? 'white' : theme.text,
                  textTransform: 'capitalize'
                }}
              >
                {s}
              </button>
            ))}
          </div>
          
          <div style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {filteredCustomers.map(c => (
              <div 
                key={c.id} 
                onClick={() => { setSelectedCustomer(c); setActiveTab('genel'); setSelectedProje(null); setEditMode(false); }} 
                style={{ 
                  padding: '16px', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer',
                  background: selectedCustomer?.id === c.id ? `${theme.primary}22` : 'transparent',
                  border: `1px solid ${selectedCustomer?.id === c.id ? theme.primary : 'transparent'}`,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '15px' }}>{c.firmaAdi}</div>
                    <div style={{ fontSize: '13px', color: theme.textMuted, marginTop: '2px' }}>{c.yetkiliAdi}</div>
                  </div>
                  <span style={{ 
                    padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, 
                    background: getStatusColor(c.durum), color: 'white', textTransform: 'capitalize'
                  }}>
                    {c.durum}
                  </span>
                </div>
                
                {/* Proje Progress Barları */}
                {c.projeler?.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    {c.projeler.slice(0, 2).map(p => {
                      const progress = getProjeProgress(p);
                      return (
                        <div key={p.id} style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                            <span style={{ color: theme.textMuted }}>{p.programTuru}</span>
                            <span style={{ color: progress === 100 ? theme.success : theme.primary, fontWeight: 600 }}>%{progress}</span>
                          </div>
                          <div style={{ height: '6px', background: theme.input, borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ 
                              height: '100%', 
                              width: `${progress}%`, 
                              background: progress === 100 
                                ? `linear-gradient(90deg, ${theme.success}, #34d399)` 
                                : `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                              borderRadius: '3px',
                              transition: 'width 0.5s ease'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                    {c.projeler.length > 2 && (
                      <span style={{ fontSize: '10px', color: theme.textMuted }}>+{c.projeler.length - 2} proje daha</span>
                    )}
                  </div>
                )}
                
                {c.cariDurum.gecmisBorc > 0 && (
                  <div style={{ 
                    marginTop: '8px', padding: '6px 10px', 
                    background: `${theme.danger}20`, borderRadius: '6px',
                    fontSize: '11px', color: theme.danger
                  }}>
                    ⚠️ Vadesi geçen: {formatCurrency(c.cariDurum.gecmisBorc)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Customer Detail */}
        {selectedCustomer && (
          <div style={cardStyle}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 600 }}>{selectedCustomer.firmaAdi}</h2>
                <p style={{ margin: '6px 0 0', color: theme.textMuted, fontSize: '14px' }}>
                  {selectedCustomer.faaliyetKonusu} • {selectedCustomer.adres}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <select 
                  value={selectedCustomer.durum} 
                  onChange={e => handleUpdateCustomer({ durum: e.target.value })}
                  style={{ ...inputStyle, width: 'auto', padding: '8px 12px' }}
                >
                  <option value="aktif">✅ Aktif</option>
                  <option value="potansiyel">🎯 Potansiyel</option>
                  <option value="hedef">🔮 Hedef</option>
                </select>
                <button 
                  onClick={() => setEditMode(!editMode)} 
                  style={{ ...buttonSecondaryStyle, background: editMode ? theme.success : theme.input, color: editMode ? 'white' : theme.text }}
                >
                  {editMode ? '💾 Kaydet' : '✏️ Düzenle'}
                </button>
                <button onClick={handleDeleteCustomer} style={{ ...buttonSecondaryStyle, color: theme.danger }}>🗑️</button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', borderBottom: `1px solid ${theme.cardBorder}`, paddingBottom: '12px' }}>
              {[
                { key: 'genel', label: '📋 Genel Bilgiler' },
                { key: 'projeler', label: '🎯 Proje Takip' },
                { key: 'cari', label: '💰 Cari Durum' },
                { key: 'islemler', label: '📝 İşlem Geçmişi' },
                { key: 'iletisim', label: '📞 İletişim' }
              ].map(tab => (
                <button 
                  key={tab.key} 
                  onClick={() => setActiveTab(tab.key)} 
                  style={{ 
                    ...buttonSecondaryStyle, 
                    background: activeTab === tab.key ? theme.primary : 'transparent', 
                    color: activeTab === tab.key ? 'white' : theme.text,
                    border: activeTab === tab.key ? 'none' : `1px solid ${theme.inputBorder}`
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
              
              {/* GENEL BİLGİLER */}
              {activeTab === 'genel' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  {[
                    { label: 'NACE Kodu', key: 'naceKodu' },
                    { label: 'Kuruluş Yılı', key: 'kurulusYili' },
                    { label: 'Çalışan Sayısı', key: 'calisanSayisi' },
                    { label: 'Son Yıl Ciro', key: 'sonYilCiro', format: formatCurrency },
                    { label: 'Yetkili Adı', key: 'yetkiliAdi' },
                    { label: 'Vergi No', key: 'vergiNo' },
                    { label: 'TC Kimlik', key: 'yetkiliTC' },
                    { label: 'Bağlı Oda', key: 'oda' }
                  ].map(f => (
                    <div key={f.key} style={{ padding: '14px', background: theme.input, borderRadius: '10px' }}>
                      <div style={{ fontSize: '11px', color: theme.textMuted, marginBottom: '6px' }}>{f.label}</div>
                      {editMode ? (
                        <input 
                          type="text" 
                          value={selectedCustomer[f.key] || ''} 
                          onChange={e => handleUpdateCustomer({ [f.key]: e.target.value })} 
                          style={{ ...inputStyle, padding: '8px', border: `2px solid ${theme.primary}` }} 
                        />
                      ) : (
                        <div style={{ fontWeight: 500 }}>
                          {f.format ? f.format(selectedCustomer[f.key]) : (selectedCustomer[f.key] || '-')}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Önceki Destekler */}
                  <div style={{ gridColumn: '1 / -1', padding: '14px', background: theme.input, borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: theme.textMuted, marginBottom: '8px' }}>Önceki Destekler</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {selectedCustomer.oncekiDestekler?.length > 0 ? 
                        selectedCustomer.oncekiDestekler.map((d, i) => (
                          <span key={i} style={{ padding: '6px 12px', background: `${theme.warning}30`, borderRadius: '6px', fontSize: '12px', color: theme.warning }}>
                            {d}
                          </span>
                        )) : <span style={{ color: theme.textMuted }}>-</span>
                      }
                    </div>
                  </div>
                  
                  {/* Açıklamalar */}
                  <div style={{ gridColumn: '1 / -1', padding: '14px', background: theme.input, borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', color: theme.textMuted, marginBottom: '6px' }}>Açıklamalar</div>
                    {editMode ? (
                      <textarea 
                        value={selectedCustomer.ekAciklamalar || ''} 
                        onChange={e => handleUpdateCustomer({ ekAciklamalar: e.target.value })} 
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', border: `2px solid ${theme.primary}` }} 
                      />
                    ) : (
                      <div style={{ lineHeight: 1.6 }}>{selectedCustomer.ekAciklamalar || '-'}</div>
                    )}
                  </div>
                </div>
              )}

              {/* PROJE TAKİP */}
              {activeTab === 'projeler' && (
                <div>
                  {/* Yaklaşan Tarihler Uyarısı */}
                  {(() => {
                    const deadlines = getUpcomingDeadlines();
                    if (deadlines.length > 0) {
                      return (
                        <div style={{ 
                          marginBottom: '20px', padding: '16px', 
                          background: `linear-gradient(135deg, ${theme.danger}15, ${theme.warning}10)`,
                          borderRadius: '12px', border: `1px solid ${theme.danger}30`
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '18px' }}>⚠️</span>
                            <strong style={{ color: theme.danger }}>Yaklaşan / Geciken Tarihler</strong>
                          </div>
                          {deadlines.map((d, i) => (
                            <div key={i} style={{ 
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '10px 12px', background: theme.input, borderRadius: '8px', marginBottom: '6px'
                            }}>
                              <div>
                                <span style={{ fontWeight: 500 }}>{d.baslik}</span>
                                <span style={{ color: theme.textMuted, marginLeft: '8px', fontSize: '12px' }}>({d.projeAdi})</span>
                              </div>
                              <span style={{ 
                                padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                background: d.days < 0 ? theme.danger : theme.warning,
                                color: 'white'
                              }}>
                                {d.days < 0 ? `${Math.abs(d.days)} gün gecikti!` : d.days === 0 ? 'Bugün!' : `${d.days} gün kaldı`}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ margin: 0 }}>🎯 Proje Takip</h4>
                      <span style={{ fontSize: '13px', color: theme.textMuted }}>{selectedCustomer.projeler?.length || 0} proje</span>
                    </div>
                    <button onClick={() => setShowProjeModal(true)} style={{ ...buttonStyle, background: theme.success }}>
                      ➕ Yeni Proje
                    </button>
                  </div>

                  {selectedCustomer.projeler?.length > 0 ? selectedCustomer.projeler.map(proje => {
                    const progress = getProjeProgress(proje);
                    const isOpen = selectedProje?.id === proje.id;
                    
                    return (
                      <div key={proje.id} style={{ 
                        background: theme.input, borderRadius: '14px', marginBottom: '14px', 
                        overflow: 'hidden', border: isOpen ? `2px solid ${theme.primary}` : `1px solid ${theme.cardBorder}`
                      }}>
                        {/* Proje Header */}
                        <div 
                          onClick={() => setSelectedProje(isOpen ? null : proje)} 
                          style={{ padding: '18px', cursor: 'pointer', background: isOpen ? `${theme.primary}10` : 'transparent' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontWeight: 600, fontSize: '16px' }}>{proje.projeAdi}</span>
                                <span style={{ 
                                  padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                  background: proje.durum === 'tamamlandi' ? theme.success : 
                                             proje.durum === 'beklemede' ? theme.warning : theme.primary,
                                  color: 'white', textTransform: 'uppercase'
                                }}>
                                  {proje.durum}
                                </span>
                              </div>
                              <div style={{ fontSize: '13px', color: theme.textMuted, marginTop: '4px' }}>
                                {proje.programTuru} • {proje.baslangicTarihi} • {formatCurrency(proje.tahminiButce)}
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ 
                                fontSize: '28px', fontWeight: 700,
                                color: progress === 100 ? theme.success : progress > 50 ? theme.primary : theme.warning
                              }}>
                                %{progress}
                              </div>
                              <div style={{ fontSize: '11px', color: theme.textMuted }}>tamamlandı</div>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div style={{ height: '10px', background: theme.cardBorder, borderRadius: '5px', overflow: 'hidden' }}>
                            <div style={{ 
                              height: '100%', width: `${progress}%`,
                              background: progress === 100 
                                ? `linear-gradient(90deg, ${theme.success}, #34d399)` 
                                : progress > 50 
                                  ? `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`
                                  : `linear-gradient(90deg, ${theme.warning}, #fbbf24)`,
                              borderRadius: '5px', transition: 'width 0.5s ease'
                            }} />
                          </div>

                          {/* Mini Aşama Gösterimi */}
                          <div style={{ display: 'flex', gap: '4px', marginTop: '12px', flexWrap: 'wrap' }}>
                            {proje.asamalar.map((asama, idx) => (
                              <div
                                key={idx}
                                title={`${asama.baslik} - ${asama.planlananTarih || 'Tarih yok'}`}
                                style={{
                                  width: '28px', height: '28px', borderRadius: '6px',
                                  background: getAsamaColor(asama),
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '11px', fontWeight: 600, color: 'white'
                                }}
                              >
                                {asama.tamamlandi ? '✓' : idx + 1}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expanded Aşama Detayları */}
                        {isOpen && (
                          <div style={{ padding: '0 18px 18px', borderTop: `1px solid ${theme.cardBorder}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
                              <span style={{ color: theme.primary, fontWeight: 500 }}>📋 Aşama Detayları ({proje.asamalar.length} aşama)</span>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleAddAsama(proje.id)} style={{ ...buttonSecondaryStyle, background: `${theme.success}20`, color: theme.success }}>
                                  ➕ Aşama Ekle
                                </button>
                                <button onClick={() => handleDeleteProje(proje.id)} style={{ ...buttonSecondaryStyle, background: `${theme.danger}20`, color: theme.danger }}>
                                  🗑️ Projeyi Sil
                                </button>
                              </div>
                            </div>

                            {proje.asamalar.map((asama, idx) => {
                              const days = getDaysRemaining(asama.planlananTarih);
                              const asamaColor = getAsamaColor(asama);
                              
                              return (
                                <div key={idx} style={{ 
                                  padding: '14px', marginBottom: '8px', borderRadius: '10px',
                                  background: getAsamaBgColor(asama),
                                  border: `1px solid ${asamaColor}40`
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                    {/* Checkbox */}
                                    <label style={{ 
                                      width: '32px', height: '32px', borderRadius: '8px',
                                      background: asama.tamamlandi ? theme.success : theme.cardBorder,
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      cursor: 'pointer', flexShrink: 0
                                    }}>
                                      <input 
                                        type="checkbox" 
                                        checked={asama.tamamlandi}
                                        onChange={() => handleUpdateAsama(proje.id, asama.asamaNo, { 
                                          tamamlandi: !asama.tamamlandi,
                                          gerceklesenTarih: !asama.tamamlandi ? new Date().toISOString().split('T')[0] : ''
                                        })}
                                        style={{ display: 'none' }}
                                      />
                                      <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>
                                        {asama.tamamlandi ? '✓' : asama.asamaNo}
                                      </span>
                                    </label>

                                    {/* Aşama Adı */}
                                    <input 
                                      type="text" 
                                      value={asama.baslik}
                                      onChange={e => handleUpdateAsama(proje.id, asama.asamaNo, { baslik: e.target.value })}
                                      style={{ 
                                        ...inputStyle, flex: 1, padding: '8px 12px', fontWeight: 500,
                                        opacity: asama.tamamlandi ? 0.8 : 1
                                      }}
                                    />

                                    {/* Durum Badge */}
                                    <span style={{ 
                                      padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                                      background: asamaColor, color: 'white', whiteSpace: 'nowrap'
                                    }}>
                                      {asama.tamamlandi ? 'Tamamlandı' : 
                                       days === null ? 'Tarih yok' :
                                       days < 0 ? `${Math.abs(days)} gün gecikti!` :
                                       days === 0 ? 'Bugün!' : `${days} gün`}
                                    </span>

                                    {/* Sil Butonu */}
                                    {proje.asamalar.length > 1 && (
                                      <button 
                                        onClick={() => handleDeleteAsama(proje.id, asama.asamaNo)}
                                        style={{ 
                                          width: '28px', height: '28px', borderRadius: '6px',
                                          background: `${theme.danger}20`, border: 'none',
                                          color: theme.danger, cursor: 'pointer', fontSize: '12px'
                                        }}
                                      >
                                        ✕
                                      </button>
                                    )}
                                  </div>

                                  {/* Tarih ve Not Alanları */}
                                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginLeft: '44px' }}>
                                    <div>
                                      <label style={{ fontSize: '10px', color: theme.textMuted }}>📅 Planlanan Tarih</label>
                                      <input 
                                        type="date" 
                                        value={asama.planlananTarih || ''}
                                        onChange={e => handleUpdateAsama(proje.id, asama.asamaNo, { planlananTarih: e.target.value })}
                                        style={{ ...inputStyle, padding: '6px 10px', marginTop: '4px', fontSize: '12px' }}
                                      />
                                    </div>
                                    <div>
                                      <label style={{ fontSize: '10px', color: theme.textMuted }}>✅ Tamamlanma Tarihi</label>
                                      <input 
                                        type="date" 
                                        value={asama.gerceklesenTarih || ''}
                                        onChange={e => handleUpdateAsama(proje.id, asama.asamaNo, { 
                                          gerceklesenTarih: e.target.value,
                                          tamamlandi: !!e.target.value
                                        })}
                                        style={{ ...inputStyle, padding: '6px 10px', marginTop: '4px', fontSize: '12px' }}
                                      />
                                    </div>
                                    <div style={{ gridColumn: 'span 2' }}>
                                      <label style={{ fontSize: '10px', color: theme.textMuted }}>💬 Notlar</label>
                                      <input 
                                        type="text" 
                                        placeholder="Not ekle..."
                                        value={asama.notlar || ''}
                                        onChange={e => handleUpdateAsama(proje.id, asama.asamaNo, { notlar: e.target.value })}
                                        style={{ ...inputStyle, padding: '6px 10px', marginTop: '4px', fontSize: '12px' }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }) : (
                    <div style={{ textAlign: 'center', padding: '50px', color: theme.textMuted }}>
                      <div style={{ fontSize: '50px', marginBottom: '12px' }}>📊</div>
                      <div style={{ marginBottom: '16px' }}>Henüz proje yok</div>
                      <button onClick={() => setShowProjeModal(true)} style={{ ...buttonStyle, background: theme.success }}>
                        ➕ İlk Projeyi Ekle
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* CARİ DURUM */}
              {activeTab === 'cari' && (
                <div>
                  {/* Firma Genel Özet */}
                  {(() => {
                    // Tüm projelerden toplam hesapla
                    const projeler = selectedCustomer.projeler || [];
                    const toplamAnlasma = projeler.reduce((sum, p) => sum + (p.anlasma?.bedel || 0), 0);
                    const toplamTahsilat = projeler.reduce((sum, p) => {
                      const odemeler = p.odemeler || [];
                      return sum + odemeler.filter(o => o.durum === 'tahsil').reduce((s, o) => s + (o.tutar || 0), 0);
                    }, 0);
                    const toplamBekleyen = projeler.reduce((sum, p) => {
                      const odemeler = p.odemeler || [];
                      return sum + odemeler.filter(o => o.durum === 'bekliyor').reduce((s, o) => s + (o.tutar || 0), 0);
                    }, 0);
                    const toplamGeciken = projeler.reduce((sum, p) => {
                      const odemeler = p.odemeler || [];
                      return sum + odemeler.filter(o => {
                        if (o.durum !== 'bekliyor') return false;
                        const days = getDaysRemaining(o.vadeTarihi);
                        return days !== null && days < 0;
                      }).reduce((s, o) => s + (o.tutar || 0), 0);
                    }, 0);
                    const tahsilatOrani = toplamAnlasma > 0 ? Math.round((toplamTahsilat / toplamAnlasma) * 100) : 0;
                    const barColor = tahsilatOrani >= 50 
                      ? `linear-gradient(90deg, #22c55e, #4ade80)` 
                      : `linear-gradient(90deg, #ef4444, #f87171)`;
                    const textColor = tahsilatOrani >= 50 ? theme.success : theme.danger;

                    return (
                      <>
                        {/* Özet Kartları */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
                          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '12px', background: `${theme.primary}15`, border: `1px solid ${theme.primary}30` }}>
                            <span style={{ fontSize: '28px' }}>📋</span>
                            <div style={{ fontSize: '12px', color: theme.textMuted, margin: '6px 0' }}>Toplam Anlaşma</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: theme.primary }}>{formatCurrency(toplamAnlasma)}</div>
                          </div>
                          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '12px', background: `${theme.success}15`, border: `1px solid ${theme.success}30` }}>
                            <span style={{ fontSize: '28px' }}>✅</span>
                            <div style={{ fontSize: '12px', color: theme.textMuted, margin: '6px 0' }}>Tahsil Edilen</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: theme.success }}>{formatCurrency(toplamTahsilat)}</div>
                          </div>
                          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '12px', background: `${theme.warning}15`, border: `1px solid ${theme.warning}30` }}>
                            <span style={{ fontSize: '28px' }}>⏳</span>
                            <div style={{ fontSize: '12px', color: theme.textMuted, margin: '6px 0' }}>Bekleyen</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: theme.warning }}>{formatCurrency(toplamBekleyen)}</div>
                          </div>
                          <div style={{ padding: '20px', textAlign: 'center', borderRadius: '12px', background: `${theme.danger}15`, border: `1px solid ${theme.danger}30` }}>
                            <span style={{ fontSize: '28px' }}>⚠️</span>
                            <div style={{ fontSize: '12px', color: theme.textMuted, margin: '6px 0' }}>Vadesi Geçen</div>
                            <div style={{ fontSize: '20px', fontWeight: 700, color: theme.danger }}>{formatCurrency(toplamGeciken)}</div>
                          </div>
                        </div>

                        {/* Genel Tahsilat Oranı */}
                        <div style={{ padding: '16px 20px', background: theme.input, borderRadius: '12px', marginBottom: '24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontWeight: 500 }}>📊 Genel Tahsilat Oranı</span>
                            <span style={{ fontWeight: 700, color: textColor, fontSize: '18px' }}>%{tahsilatOrani}</span>
                          </div>
                          <div style={{ height: '12px', background: theme.cardBorder, borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${tahsilatOrani}%`, background: barColor, borderRadius: '6px', transition: 'width 0.5s ease' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: theme.textMuted }}>
                            <span>%0</span>
                            <span style={{ color: textColor }}>{tahsilatOrani >= 50 ? '✓ İyi durumda' : '⚠ Tahsilat düşük'}</span>
                            <span>%100</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}

                  {/* Proje Bazlı Ödeme Planları */}
                  <h4 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>💰</span> Proje Bazlı Ödeme Planları
                  </h4>

                  {selectedCustomer.projeler && selectedCustomer.projeler.length > 0 ? (
                    selectedCustomer.projeler.map(proje => {
                      const odemeler = proje.odemeler || [];
                      const anlasma = proje.anlasma || { bedel: 0, tarih: '', aciklama: '' };
                      const tahsilEdilen = odemeler.filter(o => o.durum === 'tahsil').reduce((sum, o) => sum + (o.tutar || 0), 0);
                      const bekleyen = odemeler.filter(o => o.durum === 'bekliyor').reduce((sum, o) => sum + (o.tutar || 0), 0);
                      const projeOran = anlasma.bedel > 0 ? Math.round((tahsilEdilen / anlasma.bedel) * 100) : 0;
                      const projeBarColor = projeOran >= 50 ? theme.success : theme.danger;

                      return (
                        <div key={proje.id} style={{ 
                          background: theme.input, borderRadius: '14px', marginBottom: '16px',
                          border: `1px solid ${theme.cardBorder}`, overflow: 'hidden'
                        }}>
                          {/* Proje Header */}
                          <div style={{ padding: '16px 20px', background: `${theme.primary}10`, borderBottom: `1px solid ${theme.cardBorder}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <div>
                                <div style={{ fontWeight: 600, fontSize: '16px' }}>{proje.projeAdi}</div>
                                <div style={{ fontSize: '12px', color: theme.textMuted, marginTop: '2px' }}>{proje.programTuru}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '11px', color: theme.textMuted }}>Tahsilat</div>
                                <div style={{ fontWeight: 700, color: projeBarColor, fontSize: '18px' }}>%{projeOran}</div>
                              </div>
                            </div>
                            
                            {/* Proje Mini Progress */}
                            <div style={{ height: '6px', background: theme.cardBorder, borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${projeOran}%`, background: projeBarColor, borderRadius: '3px' }} />
                            </div>
                          </div>

                          {/* Anlaşma Bilgileri */}
                          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.cardBorder}` }}>
                            <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '10px', fontWeight: 500 }}>📝 Anlaşma Bilgileri</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                              <div>
                                <label style={{ fontSize: '10px', color: theme.textMuted }}>Anlaşma Bedeli (₺)</label>
                                <input
                                  type="number"
                                  value={anlasma.bedel || ''}
                                  onChange={e => {
                                    const updated = selectedCustomer.projeler.map(p => 
                                      p.id === proje.id ? { ...p, anlasma: { ...p.anlasma, bedel: Number(e.target.value) } } : p
                                    );
                                    handleUpdateCustomer({ projeler: updated });
                                  }}
                                  style={{ ...inputStyle, padding: '8px 12px', marginTop: '4px', fontWeight: 600, fontSize: '15px' }}
                                  placeholder="10000"
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '10px', color: theme.textMuted }}>Anlaşma Tarihi</label>
                                <input
                                  type="date"
                                  value={anlasma.tarih || ''}
                                  onChange={e => {
                                    const updated = selectedCustomer.projeler.map(p => 
                                      p.id === proje.id ? { ...p, anlasma: { ...p.anlasma, tarih: e.target.value } } : p
                                    );
                                    handleUpdateCustomer({ projeler: updated });
                                  }}
                                  style={{ ...inputStyle, padding: '8px 12px', marginTop: '4px' }}
                                />
                              </div>
                              <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ fontSize: '10px', color: theme.textMuted }}>Açıklama</label>
                                <input
                                  type="text"
                                  value={anlasma.aciklama || ''}
                                  onChange={e => {
                                    const updated = selectedCustomer.projeler.map(p => 
                                      p.id === proje.id ? { ...p, anlasma: { ...p.anlasma, aciklama: e.target.value } } : p
                                    );
                                    handleUpdateCustomer({ projeler: updated });
                                  }}
                                  style={{ ...inputStyle, padding: '8px 12px', marginTop: '4px' }}
                                  placeholder="Anlaşma detayı..."
                                />
                              </div>
                            </div>
                            
                            {/* Özet Satırı */}
                            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', padding: '10px', background: theme.card, borderRadius: '8px' }}>
                              <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: theme.textMuted }}>Anlaşma</div>
                                <div style={{ fontWeight: 600, color: theme.primary }}>{formatCurrency(anlasma.bedel)}</div>
                              </div>
                              <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: theme.textMuted }}>Tahsilat</div>
                                <div style={{ fontWeight: 600, color: theme.success }}>{formatCurrency(tahsilEdilen)}</div>
                              </div>
                              <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: theme.textMuted }}>Kalan</div>
                                <div style={{ fontWeight: 600, color: theme.warning }}>{formatCurrency(anlasma.bedel - tahsilEdilen)}</div>
                              </div>
                            </div>
                          </div>

                          {/* Ödeme Planı */}
                          <div style={{ padding: '16px 20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                              <span style={{ fontSize: '12px', color: theme.textMuted, fontWeight: 500 }}>💳 Ödeme Planı ({odemeler.length} taksit)</span>
                              <button
                                onClick={() => {
                                  const yeniOdeme = { id: Date.now(), aciklama: 'Yeni Ödeme', tutar: 0, vadeTarihi: '', tahsilatTarihi: '', durum: 'bekliyor' };
                                  const updated = selectedCustomer.projeler.map(p => 
                                    p.id === proje.id ? { ...p, odemeler: [...(p.odemeler || []), yeniOdeme] } : p
                                  );
                                  handleUpdateCustomer({ projeler: updated });
                                }}
                                style={{ ...buttonSecondaryStyle, padding: '6px 12px', fontSize: '11px', background: `${theme.success}20`, color: theme.success, border: 'none' }}
                              >
                                ➕ Ödeme Ekle
                              </button>
                            </div>

                            {odemeler.length > 0 ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {odemeler.map((odeme, idx) => {
                                  const days = getDaysRemaining(odeme.vadeTarihi);
                                  const isLate = days !== null && days < 0 && odeme.durum !== 'tahsil';
                                  const durumRenk = odeme.durum === 'tahsil' ? theme.success : isLate ? theme.danger : theme.warning;

                                  return (
                                    <div key={odeme.id} style={{
                                      padding: '12px', borderRadius: '10px',
                                      background: odeme.durum === 'tahsil' ? `${theme.success}10` : isLate ? `${theme.danger}10` : theme.card,
                                      border: `1px solid ${durumRenk}30`
                                    }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <div style={{
                                          width: '28px', height: '28px', borderRadius: '6px',
                                          background: durumRenk, color: 'white',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          fontWeight: 700, fontSize: '12px', flexShrink: 0
                                        }}>
                                          {odeme.durum === 'tahsil' ? '✓' : idx + 1}
                                        </div>
                                        <input
                                          type="text"
                                          value={odeme.aciklama}
                                          onChange={e => {
                                            const updatedOdemeler = odemeler.map(o => o.id === odeme.id ? { ...o, aciklama: e.target.value } : o);
                                            const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: updatedOdemeler } : p);
                                            handleUpdateCustomer({ projeler: updated });
                                          }}
                                          style={{ ...inputStyle, flex: 1, padding: '6px 10px', fontSize: '13px' }}
                                        />
                                        <span style={{ padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, background: durumRenk, color: 'white', whiteSpace: 'nowrap' }}>
                                          {odeme.durum === 'tahsil' ? '✓ Tahsil' : isLate ? `${Math.abs(days)}g gecikti` : odeme.durum === 'bekliyor' ? '⏳ Bekliyor' : '❌ İptal'}
                                        </span>
                                        <button
                                          onClick={() => {
                                            const updatedOdemeler = odemeler.filter(o => o.id !== odeme.id);
                                            const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: updatedOdemeler } : p);
                                            handleUpdateCustomer({ projeler: updated });
                                          }}
                                          style={{ width: '24px', height: '24px', borderRadius: '4px', background: `${theme.danger}20`, border: 'none', color: theme.danger, cursor: 'pointer', fontSize: '10px' }}
                                        >✕</button>
                                      </div>
                                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginLeft: '38px' }}>
                                        <div>
                                          <label style={{ fontSize: '9px', color: theme.textMuted }}>Tutar (₺)</label>
                                          <input
                                            type="number"
                                            value={odeme.tutar || ''}
                                            onChange={e => {
                                              const updatedOdemeler = odemeler.map(o => o.id === odeme.id ? { ...o, tutar: Number(e.target.value) } : o);
                                              const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: updatedOdemeler } : p);
                                              handleUpdateCustomer({ projeler: updated });
                                            }}
                                            style={{ ...inputStyle, padding: '5px 8px', marginTop: '2px', fontSize: '12px' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ fontSize: '9px', color: theme.textMuted }}>Vade</label>
                                          <input
                                            type="date"
                                            value={odeme.vadeTarihi || ''}
                                            onChange={e => {
                                              const updatedOdemeler = odemeler.map(o => o.id === odeme.id ? { ...o, vadeTarihi: e.target.value } : o);
                                              const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: updatedOdemeler } : p);
                                              handleUpdateCustomer({ projeler: updated });
                                            }}
                                            style={{ ...inputStyle, padding: '5px 8px', marginTop: '2px', fontSize: '11px' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ fontSize: '9px', color: theme.textMuted }}>Tahsilat</label>
                                          <input
                                            type="date"
                                            value={odeme.tahsilatTarihi || ''}
                                            onChange={e => {
                                              const updatedOdemeler = odemeler.map(o => o.id === odeme.id ? { ...o, tahsilatTarihi: e.target.value, durum: e.target.value ? 'tahsil' : 'bekliyor' } : o);
                                              const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: updatedOdemeler } : p);
                                              handleUpdateCustomer({ projeler: updated });
                                            }}
                                            style={{ ...inputStyle, padding: '5px 8px', marginTop: '2px', fontSize: '11px' }}
                                          />
                                        </div>
                                        <div>
                                          <label style={{ fontSize: '9px', color: theme.textMuted }}>Durum</label>
                                          <select
                                            value={odeme.durum}
                                            onChange={e => {
                                              const updatedOdemeler = odemeler.map(o => o.id === odeme.id ? { ...o, durum: e.target.value } : o);
                                              const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: updatedOdemeler } : p);
                                              handleUpdateCustomer({ projeler: updated });
                                            }}
                                            style={{ ...inputStyle, padding: '5px 8px', marginTop: '2px', fontSize: '11px' }}
                                          >
                                            <option value="bekliyor">⏳ Bekliyor</option>
                                            <option value="tahsil">✅ Tahsil</option>
                                            <option value="iptal">❌ İptal</option>
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div style={{ textAlign: 'center', padding: '20px', color: theme.textMuted }}>
                                <button
                                  onClick={() => {
                                    const standartOdemeler = [
                                      { id: Date.now(), aciklama: 'Ön Ödeme', tutar: 0, vadeTarihi: '', tahsilatTarihi: '', durum: 'bekliyor' },
                                      { id: Date.now() + 1, aciklama: '2. Ödeme', tutar: 0, vadeTarihi: '', tahsilatTarihi: '', durum: 'bekliyor' },
                                      { id: Date.now() + 2, aciklama: 'Final Ödeme', tutar: 0, vadeTarihi: '', tahsilatTarihi: '', durum: 'bekliyor' }
                                    ];
                                    const updated = selectedCustomer.projeler.map(p => p.id === proje.id ? { ...p, odemeler: standartOdemeler } : p);
                                    handleUpdateCustomer({ projeler: updated });
                                  }}
                                  style={{ ...buttonSecondaryStyle, background: `${theme.primary}20`, color: theme.primary, border: 'none' }}
                                >
                                  📋 3 Taksitli Plan Oluştur
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: theme.textMuted, background: theme.input, borderRadius: '12px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
                      <div style={{ marginBottom: '8px' }}>Henüz proje bulunmuyor</div>
                      <div style={{ fontSize: '13px' }}>Ödeme planı oluşturmak için önce "Proje Takip" sekmesinden proje ekleyin.</div>
                    </div>
                  )}
                </div>
              )}

              {/* İŞLEM GEÇMİŞİ */}
              {activeTab === 'islemler' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ margin: 0 }}>📝 İşlem Geçmişi</h4>
                    <button onClick={() => setShowIslemModal(true)} style={{ ...buttonStyle, background: theme.secondary }}>
                      ➕ Yeni İşlem
                    </button>
                  </div>

                  {selectedCustomer.islemler?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[...selectedCustomer.islemler].reverse().map((islem, idx) => (
                        <div key={idx} style={{ 
                          display: 'flex', gap: '14px', padding: '14px',
                          background: theme.input, borderRadius: '10px',
                          borderLeft: `4px solid ${theme.primary}`
                        }}>
                          <div style={{ 
                            width: '40px', height: '40px', borderRadius: '10px',
                            background: `${theme.primary}20`, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                          }}>
                            {getIslemIcon(islem.tip)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 500 }}>{islem.islem}</div>
                            <div style={{ fontSize: '12px', color: theme.textMuted, marginTop: '4px' }}>
                              📅 {islem.tarih} • {islem.tip}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: theme.textMuted }}>
                      <div style={{ fontSize: '40px', marginBottom: '12px' }}>📝</div>
                      <div>Henüz işlem kaydı yok</div>
                    </div>
                  )}
                </div>
              )}

              {/* İLETİŞİM */}
              {activeTab === 'iletisim' && (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {[
                    { label: '📱 Telefon', key: 'telefon' },
                    { label: '✉️ E-posta', key: 'email' },
                    { label: '💬 WhatsApp', key: 'whatsapp' }
                  ].map(f => (
                    <div key={f.key} style={{ 
                      padding: '18px', background: theme.input, borderRadius: '12px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '6px' }}>{f.label}</div>
                        {editMode ? (
                          <input 
                            type="text" 
                            value={selectedCustomer.iletisim[f.key] || ''}
                            onChange={e => handleUpdateCustomer({ iletisim: { ...selectedCustomer.iletisim, [f.key]: e.target.value } })}
                            style={{ ...inputStyle, border: `2px solid ${theme.primary}` }}
                          />
                        ) : (
                          <div style={{ fontWeight: 500, fontSize: '15px' }}>{selectedCustomer.iletisim[f.key] || '-'}</div>
                        )}
                      </div>
                      {f.key === 'whatsapp' && selectedCustomer.iletisim.whatsapp && (
                        <button 
                          onClick={() => window.open(`https://wa.me/${selectedCustomer.iletisim.whatsapp.replace(/\D/g, '')}`, '_blank')}
                          style={{ ...buttonStyle, background: '#25D366', marginLeft: '12px' }}
                        >
                          💬 Mesaj Gönder
                        </button>
                      )}
                      {f.key === 'email' && selectedCustomer.iletisim.email && (
                        <button 
                          onClick={() => window.open(`mailto:${selectedCustomer.iletisim.email}`, '_blank')}
                          style={{ ...buttonStyle, background: theme.primary, marginLeft: '12px' }}
                        >
                          ✉️ E-posta Gönder
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ ...cardStyle, maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto' }}>
            <h3 style={{ margin: '0 0 20px' }}>➕ Yeni Müşteri Ekle</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Firma Adı *</label>
                <input type="text" value={newCustomer.firmaAdi} onChange={e => setNewCustomer({ ...newCustomer, firmaAdi: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Yetkili Adı *</label>
                <input type="text" value={newCustomer.yetkiliAdi} onChange={e => setNewCustomer({ ...newCustomer, yetkiliAdi: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>NACE Kodu</label>
                <input type="text" value={newCustomer.naceKodu} onChange={e => setNewCustomer({ ...newCustomer, naceKodu: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Faaliyet Konusu</label>
                <input type="text" value={newCustomer.faaliyetKonusu} onChange={e => setNewCustomer({ ...newCustomer, faaliyetKonusu: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Telefon</label>
                <input type="text" value={newCustomer.iletisim.telefon} onChange={e => setNewCustomer({ ...newCustomer, iletisim: { ...newCustomer.iletisim, telefon: e.target.value } })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>E-posta</label>
                <input type="text" value={newCustomer.iletisim.email} onChange={e => setNewCustomer({ ...newCustomer, iletisim: { ...newCustomer.iletisim, email: e.target.value } })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Adres</label>
                <input type="text" value={newCustomer.adres} onChange={e => setNewCustomer({ ...newCustomer, adres: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowAddModal(false)} style={buttonSecondaryStyle}>İptal</button>
              <button onClick={handleAddCustomer} disabled={!newCustomer.firmaAdi || !newCustomer.yetkiliAdi} style={{ ...buttonStyle, opacity: (!newCustomer.firmaAdi || !newCustomer.yetkiliAdi) ? 0.5 : 1 }}>Müşteri Ekle</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showProjeModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ ...cardStyle, maxWidth: '550px', width: '100%' }}>
            <h3 style={{ margin: '0 0 20px' }}>🎯 Yeni Proje Ekle</h3>
            <div style={{ display: 'grid', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Proje Adı *</label>
                <input type="text" value={newProje.projeAdi} onChange={e => setNewProje({ ...newProje, projeAdi: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} placeholder="Örn: Dijitalleşme Projesi" />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Program Türü</label>
                <select value={newProje.programTuru} onChange={e => setNewProje({ ...newProje, programTuru: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }}>
                  {Object.keys(projeTemplates).map(p => <option key={p} value={p}>{p} ({projeTemplates[p].length} aşama)</option>)}
                </select>
              </div>
              <div style={{ padding: '12px', background: `${theme.success}15`, borderRadius: '8px', border: `1px solid ${theme.success}30` }}>
                <div style={{ fontSize: '11px', color: theme.success, marginBottom: '8px' }}>📋 {newProje.programTuru} Aşamaları:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {projeTemplates[newProje.programTuru].map((a, idx) => (
                    <span key={idx} style={{ padding: '4px 8px', background: theme.input, borderRadius: '4px', fontSize: '11px' }}>
                      {idx + 1}. {a.baslik}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: theme.textMuted }}>Başlangıç Tarihi</label>
                  <input type="date" value={newProje.baslangicTarihi} onChange={e => setNewProje({ ...newProje, baslangicTarihi: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: theme.textMuted }}>Tahmini Bütçe (₺)</label>
                  <input type="number" value={newProje.tahminiButce} onChange={e => setNewProje({ ...newProje, tahminiButce: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} placeholder="500000" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowProjeModal(false)} style={buttonSecondaryStyle}>İptal</button>
              <button onClick={handleAddProje} disabled={!newProje.projeAdi} style={{ ...buttonStyle, background: theme.success, opacity: !newProje.projeAdi ? 0.5 : 1 }}>Proje Oluştur</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Islem Modal */}
      {showIslemModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ ...cardStyle, maxWidth: '450px', width: '100%' }}>
            <h3 style={{ margin: '0 0 20px' }}>📝 Yeni İşlem Ekle</h3>
            <div style={{ display: 'grid', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Tarih</label>
                <input type="date" value={newIslem.tarih} onChange={e => setNewIslem({ ...newIslem, tarih: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>İşlem Tipi</label>
                <select value={newIslem.tip} onChange={e => setNewIslem({ ...newIslem, tip: e.target.value })} style={{ ...inputStyle, marginTop: '4px' }}>
                  <option value="gorusme">📞 Görüşme</option>
                  <option value="toplanti">🤝 Toplantı</option>
                  <option value="basvuru">📋 Başvuru</option>
                  <option value="odeme">💰 Ödeme</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted }}>Açıklama *</label>
                <textarea value={newIslem.islem} onChange={e => setNewIslem({ ...newIslem, islem: e.target.value })} style={{ ...inputStyle, marginTop: '4px', minHeight: '80px', resize: 'vertical' }} placeholder="İşlem detayını yazın..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowIslemModal(false)} style={buttonSecondaryStyle}>İptal</button>
              <button onClick={handleAddIslem} disabled={!newIslem.islem} style={{ ...buttonStyle, background: theme.secondary, opacity: !newIslem.islem ? 0.5 : 1 }}>İşlem Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
