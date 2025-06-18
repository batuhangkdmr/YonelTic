import { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  Box,
  Paper,
  Chip,
  Stack,
  Tooltip,
  Divider,
  Pagination,
  Fab,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Select,
  FormControl,
  InputLabel,
  Button,
  CircularProgress
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from '../components/Sidebar';
import { debounce } from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gorselImg1 from '../assets/gorsel.png';
import gorselImg2 from '../assets/gorsel1.png';
import gorselImg3 from '../assets/gorsel2.png';
import gorselImg4 from '../assets/gorsel3.png';
import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import config from '../config';

const PRODUCTS_PER_PAGE = 30;

const API_BASE_URL = config.API_BASE_URL;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategories, setOpenCategories] = useState({});
  const productsSectionRef = React.useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // Debounce search
  const debouncedSetSearch = useMemo(() => debounce((val) => setDebouncedSearch(val), 300), []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  // API'den ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `${API_BASE_URL}/Products?page=${page}&pageSize=${PRODUCTS_PER_PAGE}`;
        if (selectedBrand !== 'all') url += `&categoryId=${selectedBrand}`;
        if (selectedSubCategory !== 'all') url += `&subCategory=${selectedSubCategory}`;
        if (debouncedSearch) url += `&search=${encodeURIComponent(debouncedSearch)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Ürünler yüklenirken bir hata oluştu');
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
        setTotalProducts(data.totalProducts || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedBrand, selectedSubCategory, debouncedSearch]);

  // API'den kategorileri çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Categories`);
        if (!response.ok) {
          throw new Error('Kategoriler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        
        // Kategorileri düzenle
        const formattedCategories = data.map(category => ({
          value: category.id.toString(),
          label: category.name,
          subCategories: Array.isArray(category.subCategories) 
            ? category.subCategories.map(sub => sub.name || sub)
            : []
        }));

        setCategories(formattedCategories);
      } catch (err) {
        console.error('Kategori yükleme hatası:', err);
      }
    };

    fetchCategories();
  }, []);

  // Sadece arama için client-side filtreleme
  const filteredProducts = products;

  // Sayfa değişince URL'yi güncelle
  const handlePageChange = (event, value) => {
    setPage(value);
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileFilterToggle = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  const handleCategoryToggle = (categoryId) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Kategori seçildiğinde
  const handleCategorySelect = (categoryId) => {
    setSelectedBrand(categoryId);
    setSelectedSubCategory('all');
    setPage(1);
    if (categoryId === 'all') {
      setSearchParams({ page: 1 });
    } else {
      setSearchParams({ category: categoryId, page: 1 });
    }
  };

  // Alt kategori seçildiğinde
  const handleSubCategorySelect = (categoryId, subCategory) => {
    console.log('SubCategory selected:', { categoryId, subCategory }); // Debug için
    setSelectedBrand(categoryId);
    setSelectedSubCategory(subCategory);
    setPage(1);
    
    // Alt kategori seçiliyse URL'ye hem category hem subCategory parametrelerini ekle
    setSearchParams({ 
      category: categoryId, 
      subCategory: subCategory,
      page: 1 
    });
  };

  // URL'den category parametresi varsa, ilk açılışta filtreyi ona göre ayarla
  useEffect(() => {
    const urlCategory = searchParams.get('category') || 'all';
    const urlSubCategory = searchParams.get('subCategory') || 'all';
    const urlPage = parseInt(searchParams.get('page')) || 1;
    const urlBrand = searchParams.get('brand');

    console.log('URL params:', { urlCategory, urlSubCategory, urlPage, urlBrand }); // Debug için

    if (urlBrand) {
      // Marka ID'sini kategori ID'sine dönüştür
      const brandToCategoryMap = {
        'karatas': '1', // Karataş Traktör
        'foton': '2',   // Foton Traktör
        'mutlu': '3',   // Mutlu Akü
        'iveco': '4',   // Iveco
        'lovol': '5'    // Lovol
      };
      
      const categoryId = brandToCategoryMap[urlBrand] || 'all';
      setSelectedBrand(categoryId);
      setSearchParams({ category: categoryId, page: 1 });
    } else {
    setSelectedBrand(urlCategory);
    setSelectedSubCategory(urlSubCategory);
    setPage(urlPage);
    }
  }, [searchParams]);
  
  

  // Eğer category parametresi varsa, ürünler bölümüne scroll yap
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && productsSectionRef.current) {
      setTimeout(() => {
        productsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [searchParams]);

  // Custom arrow components for Products page
  const ProductArrow = ({ className, style, onClick, direction }) => (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'rgba(255,255,255,0.9)',
        borderRadius: '50%',
        width: 40,
        height: 40,
        zIndex: 2,
        boxShadow: 2,
        color: 'darkred',
        '&:before': { display: 'none' },
        position: 'absolute',
        top: '50%',
        left: direction === 'left' ? 8 : 'auto',
        right: direction === 'right' ? 8 : 'auto',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: 28,
      }}
    >
      {direction === 'left' ? <ArrowBackIosNewIcon sx={{ fontSize: 22 }} /> : <ArrowForwardIosIcon sx={{ fontSize: 22 }} />}
    </Box>
  );

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 6, px: { xs: 0.5, md: 2 } }}>
      <Helmet>
        <title>Ürünlerimiz | Yönel Oto & Yedek Parça</title>
        <meta name="description" content="Yönel Oto & Yedek Parça ürün kataloğu. Karataş Traktör, Foton Traktör, Mutlu Akü ve Iveco yedek parçaları." />
        <meta property="og:title" content="Ürünlerimiz | Yönel Oto & Yedek Parça" />
        <meta property="og:description" content="Yönel Oto & Yedek Parça ürün kataloğu. Karataş Traktör, Foton Traktör, Mutlu Akü ve Iveco yedek parçaları." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoneloto.com/products" />
      </Helmet>

      {/* Küçük Slider Alanı */}
      <Box sx={{ width: '100%', maxWidth: '100vw', overflow: 'hidden', mb: 4 }}>
        <Slider
          dots={false}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3500}
          arrows={true}
          nextArrow={<ProductArrow direction="right" />}
          prevArrow={<ProductArrow direction="left" />}
        >
          {[0, 1, 2, 3].map((j) => (
            <Box key={j} sx={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#e3eafc' }}>
              <Box
                component="img"
                src={
                  j === 0 ? gorselImg1 :
                  j === 1 ? gorselImg2 :
                  j === 2 ? gorselImg3 :
                  gorselImg4
                }
                alt={`Slider görseli ${j+1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 3,
                  boxShadow: 2,
                  display: 'block',
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Mobile Filter Button */}
      <Fab
        color="primary"
        aria-label="filter"
        onClick={handleMobileFilterToggle}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', md: 'none' },
          zIndex: 1000,
        }}
      >
        <FilterListIcon />
      </Fab>

      {/* WhatsApp Button (All Devices) */}
      <Fab
        aria-label="whatsapp"
        href="https://wa.me/905542597273"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: 'fixed',
          bottom: { xs: 88, sm: 96, md: 32 },
          right: { xs: 16, sm: 24, md: 32 },
          zIndex: 2000,
          width: { xs: 48, sm: 56, md: 64 },
          height: { xs: 48, sm: 56, md: 64 },
          bgcolor: '#25D366',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          '&:hover': {
            bgcolor: '#1DA851',
            transform: 'scale(1.05)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
          },
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 24, sm: 28, md: 32 } }} />
      </Fab>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="right"
        open={mobileFilterOpen}
        onClose={handleMobileFilterToggle}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            p: 3,
            bgcolor: '#fff',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Filtreleme
          </Typography>
          <IconButton onClick={handleMobileFilterToggle} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List component="nav" sx={{ width: '100%' }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => {
              handleCategorySelect('all');
              setMobileFilterOpen(false);
            }}>
              <ListItemText
                primary="Tüm Kategoriler"
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: selectedBrand === 'all' ? 'primary.main' : 'text.primary'
                }}
              />
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <div key={category.value}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleCategoryToggle(category.value)}>
                  <ListItemText
                    primary={category.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: selectedBrand === category.value ? 'primary.main' : 'text.primary'
                    }}
                  />
                  {openCategories[category.value] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openCategories[category.value]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.subCategories.map((subCat) => (
                    <ListItemButton
                      key={typeof subCat === 'string' ? subCat : subCat.name}
                      selected={selectedSubCategory === (typeof subCat === 'string' ? subCat : subCat.name) && selectedBrand === category.value}
                      onClick={() => {
                        handleSubCategorySelect(category.value, typeof subCat === 'string' ? subCat : subCat.name);
                        setMobileFilterOpen(false);
                      }}
                      sx={{ pl: 6 }}
                    >
                      <ListItemText primary={typeof subCat === 'string' ? subCat : subCat.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>

        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleMobileFilterToggle}
            sx={{ py: 1.5 }}
          >
            Filtreleri Uygula
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600, mb: 1, color: 'darkred', letterSpacing: 1, fontSize: { xs: 22, md: 40 }, mt: { xs: 1, md: 0 } }}>
          Ürünlerimiz
        </Typography>
        <Divider sx={{ mb: 2, maxWidth: 240, width: '100%', mx: 'auto', borderColor: 'primary.main', borderBottomWidth: 2, borderRadius: 2 }} />
        <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Ürün ara..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', md: '25%' } }}
          />
        </Box>
        {/* Ürünler bölümü için referans noktası */}
        <div ref={productsSectionRef} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar
            brands={categories}
            selectedBrand={selectedBrand}
            setSelectedBrand={handleCategorySelect}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={(subCategory) => handleSubCategorySelect(selectedBrand, subCategory)}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : filteredProducts.length === 0 ? (
            <Typography align="center">
              Ürün bulunamadı.
            </Typography>
          ) : (
            <>
              <div className="container-fluid px-2">
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-md-4">
                  {filteredProducts.map((product) => (
                    <div className="col" key={product.id}>
                      <div 
                        className="card h-100 shadow-sm hover-shadow transition-all"
                        onClick={() => navigate(`/products/${product.id}`)}
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.3s ease-in-out'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.boxShadow = '0 0.5rem 1rem rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
                        }}
                      >
                        <img
                          src={product.imageUrl || 'https://via.placeholder.com/200'}
                          className="card-img-top p-2 p-md-3"
                          alt={product.name}
                          style={{ height: '150px', objectFit: 'contain' }}
                        />
                        <div className="card-body d-flex flex-column p-2 p-md-3">
                          <h5 className="card-title text-truncate" style={{ fontSize: '0.9rem' }}>{product.name}</h5>
                          <p className="card-text flex-grow-1" style={{ fontSize: '0.8rem' }}>{product.description}</p>
                          <div className="d-flex flex-wrap gap-1 mt-2">
                            <span className="badge bg-primary" style={{ fontSize: '0.7rem' }}>{product.category?.name}</span>
                            {product.subCategory?.name && (
                              <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>{product.subCategory.name}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sayfalama */}
              {totalPages > 1 && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: 4, 
                  mb: 2,
                  '& .MuiPaginationItem-root': {
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    minWidth: { xs: '32px', md: '40px' },
                    height: { xs: '32px', md: '40px' },
                    margin: { xs: '0 2px', md: '0 4px' }
                  }
                }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Products;