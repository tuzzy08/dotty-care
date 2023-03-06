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
		const { data: response } = await axios.post(
			'http://localhost:8801/user/enroll',
			{
				id: 'admin',
				secret: 'adminpw',
			}
		);

		console.log('admin token');
		console.log(response.token);

		if (response.token) {
			const { data } = await axios.post(
				'http://localhost:8801/user/enroll',
				{ id: req.body.id, secret: req.body.email },
				{
					headers: {
						Authorization: `Bearer ${response.token}`,
					},
				}
			);
			const { id } = req.body;
			const userToken = data.token;
			if (id) {
				const noteData = {
					noteID: req.body.noteID,
					patientID: req.body.patient_ID,
					patientName: req.body.patientName,
					paramedicID: req.body.id,
					paramedicName: req.body.paramedicName,
					paramedicNote: req.body.paramedicNote,
				};
				const { data } = await axios.post(
					'http://localhost:8801/invoke/fasthealth-1/fasthealth',
					{
						method: 'FHContract:createParamedicNote',
						args: [JSON.stringify(noteData)],
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
