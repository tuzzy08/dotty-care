import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Enroll Admin User
	const { data } = await axios.post('http://localhost:8801/user/enroll', {
		id: 'admin',
		secret: 'adminpw',
	});
	const { token } = data;

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
		// console.log('usr tkn');
		// console.log(data.token);
		if (data.token) res.status(200).send(data.token);
	}
}
