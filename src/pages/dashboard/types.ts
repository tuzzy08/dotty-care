import { User, Session } from '@supabase/auth-helpers-react';

export interface PageProps {
  user: User;
  session: Session;
}