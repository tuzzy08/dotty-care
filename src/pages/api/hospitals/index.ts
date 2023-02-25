// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type Data = {
	name: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'POST') {
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

		const adminToken = data.token;

		console.log('admin token');
		console.log(adminToken);

		if (adminToken) {
			const {
				data: { token: userToken },
			} = await axios.post(
				'http://localhost:8801/user/enroll',
				{ id: req.body.patientID, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
					},
				}
			);

			const query = {};
			// const { token } = req.body;
			const { data } = await axios.post(
				'http://localhost:8801/invoke/fasthealth-1/fasthealth',
				{
					method: 'FHContract:getAllHospitals',
					args: [],
				},
				{
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				}
			);
			console.log(data);
			res.status(200).send(data);
		}
	}
}
