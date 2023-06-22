import React, { useState } from 'react';
import i18next from 'i18next';
import { Select, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export default function Navigation() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(i18next.language);

  const handleChangeLanguage = (language: string | undefined) => {
    setSelectedLanguage(language);
    if (language) {
      i18next.changeLanguage(language);
    }
  };

  return (
    <Select
      value={selectedLanguage}
      onChange={(event) => handleChangeLanguage(event.target.value as string)}
      IconComponent={LanguageIcon}
    >
      <MenuItem value="en">
        <span aria-label="English" style={{ marginRight: '8px', fontSize: '16px',  }}>
          {selectedLanguage === 'en' ? '🇺🇸' : '🇺🇸'}
        </span>
      </MenuItem>
      <MenuItem value="ge">
        <span  aria-label="Georgian" style={{ marginRight: '8px', fontSize: '16px'}}>
          {selectedLanguage === 'ge' ? '🇬🇪' : '🇬🇪'}
        </span>
      </MenuItem>
    </Select>
  );
}
