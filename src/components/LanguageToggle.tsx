import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface LanguageToggleProps {
  onLanguageChange: (language: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const [isEnglish, setIsEnglish] = useState(true);

  const handleLanguageToggle = () => {
    const newLanguage = isEnglish ? 'ar' : 'en';
    setIsEnglish(!isEnglish);
    onLanguageChange(newLanguage);
  };

  return (
    <FormControlLabel
      control={<Switch checked={isEnglish} onChange={handleLanguageToggle} />}
      label={isEnglish ? 'English' : 'Arabic'}
    />
  );
};

export default LanguageToggle;
