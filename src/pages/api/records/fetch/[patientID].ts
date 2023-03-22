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
		const { patientID } = req.query;
		const { hospitalID } = req.body;
		if (patientID && token) {
			const { data } = await axios.post(
				'http://localhost:8801/query/fasthealth-1/fasthealth',
				{
					method: 'FHContract:getRecordsForPatient',
					args: [patientID, hospitalID],
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log('Data');
			console.log(data.response);
			if (data.response.status === 'denied') {
				res.status(200).send(data.response.status);
			}
			res.status(200).send(data.response);
		}
		// }
	}
}
