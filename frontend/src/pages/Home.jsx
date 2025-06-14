import { Container, Typography, Grid, Box, Button, Paper, Chip } from '@mui/material';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FAQ from '../components/FAQ';
import { memo, useMemo, useCallback, useState, useEffect } from 'react';
import ivecoLogo from '../assets/iveco.png';
import karatasLogo from '../assets/karatas.png';
import fotonLogo from '../assets/foton.png';
import mutluLogo from '../assets/mutlu.png';
import ducatoLogo from '../assets/ducato.jpg';
import lovolLogo from '../assets/lovol.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sliderImg1 from '../assets/slider.png';
import sliderImg2 from '../assets/slider1.png';
import sliderImg3 from '../assets/slider2.png';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const brands = [
  {
    name: 'Karataş Traktör',
    image: karatasLogo,
  },
  {
    name: 'Foton Traktör',
    image: fotonLogo,
  },
  {
    name: 'Mutlu Akü',
    image: mutluLogo,
  },
  {
    name: 'Iveco',
    image: ivecoLogo,
  },
  {
    name: 'Ducato',
    image: ducatoLogo,
  },
  {
    name: 'Lovol',
    image: lovolLogo,
  },
];

const advantages = [
  {
    icon: <DirectionsCarFilledIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'Geniş Ürün Yelpazesi',
    desc: '500+ çeşit yedek parça ve aksesuar.'
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

const API_BASE_URL = 'http://localhost:5054/api';

const Home = () => {
  const navigate = useNavigate();
  const [openImage, setOpenImage] = useState(null);
  const theme = useTheme();
  const isWeb = useMediaQuery(theme.breakpoints.up('md'));
  const [sliderImages, setSliderImages] = useState([]);
  
  // Öne çıkan ürünler için boş bir dizi kullanıyoruz
  const featuredProducts = useMemo(() => [], []);

  // useCallback ile event handler'ları memoize edelim
  const handleProductClick = useCallback((product) => {
    navigate(`/products/${product.name.replace(/ /g, '-').toLowerCase()}`);
  }, [navigate]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/SliderImages`);
        if (!response.ok) throw new Error('Slider görselleri yüklenemedi');
        const data = await response.json();
        setSliderImages(data);
      } catch (err) {
        setSliderImages([]);
      }
    };
    fetchSliderImages();
  }, []);

  const SLIDER_SLOT_COUNT = 6;
  const SLIDER_PER_VIEW = 3;
  const sliderPlaceholder = '/images/placeholder.png';
  const sliderSlots = Array.from({ length: SLIDER_SLOT_COUNT }).map((_, i) => sliderImages[i]?.imageUrl || sliderImages[i]?.ImageUrl || sliderPlaceholder);
  const sliderGroups = [
    sliderSlots.slice(0, SLIDER_PER_VIEW),
    sliderSlots.slice(SLIDER_PER_VIEW, SLIDER_SLOT_COUNT)
  ];

  return (
    <Box sx={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden', boxSizing: 'border-box', m: 0, p: 0 }}>
      <Helmet>
        <title>Yönel Oto & Yedek Parça | Ana Sayfa</title>
        <meta name="description" content="Yönel Oto & Yedek Parça ana sayfası. Traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız." />
        <meta property="og:title" content="Yönel Oto & Yedek Parça | Ana Sayfa" />
        <meta property="og:description" content="Yönel Oto & Yedek Parça ana sayfası. Traktör, akü ve ticari araç yedek parçada güvenilir çözüm ortağınız." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoneloto.com" />
      </Helmet>

      {/* Slider Alanı */}
      <Box sx={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden', mt: 4, mb: 6, bgcolor: '#fff', boxSizing: 'border-box', px: 0 }}>
        <Slider
          dots={true}
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          arrows={isWeb}
          nextArrow={isWeb ? <Arrow direction="right" /> : null}
          prevArrow={isWeb ? <Arrow direction="left" /> : null}
        >
          {sliderGroups.map((group, idx) => (
            <Box
              key={"slider-group-" + idx}
              sx={{
                width: '100vw',
                maxWidth: '100vw',
                height: { xs: 200, md: 320 },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                m: 0,
                p: 0,
              }}
            >
              {group.map((imgSrc, i) => (
                <Box
                  key={imgSrc + i}
                  sx={{
                    display: 'inline-block',
                    width: '33.33vw',
                    height: { xs: 200, md: 320 },
                    verticalAlign: 'top',
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: 2,
                    p: 1,
                    overflow: 'hidden',
                    mx: 0.5,
                  }}
                >
                  <Box
                    component="img"
                    src={imgSrc}
                    alt={`Slider görseli ${idx * SLIDER_PER_VIEW + i + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                      cursor: imgSrc !== sliderPlaceholder ? 'pointer' : 'default',
                      opacity: imgSrc === sliderPlaceholder ? 0.4 : 1,
                    }}
                    onClick={() => imgSrc !== sliderPlaceholder && setOpenImage(imgSrc)}
                  />
                </Box>
              ))}
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Resim büyütme modalı */}
      <Dialog open={!!openImage} onClose={() => setOpenImage(null)} maxWidth="md" PaperProps={{ sx: { bgcolor: 'transparent', boxShadow: 'none' } }}>
        <Box sx={{ outline: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'transparent' }}>
          <Box component="img" src={openImage} alt="Büyük görsel" sx={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: 3, boxShadow: 6, bgcolor: '#fff' }} />
        </Box>
      </Dialog>

      {/* Marka Logoları */}
      <Container maxWidth={false} disableGutters sx={{ py: 6, px: { xs: 2, md: 8 } }} id="brands">
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom sx={{ color: 'darkred' }}>
          Öne Çıkan Markalarımız
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', py: 2 }}>
          {brands.map((brand) => {
            // URL parametresi için markanın value'sunu belirle
            let brandValue = brand.name.toLowerCase().includes('karataş') ? 'karatas'
              : brand.name.toLowerCase().includes('foton') ? 'foton'
              : brand.name.toLowerCase().includes('mutlu') ? 'mutlu'
              : brand.name.toLowerCase().includes('iveco') ? 'iveco'
              : brand.name.toLowerCase().includes('ducato') ? 'ducato'
              : brand.name.toLowerCase().includes('lovol') ? 'foton' // Lovol, Foton ile aynı ürünlerde
              : '';
            return (
              <Box
                key={brand.name}
                component="button"
                onClick={() => navigate(`/products?brand=${brandValue}`)}
                sx={{
                  border: 'none',
                  background: 'none',
                  p: 0,
                  m: 0,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                  outline: 'none',
                }}
              >
                <Box
                  component="img"
                  src={brand.image}
                  alt={brand.name}
                  sx={{
                    width: 180,
                    height: 130,
                    objectFit: 'cover',
                    borderRadius: 3,
                    boxShadow: 3,
                    bgcolor: '#fff',
                    p: 1,
                  }}
                  onError={e => {
                    if (e.target.src.endsWith('placeholder.png')) return;
                    e.target.onerror = null;
                    e.target.src = placeholder;
                  }}
                  loading="lazy"
                />
              </Box>
            );
          })}
        </Box>
      </Container>

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