import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';

const HizmetBolgelerimiz = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Helmet>
        <title>Hizmet Bölgelerimiz | Yönel Oto & Yedek Parça</title>
        <meta name="description" content="Yönel Oto & Yedek Parça olarak Türkiye'nin her yerine kargo ile hizmet veriyoruz." />
      </Helmet>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={800} sx={{ color: 'darkred', mb: 2, fontSize: { xs: 28, md: 36 } }}>
          Hizmet Bölgelerimiz
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 500 }}>
          Türkiye'nin 81 iline kargo ile hızlı ve güvenli teslimat!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: 17 }}>
          Yönel Oto & Yedek Parça olarak, Tokat merkezli firmamızla Türkiye'nin dört bir yanına kargo ile yedek parça gönderimi yapıyoruz. Siparişleriniz en kısa sürede, güvenli şekilde adresinize ulaştırılır. Hangi şehirde olursanız olun, kaliteli hizmet ve müşteri memnuniyeti önceliğimizdir.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Detaylı bilgi ve sipariş için bizimle iletişime geçebilirsiniz.
        </Typography>
        <Button variant="contained" color="primary" href="/contact" sx={{ fontWeight: 700, fontSize: 16 }}>
          İletişim Sayfası
        </Button>
      </Paper>
    </Container>
  );
};

export default HizmetBolgelerimiz; 