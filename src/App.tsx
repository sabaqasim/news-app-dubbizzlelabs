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
  InputLabel,
  Box,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import LanguageToggle from './components/LanguageToggle';
import PageLoader from './components/Loader';
import TopicsChips from './components/TopicsChips';
import ArticleCard from './components/ArticleCard';

function App() {

  const { t } = useTranslation();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const topics = ['All', 'Apple', 'Meta', 'Netflix', 'Google', 'Twitter', 'Tesla'];
  const handleChipClick = (topic: string) => {
    // if (selectedTopics.includes(topic)) {
    //   setSelectedTopics((prevSelectedTopics) =>
    //     prevSelectedTopics.filter((selectedTopic) => selectedTopic !== topic)
    //   );
    // } else {
    //   setSelectedTopics((prevSelectedTopics) => [...prevSelectedTopics, topic]);
    // }
    setSelectedTopic(topic)
  };
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
  };
  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(process.env.REACT_APP_NEWS_API_ENDPOINT!, {
        params: {
          apiKey: process.env.REACT_APP_NEWS_API_KEY,
          q: selectedTopic,
          from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          sortBy: 'publishedAt',
          language: selectedLanguage || 'en',
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

  const theme = createTheme({
    direction: selectedLanguage === 'en' ? 'rtl' : 'ltr',
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          {t('THE - NEWS - APP')}
        </Typography>
        <Box>
          <TopicsChips topics={topics} selectedTopic={selectedTopic} onChipClick={handleChipClick} />
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LanguageToggle onLanguageChange={handleLanguageChange}></LanguageToggle>
        </Box>
        {loading &&
          <PageLoader></PageLoader>
        }
        {!loading && (
          <Grid container spacing={3}>
            {news.map((article: any, index: number) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </Grid>
        )}
      </Container>
    </ThemeProvider>

  );
}

export default App;
