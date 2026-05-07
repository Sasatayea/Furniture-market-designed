import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  IconButton,
  Chip,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteProduct, fetchProducts } from '../../redux/slices/adminProductsSlice';
import { useTranslation } from 'react-i18next';
import ProductFormDialog from './ProductFormDialog';

export default function ProductTable() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const products = useSelector((state) => state.adminProducts.products);
  const loading = useSelector((state) => state.adminProducts.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(selectedProduct.id));
    setDeleteDialogOpen(false);
    setSelectedProduct(null);
    setSnackbar({ open: true, message: t('products.productDeleted'), severity: 'success' });
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleEditClose = (saved) => {
    setEditDialogOpen(false);
    setSelectedProduct(null);
    if (saved) {
      setSnackbar({ open: true, message: t('products.productUpdated'), severity: 'success' });
    }
  };

  const columns = [
    {
      field: 'images',
      headerName: t('products.image'),
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Avatar
          src={params.value?.[0]}
          variant="rounded"
          sx={{
            width: 42,
            height: 42,
            bgcolor: '#1A2235',
            border: '1px solid rgba(0,229,255,0.1)',
          }}
        />
      ),
    },
    {
      field: 'title',
      headerName: t('products.productName'),
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'category',
      headerName: t('products.category'),
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          sx={{
            bgcolor: 'rgba(0,229,255,0.08)',
            color: '#00E5FF',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      ),
    },
    {
      field: 'price',
      headerName: t('products.price'),
      width: 120,
      renderCell: (params) => (
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFB300' }}>
          ${params.value?.toLocaleString()}
        </Typography>
      ),
    },
    {
      field: 'stockStatus',
      headerName: t('products.stockStatus'),
      width: 130,
      renderCell: (params) => {
        const inStock = params.value === 'In Stock';
        return (
          <Chip
            label={inStock ? t('products.inStock') : t('products.outOfStock')}
            size="small"
            sx={{
              bgcolor: inStock ? 'rgba(0,230,118,0.1)' : 'rgba(255,82,82,0.1)',
              color: inStock ? '#00E676' : '#FF5252',
              fontWeight: 700,
              fontSize: '0.65rem',
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: t('products.actions'),
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title={t('products.edit')}>
            <IconButton
              size="small"
              onClick={() => handleEditClick(params.row)}
              sx={{
                color: '#00E5FF',
                '&:hover': { bgcolor: 'rgba(0,229,255,0.15)' },
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('products.delete')}>
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(params.row)}
              sx={{
                color: '#FF5252',
                '&:hover': { bgcolor: 'rgba(255,82,82,0.15)' },
              }}
            >
              <DeleteRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: '100%',
          '& .MuiDataGrid-root': {
            border: '1px solid rgba(0,229,255,0.06)',
            borderRadius: 4,
            bgcolor: '#111827',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(0,229,255,0.04)',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: 'rgba(0,229,255,0.03)',
            borderBottom: '1px solid rgba(0,229,255,0.08)',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 700,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8B95A8',
          },
          '& .MuiDataGrid-row:hover': {
            bgcolor: 'rgba(0,229,255,0.03)',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid rgba(0,229,255,0.06)',
          },
          '& .MuiTablePagination-root': {
            color: '#8B95A8',
          },
          '& .MuiDataGrid-selectedRowCount': {
            color: '#8B95A8',
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="client"
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
          sx={{ minHeight: 400 }}
        />
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}>
          {t('products.deleteProduct')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            {t('products.confirmDelete')}
            <br />
            <Typography component="span" sx={{ color: '#FF5252', fontSize: '0.85rem', mt: 1, display: 'block' }}>
              {t('products.deleteWarning')}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary' }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FF7B7B 0%, #FF5252 100%)',
                boxShadow: '0 0 20px rgba(255,82,82,0.3)',
              },
            }}
          >
            {t('common.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      {editDialogOpen && (
        <ProductFormDialog
          open={editDialogOpen}
          onClose={handleEditClose}
          product={selectedProduct}
          mode="edit"
        />
      )}

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
            bgcolor: snackbar.severity === 'success' ? 'rgba(0,230,118,0.15)' : 'rgba(255,82,82,0.15)',
            color: snackbar.severity === 'success' ? '#00E676' : '#FF5252',
            border: `1px solid ${snackbar.severity === 'success' ? 'rgba(0,230,118,0.3)' : 'rgba(255,82,82,0.3)'}`,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
