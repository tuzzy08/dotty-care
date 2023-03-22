import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Button, Group } from "@mantine/core";
import { GetServerSidePropsContext } from 'next';
import {Layout} from '../../../layouts'

PatientsPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'hospital'}>{page}</Layout>
}

export default function PatientsPage() {
  return (
    // <Group mt={50} position="apart">
      <Button size="xl">Patients</Button>
      // <Logout />
    // </Group>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session || session.user.user_metadata.accountType !== 'Hospital')
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