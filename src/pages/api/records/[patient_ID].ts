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
		const { patient_ID } = req.query;
		const { token } = req.body;
		if (patient_ID && token) {
			const { data } = await axios.post(
				'http://localhost:8801/query/fasthealth-1/fasthealth',
				{
					method: 'FHContract:QueryRecordsByPatient',
					args: [patient_ID],
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(data.response);
			res.status(200).send(data.response);
		}
		// }
	}
}
