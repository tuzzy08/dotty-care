import { useState } from 'react';
import { Box } from '@mantine/core';
import LoginForm from './dashboard/components/LoginForm';
import SignupForm from './dashboard/components/SignupForm';

export default function Index() {
	const [visibleForm, setVisibleForm] = useState<string>('login');
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
			{visibleForm === 'login' ? (
				<LoginForm setVisibleForm={setVisibleForm} />
			) : (
				<SignupForm setVisibleForm={setVisibleForm} />
			)}
		</Box>
	);
}
