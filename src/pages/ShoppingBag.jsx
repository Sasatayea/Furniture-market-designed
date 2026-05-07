import { removeFromCart, addToCart } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box, Typography, Container, Card, CardContent, Button,
  IconButton, Divider, Avatar, Chip,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useNavigate } from 'react-router-dom';

export default function Shoppingbag() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartt = useSelector((state) => state.cart.items || []);
  const total = cartt.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    const res = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cart: cartt }),
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <ShoppingBagOutlinedIcon sx={{ color: '#FFB300', fontSize: 28 }} />
          <Typography variant="h4" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, background: 'linear-gradient(135deg, #E8ECF4 0%, #8B95A8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Shopping Bag
          </Typography>
          {cartt.length > 0 && <Chip label={`${cartt.length} items`} size="small" sx={{ bgcolor: 'rgba(255,179,0,0.1)', color: '#FFB300', fontWeight: 700, fontSize: '0.65rem' }} />}
        </Box>

        {cartt.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, borderRadius: 5, border: '1px dashed rgba(0,229,255,0.1)', bgcolor: 'rgba(17,24,39,0.4)' }}>
            <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(255,179,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <ShoppingBagOutlinedIcon sx={{ fontSize: 36, color: '#FFB300', opacity: 0.5 }} />
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#E8ECF4', mb: 1 }}>Your bag is empty</Typography>
            <Typography sx={{ color: '#6B7A90', fontSize: '0.85rem', mb: 3 }}>Add some beautiful pieces to get started.</Typography>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ px: 4 }}>Browse Collections</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Items */}
            <Card sx={{ background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)', border: '1px solid rgba(0,229,255,0.06)' }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: 3 } }}>
                {cartt.map((item, index) => (
                  <Box key={item.title || index}>
                    <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2.5 }, alignItems: 'center', py: 2 }}>
                      <Avatar variant="rounded" src={item.images?.[0]} sx={{ width: { xs: 56, sm: 72 }, height: { xs: 56, sm: 72 }, borderRadius: 3, bgcolor: '#1A2235', border: '1px solid rgba(0,229,255,0.06)' }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' }, fontWeight: 600, color: '#E8ECF4', fontFamily: '"Outfit", sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.name || item.title}
                        </Typography>
                        <Typography sx={{ fontSize: '0.78rem', color: '#6B7A90', mt: 0.3 }}>{item.price} EGP each</Typography>
                        {/* Qty Controls */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <IconButton size="small" onClick={() => dispatch(removeFromCart(item))} sx={{ bgcolor: 'rgba(0,229,255,0.06)', color: '#8B95A8', width: 28, height: 28, '&:hover': { bgcolor: 'rgba(0,229,255,0.12)' } }}>
                            <RemoveRoundedIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#E8ECF4', minWidth: 20, textAlign: 'center' }}>{item.qty}</Typography>
                          <IconButton size="small" onClick={() => dispatch(addToCart(item))} sx={{ bgcolor: 'rgba(0,229,255,0.06)', color: '#8B95A8', width: 28, height: 28, '&:hover': { bgcolor: 'rgba(0,229,255,0.12)' } }}>
                            <AddRoundedIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFB300', fontFamily: '"Outfit", sans-serif' }}>
                          {(item.price * item.qty).toFixed(0)} EGP
                        </Typography>
                        <IconButton size="small" onClick={() => { for (let i = 0; i < item.qty; i++) dispatch(removeFromCart(item)); }} sx={{ color: '#FF5252', '&:hover': { bgcolor: 'rgba(255,82,82,0.1)' } }}>
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Box>
                    {index < cartt.length - 1 && <Divider sx={{ borderColor: 'rgba(0,229,255,0.04)' }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* Summary */}
            <Card sx={{ background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)', border: '1px solid rgba(0,229,255,0.08)' }}>
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#6B7A90', fontSize: '0.85rem' }}>Subtotal</Typography>
                  <Typography sx={{ color: '#E8ECF4', fontWeight: 600, fontSize: '0.85rem' }}>{total.toFixed(0)} EGP</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography sx={{ color: '#6B7A90', fontSize: '0.85rem' }}>Shipping</Typography>
                  <Typography sx={{ color: '#00E676', fontWeight: 600, fontSize: '0.85rem' }}>Free</Typography>
                </Box>
                <Divider sx={{ borderColor: 'rgba(0,229,255,0.06)', mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#E8ECF4' }}>Total</Typography>
                  <Typography sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#FFB300' }}>{total.toFixed(0)} EGP</Typography>
                </Box>
                <Button variant="contained" fullWidth onClick={handleCheckout} sx={{ py: 1.5, fontSize: '0.9rem', background: 'linear-gradient(135deg, #00E676 0%, #00B248 100%)', color: '#0A0E17', fontWeight: 700, '&:hover': { background: 'linear-gradient(135deg, #66FFA6 0%, #00E676 100%)', boxShadow: '0 0 25px rgba(0,230,118,0.3)' } }}>
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
}
