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
				{ id: req.body.patientID, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
					},
				}
			);

			// if (data.token) res.status(200).send(data.token);
			const { hospital_ID } = req.query;
			const { patientID } = req.body;
			const userToken = data.token;

			if (hospital_ID) {
				const method =
					req.body.accessType === 'suspend'
						? 'FHContract:suspendAccess'
						: 'FHContract:grantAccess';
				const { data } = await axios.post(
					'http://localhost:8801/invoke/fasthealth-1/fasthealth',
					{
						method: method,
						args: [`${patientID}`, `${hospital_ID}`],
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
