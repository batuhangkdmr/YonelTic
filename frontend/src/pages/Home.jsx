import { Container, Typography, Grid, Box, Button, Paper, Chip } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';
import { memo, useMemo, useCallback, useState, useEffect } from 'react';


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const advantages = [
  {
    icon: <DirectionsCarFilledIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Geniş Ürün Yelpazesi',
    desc: '2000+ çeşit yedek parça ve aksesuar.'
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Orijinal & Kaliteli Ürün',
    desc: 'Tüm ürünlerimiz garantili ve orijinaldir.'
  },
  {
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Uzman Destek',
    desc: 'Deneyimli ekibimizle her zaman yanınızdayız.'
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Hızlı Teslimat',
    desc: 'Siparişleriniz hızlı ve güvenli şekilde elinizde.'
  },
];

const placeholder = '/images/placeholder.png';

const ProductCard = memo(({ product, onClick }) => (
  <Paper
    elevation={3}
    sx={{
      minWidth: { xs: 220, md: 240 },
      maxWidth: 260,
      flex: '0 0 auto',
      borderRadius: 3,
      p: 2,
      cursor: 'pointer',
      transition: 'transform 0.18s, box-shadow 0.18s',
      '&:hover': { transform: 'scale(1.04)', boxShadow: 8 },
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
    }}
    onClick={onClick}
  >
    <Box 
      component="img" 
      src={product.image} 
      alt={product.name} 
      sx={{ 
        width: 90, 
        height: 90, 
        objectFit: 'contain', 
        mb: 2, 
        bgcolor: '#f3f4f6', 
        borderRadius: 2 
      }}
      loading="lazy"
    />
    <Chip label={product.subCategory} color="secondary" size="small" sx={{ mb: 1, fontWeight: 600 }} />
    <Typography variant="subtitle1" fontWeight={700} align="center" sx={{ mb: 1, fontSize: 17 }}>
      {product.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: 13, minHeight: 32 }}>
      {product.description}
    </Typography>
  </Paper>
));

const AdvantageCard = memo(({ advantage }) => (
  <Grid item xs={12} sm={6} md={3} lg={3} xl={3} sx={{ display: 'flex' }}>
    <Paper elevation={3} sx={{ 
      p: { xs: 2, md: 4 }, 
      textAlign: 'center', 
      borderRadius: 3, 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: { xs: 240, md: 240 },
      minHeight: { xs: 240, md: 240 },
      maxHeight: { xs: 240, md: 240 },
      boxSizing: 'border-box',
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', flex: 1, justifyContent: 'center' }}>
        <Box sx={{ mb: 2 }}>{advantage.icon}</Box>
        <Typography 
          variant="h6" 
          fontWeight={700} 
          sx={{ 
            mt: 0, 
            fontSize: { xs: '1rem', md: '1.25rem' },
            minHeight: { xs: 28, md: 32 },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            maxWidth: 180,
            alignSelf: 'center',
            color: 'darkred',
          }}
        >{advantage.title}</Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            color: 'text.secondary', 
            fontSize: { xs: '0.8rem', md: '0.875rem' },
            minHeight: { xs: 38, md: 38 },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            maxWidth: 200,
            alignSelf: 'center',
          }}
        >{advantage.desc}</Typography>
      </Box>
    </Paper>
  </Grid>
));

// Custom arrow components
const Arrow = ({ className, style, onClick, direction }) => (
  <Box
    className={className}
    onClick={onClick}
    sx={{
      ...style,
      display: 'flex !important',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'rgba(255,255,255,0.95)',
      borderRadius: '50%',
      width: { xs: 48, md: 40 },
      height: { xs: 48, md: 40 },
      zIndex: 99,
      boxShadow: 2,
      color: 'darkred',
      '&:before': { display: 'none' },
      position: 'absolute',
      top: '50%',
      left: direction === 'left' ? { xs: 4, md: 8 } : 'auto',
      right: direction === 'right' ? { xs: 4, md: 8 } : 'auto',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: { xs: 32, md: 28 },
      transition: 'all 0.2s',
      border: '2px solid #eee',
    }}
  >
    {direction === 'left' ? <ArrowBackIosNewIcon sx={{ fontSize: { xs: 28, md: 22 } }} /> : <ArrowForwardIosIcon sx={{ fontSize: { xs: 28, md: 22 } }} />}
  </Box>
);

const Home = () => {
  const navigate = useNavigate();
  const [openImage, setOpenImage] = useState(null);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('md'));
  
  // Öne çıkan ürünler için boş bir dizi kullanıyoruz
  const featuredProducts = useMemo(() => [], []);

  // Slider görselleri için state
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch('http://localhost:5054/api/SliderImages');
        if (!response.ok) throw new Error('Slider görselleri yüklenemedi');
        const data = await response.json();
        setSliderImages(data);
      } catch (err) {
        setSliderImages([]);
      }
    };
    fetchSliderImages();
  }, []);

  // useCallback ile event handler'ları memoize edelim
  const handleProductClick = useCallback((product) => {
    navigate(`/products/${product.name.replace(/ /g, '-').toLowerCase()}`);
  }, [navigate]);

  return (
    <Box sx={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', m: 0, p: 0 }}>
      <Helmet>
        <title>Yönel Oto & Yedek Parça | Ana Sayfa</title>
        <meta name="description" content="Yönel Oto & Yedek Parça ana sayfası. Traktör, Akü, Iveco, Ducato ve ticari araç yedek parçada 2000+ çeşit ürün, hızlı teslimat ve uzman destek ile güvenilir çözüm ortağınız." />
        <meta name="keywords" content="Yönel Oto, Yedek Parça, Traktör Yedek Parça, Akü, Iveco, Ducato, Karataş Traktör, Foton Traktör, Mutlu Akü, Lovol, ticari araç, orijinal yedek parça, hızlı teslimat, Tokat yedek parça, Türkiye geneli kargo" />
        <meta property="og:title" content="Yönel Oto & Yedek Parça | Ana Sayfa" />
        <meta property="og:description" content="Traktör, Akü, Iveco, Ducato ve ticari araç yedek parçada 2000+ çeşit ürün, hızlı teslimat ve uzman destek ile güvenilir çözüm ortağınız." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoneloto.com" />
        <meta property="og:image" content="https://yoneloto.com/og-image.jpg" />
      </Helmet>

      {/* Slider ve Açıklama Alanı */}
      <Box sx={{
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        mt: 4,
        mb: 6,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        bgcolor: '#fff',
        px: 2,
        py: 2,
        borderRadius: 3,
        boxShadow: 2
      }}>
        {/* Açıklama Alanı */}
        <Box sx={{
          flex: 1,
          minWidth: 220,
          maxWidth: 360,
          textAlign: { xs: 'center', md: 'left' },
          mb: { xs: 3, md: 0 }
        }}>
          <Typography variant="h4" fontWeight={700} sx={{ color: 'darkred', mb: 2 }}>
            Hoşgeldiniz!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Yönel Oto & Yedek Parça olarak, Traktör, Akü ve Iveco Ducato yedek parçada güvenilir çözüm ortağınızız. 2000+ çeşit ürün ve uzman desteğimizle hizmetinizdeyiz.
          </Typography>
        </Box>
        {/* Slider Alanı */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '800px', maxWidth: '100%' }}>
            <Slider
              dots={false}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              autoplay={true}
              autoplaySpeed={2500}
              arrows={true}
              nextArrow={<Arrow direction="right" />}
              prevArrow={<Arrow direction="left" />}
            >
              {sliderImages.map((img, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: '100%',
                    height: { xs: 220, md: 420 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#fff',
                    overflow: 'hidden',
                    m: 0,
                    p: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={img.imageUrl || img.ImageUrl}
                    alt={`Slider görseli ${idx + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: 3,
                      boxShadow: 2,
                      display: 'block',
                      cursor: 'pointer',
                    }}
                    onClick={() => setOpenImage(img.imageUrl || img.ImageUrl)}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>

      {/* Resim büyütme modalı */}
      <Dialog open={!!openImage} onClose={() => setOpenImage(null)} maxWidth="md" PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}>
        <Box sx={{ outline: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent' }}>
          <Box component="img" src={openImage} alt="Büyük görsel" sx={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 3, boxShadow: 6, bgcolor: '#fff' }} />
        </Box>
      </Dialog>

      {/* Öne Çıkan Ürünler */}
      <Container maxWidth={false} disableGutters sx={{ 
        py: 6, 
        px: { xs: 0, md: 8 },
        overflowX: 'hidden',
        width: '100vw',
      }}>
        <Typography variant="h4" fontWeight={700} align="center" sx={{ color: 'darkred', mb: 3 }}>
          Öne Çıkan Ürünler
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'row' },
            gap: 3,
            overflowX: { xs: 'auto', md: 'visible' },
            justifyContent: { xs: 'flex-start', md: 'center' },
            pb: 2,
            width: '100%',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard 
              key={product.name} 
              product={product} 
              onClick={() => handleProductClick(product)}
            />
          ))}
        </Box>
      </Container>

      {/* Avantajlar */}
      <Container maxWidth={false} disableGutters sx={{ 
        py: 6, 
        px: { xs: 0, md: 8 },
        overflowX: 'hidden',
        width: '100vw',
      }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom sx={{ color: 'darkred', mb: 5 }}>
          Neden Yönel Oto & Yedek Parça ?
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="stretch" sx={{ 
          width: '100%'
        }}>
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.title} advantage={advantage} />
          ))}
        </Grid>
      </Container>

      {/* Kısa Hakkımızda */}
      <Container maxWidth={false} disableGutters sx={{ py: 6, px: { xs: 2, md: 8 } }}>
        <Paper elevation={2} sx={{ p: { xs: 3, md: 6 }, borderRadius: 3, maxWidth: 900, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: 'darkred' }}>
            Hakkımızda
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            50 yılı aşkın tecrübemizle Karataş Traktör, Foton Traktör, Mutlu Akü ve Iveco gibi önde gelen markaların yedek parçalarını sizlere sunuyoruz. Müşteri memnuniyeti ve kaliteli hizmet önceliğimizdir.  
          </Typography>
          <Button variant="contained" color="primary" href="/about">Daha Fazla Bilgi</Button>
        </Paper>
      </Container>

      {/* SSS Bölümü */}
      <Container maxWidth={false} disableGutters sx={{ py: 6, px: { xs: 2, md: 8 } }}>
        <FAQ />
      </Container>
    </Box>
  );
};

export default memo(Home);