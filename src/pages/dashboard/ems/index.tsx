import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Button, Group, Text } from '@mantine/core';
// import { RichTextEditor } from '@mantine/rte';
import { GetServerSidePropsContext } from 'next';
import { Layout } from '../../../layouts';

NewEventPage.getLayout = function getLayout(page: any) {
	return <Layout variant={'ems'}>{page}</Layout>;
};

export default function NewEventPage() {
	// dynamic import
	const Rte = useMemo(
		() =>
			dynamic(
				() => import('@mantine/rte').then((RichTextEditor) => RichTextEditor),
				{ ssr: false }
			),
		[]
	);
	const initialValue = '<p>Create a new  <b>note</b>.</p>';
	const [value, onChange] = useState(initialValue);

	return (
		<>
			<Text
				component='span'
				align='center'
				variant='gradient'
				gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
				size='xl'
				weight={700}
				style={{ fontFamily: 'Greycliff CF, sans-serif' }}
			>
				Create New Event
			</Text>
			<Rte value={value} onChange={onChange} />
		</>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// Create authenticated Supabase Client
	const supabase = createServerSupabaseClient(ctx);
	// Check if we have a session
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session || session.user.user_metadata.accountType !== 'Ems')
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};

	return {
		props: {
			initialSession: session,
			user: session.user,
		},
	};
};
