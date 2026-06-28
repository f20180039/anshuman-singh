/**
 * Test script to validate Google Gemini API key
 * Run: node test-gemini-api.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: resolve(__dirname, '../.env') });

const API_KEY = process.env.GOOGLE_API_KEY;

console.log('🔍 Testing Google Gemini API Key...\n');

// Check if API key exists
if (!API_KEY) {
  console.error('❌ ERROR: GOOGLE_API_KEY not found in .env file');
  console.log('\n📝 Make sure you have a .env file with:');
  console.log('   GOOGLE_API_KEY=your_actual_api_key_here\n');
  process.exit(1);
}

// Check API key format
console.log('✅ API Key found in .env');
console.log(`📏 Length: ${API_KEY.length} characters`);
console.log(`🔑 Preview: ${API_KEY.substring(0, 10)}...${API_KEY.slice(-6)}\n`);

// Validate format
if (API_KEY.length < 30) {
  console.warn('⚠️  WARNING: API key seems too short. Typical Gemini keys are 39+ characters\n');
}

// Test API connection
console.log('🚀 Testing API connection...\n');

try {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  console.log('📤 Sending test prompt to Gemini API...');

  const result = await model.generateContent('Say "Hello from Gemini!" in exactly those words.');
  const response = result.response.text();

  console.log('✅ SUCCESS! API is working correctly\n');
  console.log('📥 Response from Gemini:');
  console.log('─'.repeat(50));
  console.log(response);
  console.log('─'.repeat(50));
  console.log('\n✨ Your Google Gemini API key is valid and working!\n');

} catch (error) {
  console.error('❌ ERROR: API test failed\n');

  if (error.message?.includes('API key')) {
    console.error('🔴 Issue: Invalid API key');
    console.log('\n📝 Steps to fix:');
    console.log('   1. Get a new API key from: https://makersuite.google.com/app/apikey');
    console.log('   2. Or try: https://aistudio.google.com/app/apikey');
    console.log('   3. Update your .env file with the new key');
    console.log('   4. Make sure the key has "Generative Language API" enabled\n');
  } else if (error.message?.includes('quota') || error.message?.includes('billing')) {
    console.error('🔴 Issue: API quota or billing problem');
    console.log('\n📝 Steps to fix:');
    console.log('   1. Check your Google Cloud Console billing');
    console.log('   2. Verify API quota limits at: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com');
    console.log('   3. Make sure Generative Language API is enabled\n');
  } else if (error.message?.includes('not found')) {
    console.error('🔴 Issue: Model or API endpoint not found');
    console.log('\n📝 Steps to fix:');
    console.log('   1. Verify the API key is for the correct Google Cloud project');
    console.log('   2. Enable "Generative Language API" in your project\n');
  } else {
    console.error('🔴 Unexpected error:', error.message);
    console.log('\n📝 Full error details:');
    console.error(error);
  }

  console.log('\n💡 Common issues:');
  console.log('   - API key format incorrect (should start with "AIza" typically)');
  console.log('   - API not enabled in Google Cloud Console');
  console.log('   - Billing not set up for the project');
  console.log('   - Rate limits exceeded');
  console.log('   - Network/firewall blocking the request\n');

  process.exit(1);
}
