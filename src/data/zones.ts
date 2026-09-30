import type { Zone } from '../types';

export const ZONES: Zone[] = [
  { id: 'z1', name: 'Central Produce Hall', category: 'Fresh produce', status: 'Open', priority: 'High' },
  { id: 'z2', name: 'Cyuve Fish and Meat Row', category: 'Meat and fish', status: 'Pending', priority: 'High' },
  { id: 'z3', name: 'Kinigi Textile Lane', category: 'Clothing', status: 'Open', priority: 'Low' },
  { id: 'z4', name: 'Muhoza Household Corner', category: 'Household goods', status: 'Closed', priority: 'Medium' },
  { id: 'z5', name: 'Ruhengeri Grain Yard', category: 'Grains and cereals', status: 'Open', priority: 'Medium' },
  { id: 'z6', name: 'Nyakinama Street Food Court', category: 'Cooked food', status: 'Pending', priority: 'High' },
  { id: 'z7', name: 'Shingiro Handicraft Bay', category: 'Crafts', status: 'Open', priority: 'Low' },
  { id: 'z8', name: 'Busogo Dairy Point', category: 'Dairy', status: 'Closed', priority: 'Medium' },
];
