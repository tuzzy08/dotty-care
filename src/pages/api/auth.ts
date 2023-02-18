import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const supabase = createServerSupabaseClient({ req, res });
	supabase.auth.setSession;
}
