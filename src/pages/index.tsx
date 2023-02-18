import { Box } from '@mantine/core';
import AuthForm from './dashboard/components/AuthForm';

export default function Index() {
	return (
		<Box
			sx={(theme) => ({
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '100vh',
				backgroundSize: 'cover',
				backgroundImage:
					'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
			})}
		>
			<AuthForm />
		</Box>
	);
}
