# One on One - Web Application

The web application for the One on One tour guide platform, built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.jsx      # Main layout wrapper
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # User login
│   ├── Register.jsx    # User registration
│   ├── CustomerDashboard.jsx
│   ├── GuideDashboard.jsx
│   ├── GuidesList.jsx  # Browse guides
│   ├── BookingPage.jsx # Booking interface
│   └── PaymentPage.jsx # USDT payment
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── LanguageContext.jsx # Internationalization
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── assets/             # Static assets
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🎨 Styling

### Tailwind CSS Configuration

The application uses a custom Tailwind CSS configuration with:

- **Dark Mode**: Default dark theme with custom color palette
- **Custom Colors**: Primary blue (#3b82f6) and dark theme colors
- **Typography**: Inter font family from Google Fonts
- **Animations**: Fade-in and slide-up animations
- **Responsive Design**: Mobile-first approach

### CSS Classes

```css
/* Button Styles */
.btn-primary      /* Primary call-to-action buttons */
.btn-secondary    /* Secondary outline buttons */

/* Layout */
.card            /* Card container with dark theme */
.input-field     /* Consistent form input styling */
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests with Vitest
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Environment Variables

Create a `.env` file in the web package root:

```bash
# API Configuration
VITE_API_URL=http://localhost:3001

# Payment Configuration
VITE_USDT_NETWORK=tron
VITE_PAYMENT_GATEWAY_URL=https://api.payment-provider.com

# Features
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_APPLE_CLIENT_ID=your-apple-client-id
```

## 🏗️ Architecture

### State Management

The application uses React Context for state management:

- **AuthContext**: User authentication and session management
- **LanguageContext**: Internationalization and language switching

### Routing

React Router is used for client-side navigation:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/customer/dashboard" element={<CustomerDashboard />} />
  <Route path="/guide/dashboard" element={<GuideDashboard />} />
  <Route path="/guides" element={<GuidesList />} />
  <Route path="/booking/:guideId" element={<BookingPage />} />
  <Route path="/payment/:bookingId" element={<PaymentPage />} />
</Routes>
```

### Component Structure

#### Layout Component
Provides consistent navigation and footer across all pages.

#### Authentication Components
- `Login.jsx`: User login with social auth options
- `Register.jsx`: User registration with customer/guide selection

#### Dashboard Components
- `CustomerDashboard.jsx`: Customer booking management
- `GuideDashboard.jsx`: Guide earnings and booking management

#### Booking Flow
- `GuidesList.jsx`: Browse and filter available guides
- `BookingPage.jsx`: Select dates and create bookings
- `PaymentPage.jsx`: USDT payment processing

## 💰 Payment Integration

### USDT Payment Flow

1. **Booking Creation**: User selects guide and creates booking
2. **Payment Review**: Display booking details and USDT amount
3. **Address Generation**: Provide merchant wallet address
4. **Transaction Submission**: User enters transaction hash
5. **Verification**: Blockchain verification (simulated in demo)
6. **Confirmation**: Booking confirmed and guide notified

### Payment Components

```jsx
// PaymentPage.jsx - Main payment interface
const PaymentPage = () => {
  const [paymentStep, setPaymentStep] = useState('review')
  // review -> payment -> confirmation
}
```

## 🌐 Internationalization

### Language Support

The application supports:
- English (default)
- Traditional Chinese (繁體中文)

### Translation Usage

```jsx
import { useLanguage } from '../context/LanguageContext'

function Component() {
  const { t } = useLanguage()
  return <span>{t('nav.home')}</span>
}
```

### Adding Translations

Add new translation keys to `LanguageContext.jsx`:

```jsx
const translations = {
  en: {
    'new.key': 'English text'
  },
  'zh-TW': {
    'new.key': '中文文本'
  }
}
```

## 🧪 Testing

### Test Setup

The application uses Vitest for testing:

```bash
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:ui     # Open test UI
```

### Writing Tests

```jsx
// Example component test
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />)
    expect(screen.getByText('Find Your Perfect Tour Guide')).toBeInTheDocument()
  })
})
```

## 📱 Responsive Design

### Breakpoints

The application follows Tailwind's responsive breakpoints:

- `sm`: 640px and up
- `md`: 768px and up  
- `lg`: 1024px and up
- `xl`: 1280px and up

### Mobile-First Approach

```jsx
// Example responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid layout */}
</div>
```

## 🔐 Security

### Authentication

- JWT token storage in localStorage
- Automatic token verification on app load
- Social authentication integration (Google, Apple)

### API Security

- HTTPS-only API calls
- Request/response validation
- Error handling for API failures

### Payment Security

- Wallet address validation
- Transaction hash verification
- Secure payment data handling

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build Configuration

The application is configured for static deployment:

```js
// vite.config.js
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
})
```

### Environment Variables for Production

Set the following environment variables in your deployment platform:

```bash
VITE_API_URL=https://api.yourapp.com
VITE_USDT_NETWORK=tron
VITE_PAYMENT_GATEWAY_URL=https://payment.provider.com
```

## 🔧 Development Tips

### Hot Reload

Vite provides fast hot module replacement (HMR) for instant updates during development.

### VS Code Setup

Recommended VS Code extensions:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Prettier - Code formatter

### Code Style

The project uses ESLint and Prettier for consistent code formatting:

```json
// .eslintrc.json
{
  "extends": ["react-app", "react-app/jest"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn"
  }
}
```

## 📊 Performance

### Optimization Features

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: WebP images with lazy loading
- **Bundle Analysis**: Built-in bundle size optimization
- **Tree Shaking**: Unused code elimination

### Performance Monitoring

```jsx
// Example lazy loading
const GuidesList = lazy(() => import('../pages/GuidesList'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <GuidesList />
    </Suspense>
  )
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   ```

2. **Module Not Found**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Errors**
   ```bash
   # Clear build cache
   rm -rf dist
   npm run build
   ```

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm run dev
```

---

**Happy coding! 🚀**