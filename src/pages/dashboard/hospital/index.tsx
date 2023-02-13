import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Button, Group } from "@mantine/core";
import { GetServerSidePropsContext } from 'next';
import {Layout} from '../../../layouts'

IndexPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'hospitals'}>{page}</Layout>
}

export default function IndexPage() {
  return (
      <Button size="xl">Home</Button>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
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