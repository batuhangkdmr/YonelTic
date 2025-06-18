import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { apiFetch } from '../../utils/api';
import AdminLayout from '../../components/AdminLayout';
import Pagination from '@mui/material/Pagination';
import config from '../../config';

const API_BASE_URL = config.API_BASE_URL;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    subCategoryId: '',
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [dialogError, setDialogError] = useState(null);
  const [objectUrl, setObjectUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
    fetchCategories();
    // Temizlik: component unmount olunca objectUrl'i serbest bırak
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    // eslint-disable-next-line
  }, [currentPage]);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFetch(`${API_BASE_URL}/products?page=${page}&pageSize=30`);
      if (!response.ok) {
        throw new Error('Ürünler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setError(error.message);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error('Kategoriler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleOpenDialog = (product = null) => {
    setDialogError(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        categoryId: product.categoryId ? String(product.categoryId) : '',
        subCategoryId: product.subCategoryId ? String(product.subCategoryId) : '',
        image: null,
      });
      setImagePreview(product.imageUrl || '');
    } else {
      setSelectedProduct(null);
      setFormData({ name: '', description: '', categoryId: '', subCategoryId: '', image: null });
      setImagePreview('');
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({ name: '', description: '', categoryId: '', subCategoryId: '', image: null });
    setImagePreview('');
    setDialogError(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'categoryId' ? { subCategoryId: '' } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setObjectUrl(url);
    } else {
      setImagePreview('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setDialogError(null);
    try {
      const url = selectedProduct
        ? `${API_BASE_URL}/products/${selectedProduct.id}`
        : `${API_BASE_URL}/products`;
      const method = selectedProduct ? 'PUT' : 'POST';
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.categoryId) formDataToSend.append('categoryId', formData.categoryId);
      if (formData.subCategoryId) formDataToSend.append('subCategoryId', formData.subCategoryId);
      if (formData.image) formDataToSend.append('image', formData.image);
      const response = await apiFetch(url, {
        method,
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error('İşlem başarısız oldu');
      }
      await fetchProducts(currentPage);
      handleCloseDialog();
    } catch (err) {
      setDialogError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await apiFetch(`${API_BASE_URL}/products/${productToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Ürün silinirken bir hata oluştu');
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const getSubCategories = (categoryId) => {
    const cat = categories.find((c) => String(c.id) === String(categoryId));
    return cat && cat.subCategories ? cat.subCategories : [];
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            Ürün Yönetimi
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ bgcolor: 'darkred', '&:hover': { bgcolor: '#a80000' } }}
          >
            Yeni Ürün Ekle
          </Button>
        </Box>

        {!Array.isArray(products) || products.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6">Henüz ürün bulunmamaktadır.</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'darkred' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Resim</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ürün Adı</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Açıklama</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Marka</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>Alt Kategori</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 600 }}>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>
                      <Box
                        component="img"
                        src={product.imageUrl}
                        alt={product.name}
                        sx={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 1 }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      {categories.find(c => c.id === product.categoryId)?.name || 'Belirtilmemiş'}
                    </TableCell>
                    <TableCell>
                      {product.subCategory?.name || 'Belirtilmemiş'}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenDialog(product)} sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteClick(product)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  minWidth: 40,
                  height: 40,
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: 'darkred',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#a80000',
                    },
                  },
                },
              }}
            />
          </Box>
        )}

        {/* Ürün Ekle/Güncelle Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProduct ? 'Ürünü Düzenle' : 'Yeni Ürün'}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {dialogError && <Alert severity="error" sx={{ mb: 2 }}>{dialogError}</Alert>}
              <TextField
                name="name"
                label="Ürün Adı"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField
                name="description"
                label="Açıklama"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Kategori</InputLabel>
                <Select
                  name="categoryId"
                  value={formData.categoryId}
                  label="Kategori"
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  {categories.filter(c => !c.parentId).map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Alt Kategori</InputLabel>
                <Select
                  name="subCategoryId"
                  value={formData.subCategoryId}
                  label="Alt Kategori"
                  onChange={handleInputChange}
                  disabled={!formData.categoryId}
                >
                  <MenuItem value="">Seçiniz</MenuItem>
                  {getSubCategories(formData.categoryId).map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Bilgisayardan Resim Yükle
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
              </Button>
              {imagePreview && (
                <Box sx={{ mb: 2 }}>
                  <img src={imagePreview} alt="Önizleme" style={{ width: 120, height: 120, objectFit: 'contain', border: '1px solid #eee', borderRadius: 8 }} />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>İptal</Button>
              <Button type="submit" variant="contained" disabled={uploading}>
                {selectedProduct ? 'Güncelle' : 'Ekle'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Silme Onay Dialogu */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Ürünü Sil</DialogTitle>
          <DialogContent>
            <Typography>"{productToDelete?.name}" ürününü silmek istediğinizden emin misiniz?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel}>İptal</Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained">Sil</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminLayout>
  );
};

export default AdminProducts; 