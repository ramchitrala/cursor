import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'RoomSpot - Find Your Perfect Room',
    template: '%s | RoomSpot'
  },
  description: 'Find and list rooms, connect with roommates, and discover your perfect living space with RoomSpot.',
  keywords: ['roommate finder', 'room rental', 'student housing', 'apartment sharing', 'room listing'],
  authors: [{ name: 'RoomSpot Team' }],
  creator: 'RoomSpot',
  publisher: 'RoomSpot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://roomspot.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'RoomSpot - Find Your Perfect Room',
    description: 'Find and list rooms, connect with roommates, and discover your perfect living space.',
    url: 'https://roomspot.com',
    siteName: 'RoomSpot',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'RoomSpot - Find Your Perfect Room',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoomSpot - Find Your Perfect Room',
    description: 'Find and list rooms, connect with roommates, and discover your perfect living space.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'housing',
  classification: 'roommate finder',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'RoomSpot',
    'application-name': 'RoomSpot',
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  colorScheme: 'light',
}

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "RoomSpot",
  "description": "Find and list rooms, connect with roommates, and discover your perfect living space.",
  "url": "https://roomspot.com",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "RoomSpot"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RoomSpot"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preload critical CSS */}
        <link
          rel="preload"
          href="/globals.css"
          as="style"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//ui-avatars.com" />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        {/* Main content wrapper with proper semantic structure */}
        <div id="app" className="min-h-screen bg-white">
          <header role="banner" aria-label="Site header">
            {/* Navigation will be rendered here by individual pages */}
          </header>
          
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
          </main>
          
          <footer role="contentinfo" aria-label="Site footer" className="sr-only">
            <p>RoomSpot - Find Your Perfect Room</p>
          </footer>
        </div>
        
        {/* Focus management script for accessibility */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Focus management for accessibility
              document.addEventListener('DOMContentLoaded', function() {
                // Focus main content when skip link is activated
                const skipLink = document.querySelector('.skip-link');
                const mainContent = document.querySelector('#main-content');
                
                if (skipLink && mainContent) {
                  skipLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    mainContent.focus();
                  });
                }
                
                // Ensure focus is visible
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                  }
                });
                
                document.addEventListener('mousedown', function() {
                  document.body.classList.remove('keyboard-navigation');
                });
              });
            `
          }}
        />
      </body>
    </html>
  )
} 