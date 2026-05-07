import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { addProduct, updateProduct } from '../../redux/slices/adminProductsSlice';
import { useTranslation } from 'react-i18next';

const categories = ['Living Room', 'Bedroom', 'Office', 'Kitchen', 'Outdoor', 'Bathroom'];
const stockOptions = ['In Stock', 'Out of Stock'];

const emptyForm = {
  title: '',
  category: 'Living Room',
  price: '',
  description: '',
  images: [''],
  stockStatus: 'In Stock',
};

export default function ProductFormDialog({ open, onClose, product, mode = 'add' }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && product) {
      setForm({
        ...product,
        price: product.price?.toString() || '',
        images: product.images?.length ? product.images : [''],
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [product, mode, open]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = t('products.required');
    if (!form.price || Number(form.price) <= 0) newErrors.price = t('products.invalidPrice');
    if (!form.description.trim()) newErrors.description = t('products.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const productData = {
      ...form,
      price: Number(form.price),
      images: form.images.filter((img) => img.trim()),
    };

    if (mode === 'edit') {
      dispatch(updateProduct({ ...productData, id: product.id }));
    } else {
      dispatch(addProduct(productData));
    }

    onClose(true);
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontFamily: '"Outfit", sans-serif',
          fontSize: '1.2rem',
          pb: 1,
        }}
      >
        {mode === 'edit' ? t('products.editProduct') : t('products.addProduct')}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
          {/* Title */}
          <TextField
            label={t('products.productName')}
            value={form.title}
            onChange={handleChange('title')}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
          />

          {/* Category & Price row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              select
              label={t('products.category')}
              value={form.category}
              onChange={handleChange('category')}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label={t('products.price')}
              type="number"
              value={form.price}
              onChange={handleChange('price')}
              error={!!errors.price}
              helperText={errors.price}
              fullWidth
              required
              inputProps={{ min: 0, step: 0.01 }}
            />
          </Box>

          {/* Description */}
          <TextField
            label={t('products.description')}
            value={form.description}
            onChange={handleChange('description')}
            error={!!errors.description}
            helperText={errors.description}
            multiline
            rows={3}
            fullWidth
            required
          />

          {/* Image URL */}
          <TextField
            label={t('products.imageUrl')}
            value={form.images[0] || ''}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                images: [e.target.value, ...prev.images.slice(1)],
              }))
            }
            fullWidth
            placeholder="https://..."
          />

          {/* Stock Status */}
          <TextField
            select
            label={t('products.stockStatus')}
            value={form.stockStatus}
            onChange={handleChange('stockStatus')}
            fullWidth
          >
            {stockOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                <Typography
                  sx={{
                    color: opt === 'In Stock' ? '#00E676' : '#FF5252',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                  }}
                >
                  {opt === 'In Stock' ? t('products.inStock') : t('products.outOfStock')}
                </Typography>
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, pt: 1 }}>
        <Button
          onClick={() => onClose(false)}
          variant="outlined"
          sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
        >
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === 'edit' ? t('common.save') : t('common.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
