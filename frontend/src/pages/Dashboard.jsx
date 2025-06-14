import { useState } from 'react';
import ProductsAdmin from './ProductsAdmin';
// import CategoriesAdmin from './CategoriesAdmin'; // Kategori yönetimi için ekleyebilirsin

const Dashboard = () => {
  const [tab, setTab] = useState('products');

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 32 }}>Admin Paneli</h1>
      <nav style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
        <button onClick={() => setTab('products')} style={{ padding: '8px 24px', fontWeight: 600, background: tab === 'products' ? '#1976d2' : '#eee', color: tab === 'products' ? '#fff' : '#222', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Ürünler</button>
        {/* <button onClick={() => setTab('categories')} style={{ padding: '8px 24px', fontWeight: 600, background: tab === 'categories' ? '#1976d2' : '#eee', color: tab === 'categories' ? '#fff' : '#222', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Kategoriler</button> */}
        {/* Diğer sekmeler */}
      </nav>
      <hr style={{ marginBottom: 32 }} />
      {tab === 'products' && <ProductsAdmin />}
      {/* {tab === 'categories' && <CategoriesAdmin />} */}
    </div>
  );
};

export default Dashboard; 