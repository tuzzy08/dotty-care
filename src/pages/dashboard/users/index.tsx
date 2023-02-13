import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Button, Group } from "@mantine/core";
import { GetServerSidePropsContext } from 'next';
import {Layout} from '../../../layouts'

IndexPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'patient'}>{page}</Layout>
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

  console.log('user session')
  console.log(session)

  if (!session || session.user.user_metadata.accountType !== 'Patient')
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