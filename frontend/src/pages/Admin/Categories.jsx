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
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSubDialog, setOpenSubDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '' });
  const [subFormData, setSubFormData] = useState({ name: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5054/api/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Kategoriler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Kategori ekle/düzenle
  const handleOpenDialog = (category = null) => {
    setSelectedCategory(category);
    setFormData({ name: category ? category.name : '' });
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
    setFormData({ name: '' });
  };
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const url = selectedCategory
        ? `http://localhost:5054/api/categories/${selectedCategory.id}`
        : 'http://localhost:5054/api/categories';
      const method = selectedCategory ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('İşlem başarısız oldu');
      await fetchCategories();
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteCategory = async (id) => {
    if (window.confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:5054/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) throw new Error('Silme işlemi başarısız oldu');
        await fetchCategories();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Alt kategori ekle/düzenle (sadece name/id ile çalışacak)
  const handleOpenSubDialog = (category, subCategory = null) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
    setSubFormData({ name: subCategory ? subCategory.name : '' });
    setOpenSubDialog(true);
  };
  const handleCloseSubDialog = () => {
    setOpenSubDialog(false);
    setSelectedSubCategory(null);
    setSubFormData({ name: '' });
  };
  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      // Alt kategori ekle
      if (!selectedSubCategory) {
        const response = await fetch('http://localhost:5054/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ name: subFormData.name, parentId: selectedCategory.id }),
        });
        if (!response.ok) throw new Error('Alt kategori eklenemedi');
      } else {
        // Alt kategori düzenle (gerekirse mevcut yapıya göre güncellenebilir)
        const response = await fetch(`http://localhost:5054/api/categories/${selectedSubCategory.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ name: subFormData.name, parentId: selectedCategory.id }),
        });
        if (!response.ok) throw new Error('Alt kategori güncellenemedi');
      }
      await fetchCategories();
      handleCloseSubDialog();
    } catch (err) {
      setError(err.message);
    }
  };
  const handleDeleteSubCategory = async (categoryId, subCategoryId) => {
    if (window.confirm('Bu alt kategoriyi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`http://localhost:5054/api/categories/${subCategoryId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          let errorMsg = 'Alt kategori silinemedi';
          let text = await response.text();
          try {
            const data = JSON.parse(text);
            errorMsg = data.message || data || errorMsg;
          } catch {
            errorMsg = text || errorMsg;
          }
          throw new Error(errorMsg);
        }
        await fetchCategories();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Kategori Yönetimi</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Yeni Kategori
        </Button>
      </Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Kategori Adı</TableCell>
              <TableCell>Alt Kategoriler</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .filter(category => !category.parentId && category.parentId !== 0)
              .map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category.subCategories && category.subCategories.length > 0
                      ? category.subCategories.map(sub => (
                          <span key={sub.id} style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}>
                            {sub.name}
                            <IconButton size="small" color="error" onClick={() => handleDeleteSubCategory(category.id, sub.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        ))
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenDialog(category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteCategory(category.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => handleOpenSubDialog(category)}>
                      Alt Kategori Ekle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Kategori Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{selectedCategory ? 'Kategori Düzenle' : 'Yeni Kategori'}</DialogTitle>
        <form onSubmit={handleCategorySubmit}>
          <DialogContent>
            <TextField
              name="name"
              label="Kategori Adı"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              fullWidth
              required
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>İptal</Button>
            <Button type="submit" variant="contained">
              {selectedCategory ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Alt Kategori Dialog */}
      <Dialog open={openSubDialog} onClose={handleCloseSubDialog} maxWidth="xs" fullWidth>
        <DialogTitle>{selectedSubCategory ? 'Alt Kategori Düzenle' : 'Alt Kategori Ekle'}</DialogTitle>
        <form onSubmit={handleSubCategorySubmit}>
          <DialogContent>
            <TextField
              name="name"
              label="Alt Kategori Adı"
              value={subFormData.name}
              onChange={(e) => setSubFormData({ name: e.target.value })}
              fullWidth
              required
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSubDialog}>İptal</Button>
            <Button type="submit" variant="contained">
              {selectedSubCategory ? 'Güncelle' : 'Ekle'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default AdminCategories; 