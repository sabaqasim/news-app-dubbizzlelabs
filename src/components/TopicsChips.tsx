import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

interface TopicsChipsProps {
  topics: string[];
  selectedTopic: string;
  onChipClick: (topic: string) => void;
}

const TopicsChips: React.FC<TopicsChipsProps> = ({ topics, selectedTopic, onChipClick }) => {
  return (
    <Box>
      {topics.map((topic) => (
        <Chip
          key={topic}
          label={topic}
          clickable
          color={selectedTopic.includes(topic) ? 'primary' : 'default'}
          onClick={() => onChipClick(topic)}
          style={{ margin: '0.5rem' }}
        />
      ))}
    </Box>
  );
};

export default TopicsChips;
