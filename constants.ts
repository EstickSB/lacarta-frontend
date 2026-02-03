import { RestaurantConfig } from './src/types';

export const restaurantConfig: RestaurantConfig = {
  slug: 'l-atmosphere',
  name: "L'Atmosphère",
  description: "Experience the essence of modern French gastronomy merged with local organic roots.",
  logo: "https://picsum.photos/id/433/200/200", // A classy placeholder
  coverImage: "https://picsum.photos/id/225/1200/800", // Dark moody tea/bar vibe
  primaryColor: "#D4AF37", // Gold
  backgroundColor: "#1a1a1a", // Dark luxury background
  fontFamily: "'Playfair Display', serif",
  categories: [
    {
      id: 'starters',
      title: 'Pour Commencer',
      type: 'food',
      items: [
        {
          id: '1',
          name: 'Tartare de Boeuf',
          description: 'Hand-cut tenderloin, quail egg, capers, and truffle oil emulsion.',
          price: '$24',
          image: "https://picsum.photos/id/42/800/450",
          badges: ['chef-choice', 'gluten-free']
        },
        {
          id: '2',
          name: 'Burrata & Figs',
          description: 'Fresh burrata imported from Puglia, caramelized figs, balsamic glaze.',
          price: '$21',
          image: "https://picsum.photos/id/1080/800/450",
          badges: ['vegan']
        }
      ]
    },
    {
      id: 'mains',
      title: 'Plats Principaux',
      type: 'food',
      items: [
        {
          id: '3',
          name: 'Duck Confit',
          description: 'Slow-cooked duck leg, sarladaise potatoes, wild mushroom reduction.',
          price: '$38',
          image: "https://picsum.photos/id/835/800/450",
          badges: ['chef-choice']
        },
        {
          id: '4',
          name: 'Wild Caught Sea Bass',
          description: 'Pan-seared, asparagus velvet, lemon caviar, herbs from our garden.',
          price: '$42',
          image: "https://picsum.photos/id/429/800/450",
          badges: ['gluten-free']
        },
        {
          id: '5',
          name: 'Spicy Truffle Rigatoni',
          description: 'House-made pasta, spicy vodka sauce, fresh shaved black truffle.',
          price: '$32',
          image: "https://picsum.photos/id/292/800/450",
          badges: ['spicy']
        }
      ]
    },
    {
      id: 'cocktails',
      title: 'Signature Elixirs',
      type: 'drink',
      items: [
        {
          id: '6',
          name: 'The Alchemist',
          description: 'Gin, elderflower, smoke.',
          price: '$18',
          image: "https://picsum.photos/id/312/800/800",
          badges: ['chef-choice']
        },
        {
          id: '7',
          name: 'Smoked Old Fashioned',
          description: 'Bourbon, maple, bitters.',
          price: '$20',
          image: "https://picsum.photos/id/338/800/800",
        },
        {
          id: '8',
          name: 'Velvet Martini',
          description: 'Vodka, coffee liqueur.',
          price: '$16',
          image: "https://picsum.photos/id/431/800/800",
        },
        {
          id: '9',
          name: 'Royal Spritz',
          description: 'Champagne, cassis.',
          price: '$22',
          image: "https://picsum.photos/id/400/800/800",
        }
      ]
    }
  ]
};