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

	const { token: adminToken } = data;
	const { accountType } = req.body;

	if (adminToken) {
		await axios
			.post(
				'http://localhost:8801/user/register',
				{ id: req.body.id, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${adminToken}`,
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
							Authorization: `Bearer ${adminToken}`,
						},
					}
				);
				return data.token;
			})
			.then(async (token) => {
				if (accountType === 'Patient') {
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
				}

				console.log('token before return');
				console.log(token);
				res.status(200).send(token);
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
