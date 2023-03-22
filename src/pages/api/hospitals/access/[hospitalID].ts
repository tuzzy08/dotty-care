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
		const { data } = await axios.post('http://localhost:8801/user/enroll', {
			id: 'admin',
			secret: 'adminpw',
		});

		const adminToken = data.token;

		if (adminToken) {
			const { data } = await axios.post(
				'http://localhost:8801/user/enroll',
				{ id: req.body.id, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
					},
				}
			);

			// if (data.token) res.status(200).send(data.token);
			const { hospitalID } = req.query;
			const { id } = req.body;
			const userToken = data.token;

			if (hospitalID) {
				const method =
					req.body.accessType === 'suspend'
						? 'FHContract:suspendAccess'
						: 'FHContract:grantAccess';
				const { data } = await axios.post(
					'http://localhost:8801/invoke/fasthealth-1/fasthealth',
					{
						method: method,
						args: [`${id}`, `${hospitalID}`],
					},
					{
						headers: {
							Authorization: `Bearer ${userToken}`,
						},
					}
				);
				res.status(200).send(data);
			}
		}
	}
}
