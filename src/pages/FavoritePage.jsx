import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/slices/favoriteSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  Box, Typography, Container, Grid, Card, CardMedia, CardContent,
  IconButton, Button, Tooltip, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Snackbar, Alert,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

export default function FavoritePage() {
  const favorites = useSelector((state) => state.favorite.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const handleConfirmDelete = () => {
    dispatch(removeFavorite(deleteTarget));
    setDeleteTarget(null);
    setSnackbar({ open: true, message: 'Removed from favorites' });
  };

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <FavoriteBorderRoundedIcon sx={{ color: '#FF5252', fontSize: 28 }} />
            <Typography variant="h4" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, background: 'linear-gradient(135deg, #E8ECF4 0%, #8B95A8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Favorites
            </Typography>
          </Box>
          <Typography sx={{ color: '#6B7A90', fontSize: '0.85rem' }}>
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
          </Typography>
        </Box>

        {favorites.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, px: 3, borderRadius: 5, border: '1px dashed rgba(0,229,255,0.1)', bgcolor: 'rgba(17,24,39,0.4)' }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,82,82,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <FavoriteBorderRoundedIcon sx={{ fontSize: 36, color: '#FF5252', opacity: 0.5 }} />
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#E8ECF4', mb: 1 }}>No favorites yet</Typography>
            <Typography sx={{ color: '#6B7A90', fontSize: '0.85rem', mb: 3, maxWidth: 360, mx: 'auto' }}>Start exploring our collections and save pieces that inspire you.</Typography>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ px: 4 }}>Browse Collections</Button>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {favorites.map((item, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                <Card sx={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)', border: '1px solid rgba(0,229,255,0.04)', transition: 'all 0.3s ease', '&:hover': { border: '1px solid rgba(0,229,255,0.12)', transform: 'translateY(-4px)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' } }}>
                  <Tooltip title="Remove" arrow>
                    <IconButton size="small" onClick={() => setDeleteTarget(item)} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2, bgcolor: 'rgba(10,14,23,0.8)', color: '#FF5252', border: '1px solid rgba(255,82,82,0.2)', '&:hover': { bgcolor: 'rgba(255,82,82,0.15)' } }}>
                      <DeleteRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                  <Box onClick={() => navigate('/FurnitureDetail', { state: item })} sx={{ cursor: 'pointer', height: { xs: 150, sm: 180 }, overflow: 'hidden' }}>
                    <CardMedia component="img" image={item.images?.[0] || 'https://via.placeholder.com/300x200'} alt={item.title} sx={{ height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.06)' } }} />
                  </Box>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#E8ECF4', fontFamily: '"Outfit", sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 0.5 }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFB300', fontFamily: '"Outfit", sans-serif' }}>{item.price ? `${item.price} EGP` : 'Price TBD'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>Remove from Favorites</DialogTitle>
        <DialogContent><DialogContentText sx={{ color: 'text.secondary' }}>Remove <strong>{deleteTarget?.title}</strong> from your favorites?</DialogContentText></DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={() => setDeleteTarget(null)} variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" sx={{ background: 'linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)', '&:hover': { background: 'linear-gradient(135deg, #FF7B7B 0%, #FF5252 100%)' } }}>Remove</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="warning" onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ bgcolor: 'rgba(255,179,0,0.12)', color: '#FFB300', border: '1px solid rgba(255,179,0,0.25)', fontWeight: 600, borderRadius: 3 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}