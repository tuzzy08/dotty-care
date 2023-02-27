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
	const { data } = await axios.post(
		'http://localhost:8801/user/enroll',
		{
			id: 'admin',
			secret: 'adminpw',
		}
		// {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// }
	);

	const { token } = data;

	const query = {};
	if (token) {
		await axios
			.post(
				'http://localhost:8801/user/register',
				{ id: req.body.id, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(async (response) => {
				// console.log(response);
				const { data } = await axios.post(
					'http://localhost:8801/user/enroll',
					{ id: req.body.id, secret: req.body.email },
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				return data.token;
			})
			.then(async (token) => {
				const { data } = await axios.post(
					'http://localhost:8801/invoke/fasthealth-1/fasthealth',
					{
						method: 'FHContract:createPatient',
						args: [`${req.body.id}`, `${req.body.fullname}`],
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log('token before return');
				console.log(token);
				res.status(200).send(token);
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
