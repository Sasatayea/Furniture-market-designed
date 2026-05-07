import { useEffect, useState } from 'react';
import FurnitureGrid from '../components/FurnitureGrid';
import {
  Box,
  Typography,
  Container,
  Skeleton,
  Alert,
} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/furniture')
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      });
  }, []);

  const groupedData = data?.[0]?.data?.reduce((acc, item) => {
    const category = item.category || 'Uncategorized';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ minHeight: '80vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-40%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'rgba(0,229,255,0.06)',
              border: '1px solid rgba(0,229,255,0.1)',
              borderRadius: 5,
              px: 2,
              py: 0.5,
              mb: 3,
            }}
          >
            <AutoAwesomeRoundedIcon sx={{ fontSize: 14, color: '#00E5FF' }} />
            <Typography
              sx={{
                fontSize: '0.65rem',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#00E5FF',
                textTransform: 'uppercase',
              }}
            >
              Curated Collections
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '2rem', md: '3.2rem' },
              lineHeight: 1.15,
              mb: 2,
              background: 'linear-gradient(135deg, #E8ECF4 0%, #8B95A8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Furniture that{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #FFB300 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Inspires
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#6B7A90',
              maxWidth: 520,
              mx: 'auto',
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              lineHeight: 1.7,
            }}
          >
            Discover pieces crafted with precision and passion. Every item in our collection
            tells a story of artisanal excellence.
          </Typography>
        </Container>
      </Box>

      {/* Products */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        {loading ? (
          <Box>
            {[1, 2].map((section) => (
              <Box key={section} sx={{ mb: 6 }}>
                <Skeleton
                  variant="text"
                  width={200}
                  height={40}
                  sx={{ bgcolor: 'rgba(0,229,255,0.04)', mb: 2 }}
                />
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: 2.5,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={260}
                      sx={{ bgcolor: 'rgba(0,229,255,0.04)', borderRadius: 4 }}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        ) : error ? (
          <Alert
            severity="error"
            sx={{
              bgcolor: 'rgba(255,82,82,0.1)',
              color: '#FF5252',
              border: '1px solid rgba(255,82,82,0.2)',
              borderRadius: 3,
              maxWidth: 500,
              mx: 'auto',
              mt: 4,
            }}
          >
            {error}
          </Alert>
        ) : groupedData ? (
          Object.keys(groupedData).map((category) => (
            <Box key={category} sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    width: 3,
                    height: 24,
                    borderRadius: 2,
                    background: 'linear-gradient(180deg, #00E5FF, #FFB300)',
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    color: '#E8ECF4',
                    letterSpacing: '0.02em',
                  }}
                >
                  {category}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    color: '#6B7A90',
                    bgcolor: 'rgba(0,229,255,0.06)',
                    px: 1.2,
                    py: 0.3,
                    borderRadius: 2,
                    fontWeight: 600,
                  }}
                >
                  {groupedData[category].length} items
                </Typography>
              </Box>
              <FurnitureGrid items={groupedData[category]} />
            </Box>
          ))
        ) : (
          <Typography
            sx={{
              textAlign: 'center',
              color: '#6B7A90',
              py: 8,
              fontSize: '1rem',
            }}
          >
            No products available at the moment.
          </Typography>
        )}
      </Container>
    </Box>
  );
}