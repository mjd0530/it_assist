# AI Integration Setup Guide

This guide will help you set up AI integration for the Lenovo IT Assist application.

## Default Experience: Mock AI Responses

**The application is configured to use realistic mock responses by default**, providing a full demo experience without requiring any API keys. This gives you:

- ✅ **Immediate functionality** - Works out of the box
- ✅ **Realistic responses** - Context-aware IT support answers
- ✅ **No setup required** - Perfect for demos and testing
- ✅ **Realistic delays** - Simulates real AI response times

## Available AI Providers (Optional)

If you want to use real AI services, the application supports multiple providers:

1. **OpenAI GPT-3.5-turbo** (Best quality responses)
2. **Hugging Face Inference API** (Free tier available)
3. **Mock Responses** (Default - No setup required)

## Setup Instructions

### Option 0: Mock Experience (Default - No Setup Required)

**The application works immediately with realistic mock responses!** No setup needed - just start using it.

The mock responses include:
- **BSOD Analysis**: Detailed crash analysis and recommendations
- **BIOS Updates**: Firmware management and deployment strategies  
- **Network Issues**: Connectivity troubleshooting and optimization
- **Battery Problems**: Power management and optimization
- **General IT Support**: Comprehensive IT assistance

### Option 1: OpenAI (Optional - For Real AI)

1. **Get an OpenAI API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in to your account
   - Create a new API key
   - Copy the API key

2. **Configure the Environment:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key_here
     ```

### Option 2: Hugging Face (Optional - Free AI)

1. **Get a Hugging Face API Key:**
   - Visit [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Sign up or log in to your account
   - Create a new access token
   - Copy the token

2. **Configure the Environment:**
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your Hugging Face API key:
     ```
     VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
     ```

## How to Enable Real AI (Optional)

To switch from mock responses to real AI, simply uncomment the API calls in `/src/services/aiService.ts`:

1. Open the file in your editor
2. Find the `generateResponse` method
3. Uncomment the API provider sections you want to use
4. Add your API keys to the `.env` file
5. Restart the development server

The application will automatically try the enabled providers in order of preference.

## Usage

Once configured, the AI integration will work automatically:

1. **New Threads:** Click the "New" button to create a new thread
2. **Ask Questions:** Type your question in the input field and press Enter or click Send
3. **AI Responses:** The AI will generate contextual responses based on your questions

## Features

- **Multi-provider Support:** Automatically tries OpenAI first, then Hugging Face, then falls back to mock responses
- **Error Handling:** Graceful fallback if API calls fail
- **Context Awareness:** AI responses are tailored for IT support and Lenovo device management
- **Real-time Chat:** Messages appear instantly with loading indicators

## Troubleshooting

### Common Issues

1. **"No AI API keys found" message:**
   - Make sure you've created a `.env` file with your API key
   - Restart the development server after adding the API key

2. **API request failed errors:**
   - Check that your API key is valid and has sufficient credits
   - Verify your internet connection
   - The app will automatically fall back to mock responses

3. **Slow responses:**
   - Hugging Face free tier may have rate limits
   - Consider upgrading to OpenAI for faster, more reliable responses

### Development Server Restart

After adding API keys, restart your development server:

```bash
npm run dev
```

## Security Notes

- Never commit your `.env` file to version control
- API keys are prefixed with `VITE_` to make them available in the browser
- For production, consider using a backend proxy to keep API keys secure

## Cost Considerations

- **OpenAI:** Pay-per-use, typically $0.002 per 1K tokens
- **Hugging Face:** Free tier available with rate limits
- **Mock Responses:** Free, but limited functionality

Choose the option that best fits your needs and budget!
