import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addFavorite } from '../redux/slices/favoriteSlice';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Chip,
  Snackbar,
  Alert,
  IconButton,
  Breadcrumbs,
} from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from 'react-router-dom';

export default function FurnitureDetail() {
  const { state } = useLocation();
  const product = state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState(
    product?.images?.[0] || 'https://via.placeholder.com/500'
  );
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#E8ECF4', mb: 2 }}>
          Product Not Found
        </Typography>
        <Typography sx={{ color: '#6B7A90', mb: 3 }}>
          The product you're looking for doesn't exist or has been removed.
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Back to Collections
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        {/* Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <IconButton
            onClick={() => navigate(-1)}
            size="small"
            sx={{
              color: '#6B7A90',
              border: '1px solid rgba(0,229,255,0.08)',
              '&:hover': { borderColor: 'rgba(0,229,255,0.2)', color: '#00E5FF' },
            }}
          >
            <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 14, color: '#4A5568' }} />}>
            <Typography
              component={Link}
              to="/"
              sx={{ color: '#6B7A90', textDecoration: 'none', fontSize: '0.75rem', '&:hover': { color: '#00E5FF' } }}
            >
              Collections
            </Typography>
            <Typography sx={{ color: '#8B95A8', fontSize: '0.75rem' }}>
              {product.category || 'Product'}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* LEFT — Images */}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Main Image */}
            <Box
              sx={{
                width: '100%',
                height: { xs: 300, sm: 400, md: 450 },
                borderRadius: 4,
                overflow: 'hidden',
                mb: 2,
                bgcolor: '#111827',
                border: '1px solid rgba(0,229,255,0.06)',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src={mainImage}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              />
            </Box>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                {product.images.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setMainImage(img)}
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 2.5,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: mainImage === img
                        ? '2px solid #00E5FF'
                        : '1px solid rgba(0,229,255,0.08)',
                      transition: 'all 0.2s',
                      opacity: mainImage === img ? 1 : 0.6,
                      '&:hover': { opacity: 1, borderColor: 'rgba(0,229,255,0.3)' },
                    }}
                  >
                    <Box
                      component="img"
                      src={img}
                      alt="thumb"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Grid>

          {/* RIGHT — Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Category */}
              {product.category && (
                <Chip
                  label={product.category}
                  size="small"
                  sx={{
                    alignSelf: 'flex-start',
                    bgcolor: 'rgba(0,229,255,0.08)',
                    color: '#00E5FF',
                    fontWeight: 600,
                    fontSize: '0.65rem',
                    fontFamily: '"Outfit", sans-serif',
                    letterSpacing: '0.08em',
                    borderRadius: 2,
                  }}
                />
              )}

              {/* Title */}
              <Typography
                variant="h3"
                sx={{
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 800,
                  fontSize: { xs: '1.6rem', md: '2.1rem' },
                  color: '#E8ECF4',
                  lineHeight: 1.2,
                }}
              >
                {product.title}
              </Typography>

              {/* Description */}
              <Typography
                sx={{
                  color: '#6B7A90',
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                }}
              >
                {product.description || 'No description available for this product.'}
              </Typography>

              {/* Price section */}
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 800,
                    fontSize: '1.8rem',
                    color: '#FFB300',
                  }}
                >
                  {product.price} EGP
                </Typography>
                {product.originalPrice && (
                  <Typography
                    sx={{
                      textDecoration: 'line-through',
                      color: '#4A5568',
                      fontSize: '1rem',
                    }}
                  >
                    {product.originalPrice} EGP
                  </Typography>
                )}
                {product.discount && (
                  <Chip
                    label={`${product.discount}% OFF`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,82,82,0.12)',
                      color: '#FF5252',
                      fontWeight: 800,
                      fontSize: '0.65rem',
                      fontFamily: '"Outfit", sans-serif',
                    }}
                  />
                )}
              </Box>

              {/* Stock Status */}
              {product.stockStatus && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: product.stockStatus.toLowerCase().includes('in') ? '#00E676' : '#FF5252',
                      boxShadow: `0 0 8px ${product.stockStatus.toLowerCase().includes('in') ? '#00E676' : '#FF5252'}60`,
                    }}
                  />
                  <Typography sx={{ color: '#8B95A8', fontSize: '0.8rem', fontWeight: 500 }}>
                    {product.stockStatus}
                  </Typography>
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, mt: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartRoundedIcon />}
                  onClick={() => {
                    dispatch(addToCart(product));
                    setSnackbar({ open: true, message: 'Added to cart!', severity: 'info' });
                  }}
                  sx={{ px: 4, py: 1.3, fontSize: '0.85rem', flex: { xs: 1, sm: 'unset' } }}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<FavoriteBorderRoundedIcon />}
                  onClick={() => {
                    dispatch(addFavorite(product));
                    setSnackbar({ open: true, message: 'Added to favorites!', severity: 'success' });
                  }}
                  sx={{
                    px: 3,
                    py: 1.3,
                    fontSize: '0.85rem',
                    borderColor: 'rgba(255,82,82,0.3)',
                    color: '#FF5252',
                    '&:hover': { borderColor: '#FF5252', bgcolor: 'rgba(255,82,82,0.08)' },
                  }}
                >
                  Favorite
                </Button>
              </Box>

              {/* External Link */}
              {product.productUrl && (
                <Button
                  href={product.productUrl}
                  target="_blank"
                  rel="noreferrer"
                  endIcon={<OpenInNewRoundedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    alignSelf: 'flex-start',
                    color: '#6B7A90',
                    fontSize: '0.78rem',
                    mt: 1,
                    '&:hover': { color: '#00E5FF' },
                  }}
                >
                  View Original Product
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            bgcolor: snackbar.severity === 'success' ? 'rgba(0,230,118,0.12)' : 'rgba(0,229,255,0.12)',
            color: snackbar.severity === 'success' ? '#00E676' : '#00E5FF',
            border: `1px solid ${snackbar.severity === 'success' ? 'rgba(0,230,118,0.25)' : 'rgba(0,229,255,0.25)'}`,
            fontWeight: 600,
            borderRadius: 3,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}