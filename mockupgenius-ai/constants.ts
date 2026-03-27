export const MEDIUMS = [
  { id: 'coffee-mug', label: 'Coffee Mug' },
  { id: 't-shirt', label: 'T-Shirt Model' },
  { id: 'billboard', label: 'City Billboard' },
  { id: 'website-mockup', label: 'Website Mockup' },
  { id: 'tote-bag', label: 'Canvas Tote Bag' },
  { id: 'laptop-sticker', label: 'Laptop Sticker' },
  { id: 'packaging-box', label: 'Product Packaging' },
  { id: 'poster-frame', label: 'Wall Poster' },
  { id: 'phone-case', label: 'Phone Case' },
];

export const SCENARIOS = [
  { id: 'custom', label: 'Custom (Single Medium)' },
  { id: 'logo-company', label: 'Logo / Branding (4 items)', mediums: ['website-mockup', 'billboard', 'packaging-box', 't-shirt'] },
  { id: 'app-launch', label: 'App Launch (4 items)', mediums: ['phone-case', 'laptop-sticker', 'website-mockup', 'poster-frame'] },
  { id: 'merch-store', label: 'Merch Store (4 items)', mediums: ['t-shirt', 'coffee-mug', 'tote-bag', 'phone-case'] }
];

export const GENRES = [
  { id: 'photorealistic', label: 'Photorealistic' },
  { id: 'minimalist', label: 'Minimalist' },
  { id: 'cinematic', label: 'Cinematic' },
  { id: 'retro', label: 'Retro / Vintage' },
  { id: 'cyberpunk', label: 'Cyberpunk' },
  { id: 'studio-glamour', label: 'Studio Glamour' },
];

export const LIGHTING_OPTIONS = [
  { id: 'natural', label: 'Natural Sunlight' },
  { id: 'studio', label: 'Studio Softbox' },
  { id: 'neon', label: 'Neon Lights' },
  { id: 'golden-hour', label: 'Golden Hour' },
  { id: 'dramatic', label: 'Dramatic Shadows' },
];

export const COLOR_GRADING = [
  { id: 'standard', label: 'Standard' },
  { id: 'warm', label: 'Warm Tone' },
  { id: 'cool', label: 'Cool Tone' },
  { id: 'black-and-white', label: 'Black & White' },
  { id: 'vibrant', label: 'Vibrant / Saturated' },
  { id: 'muted', label: 'Muted / Pastel' },
];

export const ASPECT_RATIOS = [
  { id: '1:1', label: 'Square (1:1)' },
  { id: '16:9', label: 'Landscape (16:9)' },
  { id: '9:16', label: 'Portrait (9:16)' },
  { id: '4:3', label: 'Standard (4:3)' },
  { id: '3:4', label: 'Vertical (3:4)' },
];