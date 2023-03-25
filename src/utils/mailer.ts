import Email from 'email-templates';
import path from 'path';

export class EmailConsumerService {
	mailer = new Email({
		message: {
			from: process.env.SUPPORT_EMAIL,
		},
		send: true,
		transport: {
			host: process.env.EMAIL_HOST,
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_SERVER_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		},
	});

	async sendMailtoDoctor({ noteID, email }: { noteID: string; email: string }) {
		if (!noteID || !email) return;

		try {
			const response = await this.mailer.send({
				template: path.join(process.cwd(), 'email', 'note'),
				message: {
					subject: 'FastHealth - Emergency! Patient en route.',
					to: `${email}`,
				},
				locals: {
					noteId: `${noteID}`,
				},
			});
			console.log(response);
		} catch (err) {
			console.log(err);
		}

		return {};
	}
}
