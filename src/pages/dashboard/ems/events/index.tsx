import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Button, Group } from "@mantine/core";
import { GetServerSidePropsContext } from 'next';
import {Layout} from '../../../../layouts'

EventsPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'ems'}>{page}</Layout>
}

export default function EventsPage() {
  return (
      <Button size="xl">Events</Button>
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