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
		const { token } = req.body;
		if (token) {
			const record = {
				recordID: req.body.recordID,
				patientID: req.body.patient_ID,
				hospitalName: req.body.hospitalName,
				hospitalID: req.body.id,
				doctorName: req.body.doctorName,
				doctorNote: req.body.doctorNote,
			};
			console.log(record);
			const { data } = await axios.post(
				'http://localhost:8801/invoke/fasthealth-1/fasthealth',
				{
					method: 'FHContract:createRecord',
					args: [JSON.stringify(record)],
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(data);
			res.status(200).send(data);
		}
		// }
	}
}
