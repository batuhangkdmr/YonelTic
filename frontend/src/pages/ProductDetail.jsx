import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:5054/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Görsel büyütme modalı

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/Products/${id}`);
        if (!response.ok) throw new Error('Ürün bulunamadı.');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '40vh',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error || 'Ürün bulunamadı.'}
        </Typography>
        <Button
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
          startIcon={<ArrowBackIcon />}
          variant="contained"
          color="primary"
        >
          Geri Dön
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: { xs: 10, md: 4 }, px: 2 }}>
      {/* Ürün Kartı */}
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          textAlign: 'center',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* Ürün Görseli (tıklanabilir) */}
        <Box
          component="img"
          src={product.imageUrl || 'https://via.placeholder.com/500'}
          alt={product.name}
          onClick={() => setIsOpen(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500';
          }}
          sx={{
            width: { xs: '100%', md: '80%' },
            height: 'auto',
            maxHeight: 500,
            objectFit: 'contain',
            borderRadius: 4,
            boxShadow: 4,
            mb: 4,
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        />

        {/* Ürün Adı */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: 'primary.main' }}
        >
          {product.name}
        </Typography>

        {/* Ürün Açıklaması */}
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', whiteSpace: 'pre-line', mb: 3 }}
        >
          {product.description}
        </Typography>

        {/* Kategoriler */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {product.category?.name && (
            <Chip label={product.category.name} color="primary" />
          )}
          {product.subCategory?.name && (
            <Chip label={product.subCategory.name} color="secondary" />
          )}
        </Box>
      </Paper>

      {/* Geri Dön Butonu - kart altı sağda */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="contained"
          sx={{
            backgroundColor: 'error.main',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'error.dark',
            },
          }}
          onClick={() => navigate(-1)}
        >
          Geri Dön
        </Button>
      </Box>

      {/* Zoom Görsel Modal */}
      {isOpen && (
        <Box
          onClick={() => setIsOpen(false)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <Box
            component="img"
            src={product.imageUrl}
            alt={product.name}
            sx={{
              width: { xs: '90%', md: '70%' },
              maxHeight: '90%',
              borderRadius: 3,
              boxShadow: 6,
              animation: 'zoomIn 0.3s ease',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductDetail;
