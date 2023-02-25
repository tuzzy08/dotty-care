import { NextApiRequest, NextApiResponse } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const supabase = createServerSupabaseClient({ req, res });
	// supabase.auth.setSession;

	// console.log(req.body);

	// Enroll Admin User
	const { data } = await axios.post('http://localhost:8801/user/enroll', {
		id: 'admin',
		secret: 'adminpw',
	});
	const { token } = data;

	const query = {};
	if (token) {
		const { data } = await axios.post(
			'http://localhost:8801/user/enroll',
			{ id: req.body.patientID, secret: req.body.email },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log('usr tkn');
		console.log(data.token);
		if (data.token) res.status(200).send(data.token);
	}
}
