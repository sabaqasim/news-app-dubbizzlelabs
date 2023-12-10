import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

interface Article {
  id: number;
  urlToImage: string;
  title: string;
  description: string;
  url: string;
}

interface ArticleCardProps {
  article: Article;
  index: number;
}
const openArticle = (url: string) => {
    window.open(url, '_blank');
  };

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  return (
    <Grid key={article.id} xs={12} sm={6} md={4}>
      <Card key={index} style={{ margin: '20px' }}>
        <CardMedia component="img" height="140" image={article.urlToImage} alt={article.title} />
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {article.description}
          </Typography>
          <Chip label="Open Article" onClick={() => openArticle(article.url)} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArticleCard;
