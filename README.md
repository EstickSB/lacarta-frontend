# 🛸 LaCarta MVP - Custom Menu Engine v1.0

**LaCarta** is a high-end, white-label digital menu engine designed to provide a "Cinematic" experience for luxury restaurants. It bridges the gap between a native mobile app feel and a responsive web experience.

## ✨ Key Features

- **White-Label Architecture**: Fully customizable branding (Logo, Fonts, Colors, Cover Images) via a single configuration file.
- **Cinematic UX**:
  - **Unified Luxury Animations**: Consistent "Blur + Slide Up" entrance effects across all devices.
  - **Splash Screen**: Elegant loading sequence locked to the viewport.
  - **Responsive Layouts**:
    - *Mobile*: App-like feel, internal scrolling, compact grids for drinks, stacked cards for food.
    - *Desktop*: Immersive wide layout, parallax-style headers, multi-column grids.
- **Performance Optimized**:
  - `LazyImage` component with shimmer effects.
  - Virtualized-style rendering logic (animations trigger on scroll).
  - No-scrollbar aesthetics for clean visuals.
- **Dietary Awareness**: Built-in support for badges (Vegan, Spicy, Gluten-Free, Chef's Choice).

## 🛠 Tech Stack

- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Bundling/Environment**: ES Modules (ESM) via standard HTML imports.

## 📂 Project Structure

```text
/
├── index.html              # Entry point & Font imports
├── index.tsx               # React Root mount
├── App.tsx                 # Main Layout & Responsive Logic
├── types.ts                # TypeScript Interfaces (The Schema)
├── constants.ts            # Data Source (Restaurant Config)
├── metadata.json           # App metadata
└── components/
    ├── CategoryNav.tsx     # Sticky horizontal navigation
    ├── DishCard.tsx        # Smart card (adapts to List vs Compact view)
    ├── LazyImage.tsx       # Image wrapper with loading states
    ├── SplashScreen.tsx    # Intro animation
    └── Watermark.tsx       # Branding footer
```

## 🧬 Data Schema & Configuration

The entire application is driven by the `restaurantConfig` object found in `constants.ts`. This structure adheres to the interfaces defined in `types.ts`.

### 1. Root Configuration (`RestaurantConfig`)

This controls the global theming and identity of the restaurant.

| Field | Type | Description |
| :--- | :--- | :--- |
| `slug` | `string` | Unique identifier for the restaurant URL/routing. |
| `name` | `string` | Display name of the venue. |
| `description` | `string` | Short tagline or motto appearing below the title. |
| `logo` | `string` | URL to the square logo image. |
| `coverImage` | `string` | URL to the high-res hero background image. |
| `primaryColor` | `string (Hex)` | Accent color used for prices, active tabs, and highlights (e.g., `#D4AF37`). |
| `backgroundColor` | `string (Hex)` | Main background color (usually dark for this theme). |
| `fontFamily` | `string` | CSS font-family stack (e.g., `'Playfair Display', serif`). |
| `categories` | `Category[]` | Array of menu categories. |

### 2. Category Structure (`Category`)

Sections of the menu (e.g., Starters, Mains, Cocktails).

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique ID for navigation scrolling anchors. |
| `title` | `string` | Display title of the category. |
| `type` | `'food' | 'drink'` | Determines layout: `'food'` uses large cards, `'drink'` uses compact grids. |
| `items` | `Dish[]` | Array of dishes in this category. |

### 3. Dish Item (`Dish`)

Individual menu items.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique ID for the item. |
| `name` | `string` | Name of the dish. |
| `description` | `string` | Ingredients or marketing copy. |
| `price` | `string` | Display price (e.g., "$24"). |
| `image` | `string` | URL to the dish image. |
| `badges` | `DietaryBadge[]` | (Optional) Array of tags. |

### 4. Badge Types (`DietaryBadge`)

Supported string literals for the `badges` array:

- `'spicy'` (Flame icon)
- `'vegan'` (Leaf icon)
- `'gluten-free'` (Wheat off icon)
- `'chef-choice'` (Star icon)

---

## 🚀 How to Customize

1. Open `constants.ts`.
2. Replace the `restaurantConfig` object with your own data.
3. The application automatically adapts colors, fonts, and layouts based on your input.

## 🎨 Visual System

- **Desktop**: Content centers in a `max-w-7xl` container. The header expands to 50vh.
- **Mobile**: Content is constrained to `max-w-[450px]` to simulate a native app shell. The header is 25vh.
- **Transitions**: All elements use `Framer Motion` for `opacity`, `blur`, and `y-axis` transitions.
