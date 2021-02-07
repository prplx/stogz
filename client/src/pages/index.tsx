import { NextPage, GetServerSidePropsContext } from 'next';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { redirect } from '../helpers';
import auth0 from '../utils/auth0';

const IndexPage: NextPage = () => {
  return (
    <Flex p={8} direction="column" align="center" justify="center" h="100vh">
      <Heading size="3xl">Welcome to Stogz!</Heading>
      <Button colorScheme="blue" as="a" href="/api/login" mt={6}>
        Log in
      </Button>
    </Flex>
  );
};

export default IndexPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await auth0.getSession(ctx.req);
  if (session?.user) redirect('/watchlists', ctx);
  return { props: {} };
};
