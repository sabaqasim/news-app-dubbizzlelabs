import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Grid,
  Box,
  Snackbar,
} from '@mui/material';

//import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import axios, { AxiosError } from 'axios';
import LanguageToggle from './components/LanguageToggle';
import PageLoader from './components/Loader';
import TopicsChips from './components/TopicsChips';
import ArticleCard from './components/ArticleCard';
import ErrorSnackbar from './components/ErrorMessageAlert';

function App() {

  const { t } = useTranslation();
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
  const handleAxiosError = (error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // Display specific messages based on different status codes
      switch (error.response.status) {
        case 400:
          setErrorMsg('Bad Request: ' + error.response.data.message);
          break;
        case 401:
          setErrorMsg('Unauthorized: ' + error.response.data.message);
          break;
        case 404:
          setErrorMsg('Not Found: ' + error.response.data.message);
          break;
        case 429:
          setErrorMsg('Bad Request:' + error.response.data.message)
          //console.error('Bad Request:', error.response.data.message);
          break;
        case 500:
         setErrorMsg('Server error:'+ error.response.data.message);
          break;

        default:
         setErrorMsg('An error occurred:'+ error.response.data.message);
      };
      setSnackbarOpen(true);
    } else if (error.request) {
      // The request was made but no response was received
     setErrorMsg('No response received from the server.');
     setSnackbarOpen(true);
    } else {
      // Something happened in setting up the request that triggered an error
     setErrorMsg('Error setting up the request:'+ error.message);
     setSnackbarOpen(true);
    }
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
    } catch (error: any) {
      console.error('Error fetching news:', error);
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', error);
      }
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
      <ErrorSnackbar errorMessage={errorMsg} open={snackbarOpen} onClose={handleSnackbarClose} />
  
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
