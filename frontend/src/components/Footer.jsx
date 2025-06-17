import { Box, Container, Typography, Link, IconButton, Grid } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link as RouterLink } from 'react-router-dom';
import yonelLogo from '../assets/logo.jpg';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'darkred', color: 'whitesmoke', mt: 'auto', py: { xs: 4, md: 5 } }} component="footer">
      <Container maxWidth="lg">
        <Grid 
          container 
          spacing={{ xs: 6, md: 4 }}
          sx={{ 
            mb: 4,
            justifyContent: { xs: 'center', md: 'space-between' },
          }}
        >
          {/* Logo ve Açıklama */}
          <Grid item xs={12} md={3.5} sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
          }}>
            <Box sx={{ 
              width: { xs: '220px', md: '220px' },
              mb: 2,
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Box 
                component="img" 
                src={yonelLogo} 
                alt="Yönel Oto Logo" 
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '2.8/1',
                  objectFit: 'cover',
                  bgcolor: '#fff',
                  borderRadius: 1,
                }}
              />
            </Box>
            <Typography variant="body1" sx={{ 
              fontSize: '0.95rem',
              maxWidth: '280px',
              px: { xs: 2, md: 0 }
            }}>
              Traktör, akü ve ticari araç yedek parça sektöründe güvenilir çözüm ortağınız.
            </Typography>
          </Grid>

          {/* Hızlı Bağlantılar */}
          <Grid item xs={12} md={3.5} sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
          }}>
            <Typography variant="h6" sx={{ 
              fontSize: '1.2rem',
              fontWeight: 600,
              mb: 2,
              textAlign: 'center'
            }}>
              Hızlı Bağlantılar
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              alignItems: 'center'
            }}>
              {[
                { text: 'Ana Sayfa', path: '/' },
                { text: 'Ürünler', path: '/products' },
                { text: 'Hakkımızda', path: '/about' },
                { text: 'Hizmet Bölgelerimiz', path: '/hizmet-bolgelerimiz' },
                { text: 'İletişim', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s',
                    textAlign: 'center',
                    '&:hover': {
                      opacity: 0.8,
                      transform: 'translateX(5px)'
                    }
                  }}
                >
                  {link.text}
              </Link>
              ))}
            </Box>
          </Grid>

          {/* İletişim Bilgileri */}
          <Grid item xs={12} md={3.5} sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
          }}>
            <Typography variant="h6" sx={{ 
              fontSize: '1.2rem',
              fontWeight: 600,
              mb: 2,
              textAlign: 'center'
            }}>
              İletişim
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}>
              <Typography variant="body1" sx={{ 
                fontSize: '0.95rem',
                textAlign: 'center',
                maxWidth: '280px',
                px: { xs: 2, md: 0 }
              }}>
                Yeniyurt, Ayyıldız Cd. No:32, 60030 Tokat Merkez
              </Typography>
              <Link 
                href="https://wa.me/905542597273" 
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  '&:hover': { opacity: 0.8 }
                }}
              >
                0 (554) 259 72 73
                <WhatsAppIcon sx={{ fontSize: 20 }} />
              </Link>
              <Link 
                href="mailto:tokatyonelotoyedekparca@gmail.com"
                sx={{ 
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  textAlign: 'center',
                  '&:hover': { opacity: 0.8 }
                }}
              >
                tokatyonelotoyedekparca@gmail.com
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Alt Bilgi */}
        <Box sx={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          pt: 3,
          textAlign: 'center'
        }}>
          <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Yönel Oto & Yedek Parça. Tüm hakları saklıdır.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 1, fontSize: '0.85rem' }}>
            Media{' '}
            <Link
              href="https://bariscanyonel.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500,
                '&:hover': { opacity: 0.8 }
              }}
            >
              Barış Can Yönel
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 