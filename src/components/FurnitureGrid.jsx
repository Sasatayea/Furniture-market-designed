import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../redux/slices/favoriteSlice';
import { addToCart } from '../redux/slices/cartSlice';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useState } from 'react';

export default function FurnitureGrid({ items }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleFav = (e, item) => {
    e.stopPropagation();
    dispatch(addFavorite(item));
    setSnackbar({ open: true, message: `${item.title} added to favorites`, severity: 'success' });
  };

  const handleCart = (e, item) => {
    e.stopPropagation();
    dispatch(addToCart(item));
    setSnackbar({ open: true, message: `${item.title} added to cart`, severity: 'info' });
  };

  return (
    <>
      <Grid container spacing={2.5}>
        {items.map((item, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={index}>
            <Card
              onClick={() => navigate('/FurnitureDetail', { state: item })}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)',
                border: '1px solid rgba(0,229,255,0.04)',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  border: '1px solid rgba(0,229,255,0.12)',
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,229,255,0.06)',
                },
                '&:hover .card-actions': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
                '&:hover .card-image': {
                  transform: 'scale(1.08)',
                },
              }}
            >
              {/* Image */}
              <Box sx={{ position: 'relative', overflow: 'hidden', height: { xs: 140, sm: 170, md: 190 } }}>
                <CardMedia
                  component="img"
                  className="card-image"
                  image={item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={item.title}
                  sx={{
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />

                {/* Hover Actions */}
                <Box
                  className="card-actions"
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    display: 'flex',
                    gap: 0.5,
                    opacity: 0,
                    transform: 'translateY(8px)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Tooltip title="Add to Favorites" arrow>
                    <IconButton
                      onClick={(e) => handleFav(e, item)}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(10,14,23,0.85)',
                        backdropFilter: 'blur(10px)',
                        color: '#FF5252',
                        border: '1px solid rgba(255,82,82,0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(255,82,82,0.15)',
                          border: '1px solid rgba(255,82,82,0.4)',
                        },
                      }}
                    >
                      <FavoriteBorderRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add to Cart" arrow>
                    <IconButton
                      onClick={(e) => handleCart(e, item)}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(10,14,23,0.85)',
                        backdropFilter: 'blur(10px)',
                        color: '#00E5FF',
                        border: '1px solid rgba(0,229,255,0.2)',
                        '&:hover': {
                          bgcolor: 'rgba(0,229,255,0.15)',
                          border: '1px solid rgba(0,229,255,0.4)',
                        },
                      }}
                    >
                      <ShoppingCartRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Discount Badge */}
                {item.discount && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      bgcolor: '#FF5252',
                      color: '#fff',
                      fontSize: '0.6rem',
                      fontWeight: 800,
                      fontFamily: '"Outfit", sans-serif',
                      px: 1,
                      py: 0.3,
                      borderRadius: 1.5,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.discount}% OFF
                  </Box>
                )}
              </Box>

              {/* Content */}
              <CardContent sx={{ p: 1.8, '&:last-child': { pb: 1.8 } }}>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#E8ECF4',
                    mb: 0.3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#FFB300',
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {item.price ? `${item.price} EGP` : 'Price TBD'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Snackbar Feedback */}
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
            fontSize: '0.8rem',
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}