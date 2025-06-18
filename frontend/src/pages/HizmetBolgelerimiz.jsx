import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SecurityIcon from '@mui/icons-material/Security';

const HizmetBolgelerimiz = () => {
  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: { xs: 4, md: 8 } }}>
      <Helmet>
        <title>Hizmet Bölgelerimiz | Yönel Oto & Yedek Parça</title>
        <meta name="description" content="Yönel Oto & Yedek Parça olarak Türkiye'nin her yerine kargo ile hizmet veriyoruz. 81 ile hızlı ve güvenli teslimat." />
      </Helmet>

      <Container maxWidth="md">
        {/* Ana Başlık ve Açıklama */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={800} sx={{ color: 'darkred', mb: 3, fontSize: { xs: 28, md: 36 }, overflow: 'hidden !important' }}>
            Hizmet Bölgelerimiz
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary', fontWeight: 500, lineHeight: 1.6 }}>
            Türkiye'nin 81 iline kargo ile hızlı ve güvenli teslimat!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: 17, lineHeight: 1.8 }}>
            Yönel Oto & Yedek Parça olarak, Tokat merkezli firmamızla Türkiye'nin dört bir yanına kargo ile yedek parça gönderimi yapıyoruz. 
            Siparişleriniz en kısa sürede, güvenli şekilde adresinize ulaştırılır. Hangi şehirde olursanız olun, kaliteli hizmet ve müşteri memnuniyeti önceliğimizdir.
          </Typography>
        </Paper>

        {/* Hizmet Özellikleri */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, mb: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: 'darkred', mb: 4, textAlign: 'center' }}>
            Kargo ve Teslimat Hizmetlerimiz
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LocalShippingIcon sx={{ fontSize: 40, color: 'darkred' }} />
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                  Türkiye Geneli Kargo
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  81 ile hızlı ve güvenli teslimat hizmeti sunuyoruz.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccessTimeIcon sx={{ fontSize: 40, color: 'darkred' }} />
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                  Hızlı Teslimat
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Siparişleriniz 1-3 iş günü içinde elinizde.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <SecurityIcon sx={{ fontSize: 40, color: 'darkred' }} />
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                  Güvenli Taşıma
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Tüm gönderilerimiz sigortalı ve güvenli şekilde taşınır.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* İletişim CTA */}
        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: 'darkred', mb: 3 }}>
            Sipariş ve Bilgi İçin
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Hangi bölgede olursanız olun, size en yakın şekilde hizmet vermek için buradayız.
            Detaylı bilgi ve sipariş için bizimle iletişime geçebilirsiniz.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            href="/contact" 
            sx={{ 
              fontWeight: 700, 
              fontSize: 16,
              px: 4,
              py: 1.5,
              borderRadius: 3
            }}
          >
            İletişime Geçin
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HizmetBolgelerimiz; 