import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Paper } from '@mui/material';

// Contenido de ejemplo para cada pestaña
const tabsContent = {
  sentiment: {
    title: 'Sentiment analysis',
    content: `
      Then I explore the nature of cognitive developmental improvements in working memory, 
      the role of working memory in learning, and some potential implications of working memory 
      and its development for the education of children and adults.

      The use of working memory is quite ubiquitous in human thought, but the best way to improve 
      education using what we know about working memory is still controversial. I hope to provide 
      some directions for research and educational practice.

      Actionables:
      Using what we know about working memory is still controversial.
      I hope to provide some directions for research and educational practice.
    `,
  },
  themes: {
    title: 'Themes analysis',
    content: `
      The analysis of themes includes identifying the primary topics that emerge from the text, 
      categorizing them into broader themes, and understanding their relevance to the educational 
      context. This thematic analysis aims to uncover the recurring subjects discussed in the 
      content provided.

      Themes are often abstract and need to be carefully contextualized within the discourse of 
      education, cognitive development, and related fields. The goal is to clarify the thematic 
      patterns that appear and their potential implications.

      Actionables:
      Refine theme categorization for better clarity.
      Expand thematic context analysis in further research.
    `,
  },
  keywords: {
    title: 'Keywords extraction',
    content: `
      Keywords extracted from the content provide a quick overview of the main topics discussed, 
      offering insights into the core concepts of the text. The extraction process identifies 
      significant words that represent the central ideas within the content.

      Keywords help in indexing the document and in improving the searchability of specific topics 
      within the educational research domain. The selection of keywords is based on frequency, 
      relevance, and contextual importance.

      Actionables:
      Verify accuracy of keyword extraction.
      Include additional context for selected keywords.
    `,
  },
};

// Componente principal
export const AnalysisTabs = () => {
  const [activeTab, setActiveTab] = useState('sentiment');

  // Función para manejar el cambio de pestañas
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, maxWidth: 378, height: 546 }}>
      {/* Pestañas */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: 500, fontSize: 14, lineHeight: '22px' }}
      >
        <Tab label="Sentiment" value="sentiment" />
        <Tab label="Themes" value="themes" />
        <Tab label="Keywords" value="keywords" />
      </Tabs>

      {/* Contenido de la pestaña activa */}
      <Box sx={{ mt: 2, overflowY: 'auto', maxHeight: '400px' }}>
        <Typography color='#262626' fontWeight={700} fontSize={14} lineHeight='22px'  gutterBottom textAlign='left'>
            {tabsContent[activeTab as keyof typeof tabsContent].title}
        </Typography>
        <Typography
            width={338}
          color='#262626' fontWeight={700} fontSize={14} lineHeight='22px' mt={2}
        >
          {tabsContent[activeTab as keyof typeof tabsContent].content}
        </Typography>
      </Box>
    </Paper>
  );
};

