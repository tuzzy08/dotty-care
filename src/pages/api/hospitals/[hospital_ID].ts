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

		const query = {};
		if (adminToken) {
			const { data } = await axios.post(
				'http://localhost:8801/user/enroll',
				{ id: req.body.patientID, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
					},
				}
			);
			// console.log('usr tkn');
			// console.log(data);
			// if (data.token) res.status(200).send(data.token);
			const { hospital_ID } = req.query;
			const userToken = data.token;
			if (hospital_ID) {
				const { data } = await axios.post(
					'http://localhost:8801/query/fasthealth-1/fasthealth',
					{
						method: 'FHContract:getHospital',
						args: [`${hospital_ID}`],
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
}
