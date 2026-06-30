import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';

export interface AdminSessionData {
  userId?: number;
  nome?: string;
  loggedIn?: boolean;
}

export const adminSessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'ggpeitas_admin',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 30,
  },
};

export async function getAdminSession() {
  return getIronSession<AdminSessionData>(await cookies(), adminSessionOptions);
}
