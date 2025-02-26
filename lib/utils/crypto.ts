import * as argon2 from 'argon2';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ALGORITHM = 'aes-256-gcm';

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id, // recommended variant
    memoryCost: 2 ** 16,   // 64MB memory usage
    timeCost: 3,           // 3 iterations
    parallelism: 1,        // degree of parallelism
    salt: randomBytes(16)  // Changed from saltLength to salt
  });
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

export function encryptWallet(privateKey: string, password?: string): string {
  const key = password 
    ? Buffer.from(password + process.env.ENV_SECRET_KEY!).subarray(0, 32)
    : Buffer.from(process.env.ENV_SECRET_KEY!).subarray(0, 32);
  
  const iv = randomBytes(16);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(privateKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return JSON.stringify({
    iv: iv.toString('hex'),
    encrypted,
    authTag: authTag.toString('hex')
  });
}

export function decryptWallet(encryptedData: string, password?: string): string {
  const { iv, encrypted, authTag } = JSON.parse(encryptedData);
  
  const key = password 
    ? Buffer.from(password + process.env.ENV_SECRET_KEY!).subarray(0, 32)
    : Buffer.from(process.env.ENV_SECRET_KEY!).subarray(0, 32);
  
  const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
} 