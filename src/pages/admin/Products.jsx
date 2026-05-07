import { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useTranslation } from 'react-i18next';
import ProductTable from '../../components/admin/ProductTable';
import ProductFormDialog from '../../components/admin/ProductFormDialog';

export default function Products() {
  const { t } = useTranslation();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddClose = (saved) => {
    setAddDialogOpen(false);
    if (saved) {
      setSnackbar({ open: true, message: t('products.productAdded'), severity: 'success' });
    }
  };

  return (
    <Box
      sx={{
        animation: 'fadeInUp 0.5s ease-out',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif',
              background: 'linear-gradient(135deg, #E8ECF4 0%, #8B95A8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            {t('products.title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('products.search')}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{
            px: 3,
            py: 1.2,
            fontSize: '0.85rem',
          }}
        >
          {t('products.addProduct')}
        </Button>
      </Box>

      {/* Product Table */}
      <ProductTable />

      {/* Add Product Dialog */}
      <ProductFormDialog
        open={addDialogOpen}
        onClose={handleAddClose}
        mode="add"
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            bgcolor: 'rgba(0,230,118,0.15)',
            color: '#00E676',
            border: '1px solid rgba(0,230,118,0.3)',
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
