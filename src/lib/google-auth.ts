import { JWT } from 'google-auth-library';

const formatPrivateKey = (key: string) => {
  // Hapus semua escape character \n dan whitespace
  let formattedKey = key.replace(/\\n/g, '\n').trim();

  // Jika key sudah dalam format yang benar (multi-line dengan header/footer), return langsung
  if (formattedKey.includes('-----BEGIN PRIVATE KEY-----\n')) {
    return formattedKey;
  }

  // Hapus header dan footer jika ada
  formattedKey = formattedKey
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .trim();

  // Split key menjadi chunks 64 karakter dan format ulang
  const chunks = formattedKey.match(/.{1,64}/g) || [];
  return `-----BEGIN PRIVATE KEY-----\n${chunks.join('\n')}\n-----END PRIVATE KEY-----\n`;
};

const getGoogleCredentials = () => {
  if (process.env.GOOGLE_SERVICE_ACCOUNT) {
    // For production (Vercel)
    try {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
      if (credentials.private_key) {
        credentials.private_key = formatPrivateKey(credentials.private_key);
      }
      return credentials;
    } catch (error) {
      console.error('Error parsing GOOGLE_SERVICE_ACCOUNT:', error);
      return null;
    }
  } else {
    // For local development
    try {
      const credentials = require('../../../service-account.json');
      if (credentials.private_key) {
        credentials.private_key = formatPrivateKey(credentials.private_key);
      }
      return credentials;
    } catch (error) {
      console.error('Error loading service-account.json:', error);
      return null;
    }
  }
};

export const getGoogleAuth = () => {
  const credentials = getGoogleCredentials();

  if (!credentials) {
    throw new Error('No Google credentials available');
  }

  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  });
};
