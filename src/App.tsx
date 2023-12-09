import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Select,
  MenuItem,
  Chip,
  Grid,
  FormControl,
  InputLabel
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AnyCnameRecord } from 'dns';

function App() {

  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');


  console.log("language---", i18n.language)
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          apiKey: 'd04b10b2a69844d29024e1642cbbf00c',
          q: selectedTopic || 'meta',
          from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          sortBy: 'publishedAt',
          language: 'ar',
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [selectedLanguage, selectedTopic]);
  console.log(news)
  const handleTopicChange = (event: any) => {
    setSelectedTopic(event.target.value as string);
  };

  const openArticle = (url: string) => {
    window.open(url, '_blank');
  };

  const theme = createTheme({
    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
  });
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          {t('News App')}
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={selectedTopic} onChange={handleTopicChange}>
            <InputLabel id="demo-simple-select-readonly-label">Select</InputLabel>
            <MenuItem value="apple">Apple</MenuItem>
            <MenuItem value="meta">Meta</MenuItem>
            <MenuItem value="netflix">Netflix</MenuItem>
            <MenuItem value="google">Google</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="tesla">Tesla</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select value={selectedTopic} onChange={handleTopicChange}>
            <InputLabel id="demo-simple-select-readonly-label">Select</InputLabel>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">Arabic</MenuItem>
          </Select>
        </FormControl>
        {loading && <CircularProgress />}
        {!loading && (
          <Grid container spacing={3}>
            {news.map((article: any, index: number) => (
              <Grid key={article.id} xs={12} sm={6} md={4}>
                <Card key={index} style={{ margin: '20px' }}>

                  <CardMedia component="img" height="140" image={article.urlToImage} alt={article.title} />
                  <CardContent>
                    <Typography variant="h6"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                      }}
                    >{article.title}</Typography>
                    <Typography variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                      }}
                    >{article.description}</Typography>
                    <Chip label="Open Article" onClick={() => openArticle(article.url)} />
                  </CardContent>
                </Card>
              </Grid>

            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>

  );
}

export default App;
