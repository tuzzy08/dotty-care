import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Button, Group, Text } from "@mantine/core";
import { RichTextEditor } from '@mantine/rte';
import { GetServerSidePropsContext } from 'next';
import {Layout} from '../../../../layouts'

NewEventPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'ems'}>{page}</Layout>
}

export default function NewEventPage() {
  return (
    <>
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        size="xl"
        weight={700}
        style={{ fontFamily: 'Greycliff CF, sans-serif' }}
      >
        Create New Event
      </Text>
      <RichTextEditor />
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || session.user.user_metadata.accountType !== 'Ems')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}