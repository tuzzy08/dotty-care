import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next';
import { Button, Container, Group } from "@mantine/core";
import { PageProps } from '../types';
import { Layout } from '../../../layouts'
import ProfileCard from '../../../layouts/components/ProfileCard';
import HospitalList from '../../../layouts/components/HospitalList';
import { data } from '../../../layouts/components/mock/hospitals';

IndexPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'patient'}>{page}</Layout>
}


export default function IndexPage({ user }: PageProps) {
  return (
    <Container size="xl" py="xl">
      <Group spacing={50}>
        <ProfileCard avatar={``} mobile={user.user_metadata.mobile} name={user.user_metadata.name} email={`${user.email}`} />
        <HospitalList data={data} />
      </Group>      
    </Container>
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