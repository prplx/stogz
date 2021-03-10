import { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Flex, Button } from '@chakra-ui/react';
import Layout from '../components/Layout';
import User from 'types/user';

type Props = {
  user: User;
};

const PortfoliosPage: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Portfolios" user={user}>
      <Flex p={4}>
        <Button colorScheme="blue">+ Create new portfolio</Button>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps = withPageAuthRequired();

export default PortfoliosPage;
