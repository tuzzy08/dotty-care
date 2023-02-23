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
		const { data } = await axios.post(
			'http://localhost:8801/invoke/fasthealth-1/fasthealth',
			{
				method: 'FHContract:getAllHopitals',
				args: [],
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
}
