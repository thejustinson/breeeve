export interface UserSignup {
  email: string;
  password?: string;
  name?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  email: string;
  name?: string;
  walletAddress: string;
}

export interface StoredUser {
  id: string;
  email: string;
  name?: string;
  password_hash?: string;
  wallet_address: string;
  wallet_encrypted: string;
  created_at: string;
  updated_at: string;
} 