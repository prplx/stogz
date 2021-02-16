import { NextPage, GetServerSidePropsContext } from 'next';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from '../helpers';

const IndexPage: NextPage = () => {
  return (
    <Flex p={8} direction="column" align="center" justify="center" h="100vh">
      <Heading size="3xl">Welcome to Stogz!</Heading>
      <Button colorScheme="blue" as="a" href="/api/auth/login" mt={6}>
        Log in
      </Button>
    </Flex>
  );
};

export default IndexPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = getSession(ctx.req, ctx.res);
  if (session?.user) redirect('/watchlists', ctx);
  return { props: {} };
};
