# 🌱 GreenThumb AI - Plant Care Assistant

A comprehensive React Native mobile application powered by AI to help users identify plants, detect diseases, and get personalized plant care advice.

![GreenThumb AI](https://img.shields.io/badge/React%20Native-0.72-blue?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-49.0.0-black?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-Chatbot-orange?style=for-the-badge&logo=google)
![Gemini AI Studio](https://img.shields.io/badge/Google%20AI%20Studio-Gemini%20AI-orange?style=for-the-badge&logo=google)

## 📱 Features

### 🌿 Plant Identification
- **Smart Plant Search**: Search through an extensive database of plants
- **Visual Plant Cards**: Beautiful, detailed plant information cards
- **Care Instructions**: Comprehensive care guides for each plant

### 🔍 Disease Detection
- **AI-Powered Analysis**: Upload plant photos for disease detection
- **Symptom Enhancement**: AI-enhanced symptom descriptions
- **Treatment Recommendations**: Detailed treatment and prevention advice

### 🤖 AI Chatbot Assistant
- **Gemini AI Integration**: Powered by Google's Gemini AI
- **Plant Care Advice**: Get instant, personalized plant care tips
- **24/7 Support**: Always available to answer your plant questions

### 👤 User Management
- **Authentication**: Secure user registration and login
- **Profile Management**: Update personal information and preferences
- **Plant Collection**: Track your personal plant collection

### 📊 Plant Management
- **Plant Statistics**: Track your plant health and care progress
- **Category Management**: Organize plants by categories
- **Wishlist**: Save plants you want to add to your collection

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (install globally)
- **Expo Go** app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShravanGupta07/GDG-GreenThumb-AI.git
   cd GDG-GreenThumb-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Install **Expo Go** app on your mobile device
   - Scan the QR code displayed in the terminal
   - The app will load on your device

## 🛠️ Development Setup

### Environment Configuration

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure your environment variables**
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Database Setup

1. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL scripts in the `database/` folder
   - Update your environment variables

2. **Run database migrations**
   ```bash
   # Execute the SQL files in your Supabase dashboard
   # or use the Supabase CLI
   ```

## 📱 App Structure

```
GDG-GreenThumb-AI/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.tsx      # Home screen
│   │   ├── disease.tsx    # Disease detection
│   │   ├── identify.tsx   # Plant identification
│   │   └── profile/       # Profile management
│   ├── auth/              # Authentication screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── FloatingChatbot.tsx
│   ├── PlantCard.tsx
│   ├── PlantDetail.tsx
│   └── ...
├── services/              # API services
│   ├── authService.ts
│   ├── plantService.ts
│   └── supabase.ts
├── data/                  # Static data
├── assets/                # Images and icons
└── database/              # Database schemas
```

## 🔧 Configuration

### API Keys

The app uses several external services:

- **Supabase**: Database and authentication
- **Gemini AI**: Chatbot functionality
- **Plant.id**: Disease detection

### Customization

- **Theme**: Modify colors in `app.json` and component styles
- **Data**: Update plant database in `data/plantsData.ts`
- **Features**: Add new features in the respective directories

## 📱 Screenshots

### Home Screen
- Welcome interface with search functionality
- Daily plant care tips and advice
- Quick access to all features

### Plant Identification
- Search and browse plant database
- Detailed plant information cards
- Care instructions and tips

### Disease Detection
- Photo upload for disease analysis
- AI-powered disease identification
- Treatment recommendations

### AI Chatbot
- Gemini AI-powered plant care assistant
- Real-time responses to plant questions
- Quick reply suggestions

## 🚀 Deployment

### Expo Build

1. **Build for production**
   ```bash
   npx expo build:android
   npx expo build:ios
   ```

2. **Submit to app stores**
   ```bash
   npx expo submit:android
   npx expo submit:ios
   ```

### Web Deployment

1. **Build for web**
   ```bash
   npx expo export:web
   ```

2. **Deploy to hosting service**
   - Vercel, Netlify, or any static hosting

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo** for the amazing development platform
- **Supabase** for backend services
- **Google Gemini AI** for intelligent chatbot
- **Plant.id** for disease detection API
- **React Native** community for excellent documentation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ShravanGupta07/GDG-GreenThumb-AI/issues)
- **Email**: Shravan3333m@gmail.com
- **LinkedIn**: [Bhavna Solanki](https://www.linkedin.com/in/bhavna-solanki-a03b8728a/)

---

<div align="center">
  <p>Made with ❤️ by the GreenThumb AI Team</p>
  <p>🌱 Helping you grow better plants with AI 🌱</p>
</div>
