# Warehouse Management System (WMS)

Warehouse Management System (WMS) untuk cold storage yang dapat menampilkan data stok dan suhu ruang penyimpanan.

## Struktur Proyek

```bash
warehouse-management-system/
├── public/
│   └── db.json
├── src/
│   ├── components/
│   │   ├── AddInboundForm.tsx
│   │   ├── Navbar.tsx
│   │   └── RoomCard.tsx
│   │   └── ToggleDarkMode.tsx
│   ├── hooks/
│   │   └── usePolling.ts
│   ├── pages/
│   │   ├── AddInbound.tsx
│   │   ├── Dashboard.tsx
│   │   ├── InventoryList.tsx
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   └── inventoryStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## Cara Menjalankan

### 1. Clone & Install
```bash
git clone https://github.com/avsholeh/warehouse-management-system/
```
```bash
cd warehouse-management-system
```
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```

### 3. Jalankan Endpoint Server
```bash
npm run server
```
Akses di: http://localhost:8000

## Alasan Desain Arsitektur

1. Vite, React & TypeScript: Mempercepat proses development, build, hot reload dan didukung dengan type safety dari TypeScript.
2. Chakra UI: UI yang konsisten dan mendukung dark mode.
3. Zustand: State management yang ringan, dapat menyimpan data ke localStorage otomatis sehingga data tetap ada saat reload, UX lebih baik.