// import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Button, Group } from "@mantine/core";
// import {Logout} from '../components';

import {Layout} from '../../../layouts'

RecordsPage.getLayout = function getLayout(page: any) {
  return <Layout variant={'user'}>{page}</Layout>
}

export default function RecordsPage() {
  return (
    // <Group mt={50} position="apart">
      <Button size="xl">Records</Button>
      // <Logout />
    // </Group>
  );
}

// IndexPage.requireAuth = true;
// export const getServerSideProps = withPageAuthRequired()