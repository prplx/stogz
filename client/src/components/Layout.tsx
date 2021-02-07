import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Flex, Heading, Divider, Box } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { FaBriefcase, FaUser, FaBinoculars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const { pathname, push } = useRouter();
  // const { logout } = useAuth0();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex h="100vh">
        <Flex
          w="70px"
          direction="column"
          align="center"
          justify="space-between"
          as="nav"
          background="gray.800"
          py="4"
        >
          <Box align="center">
            <IconButton
              icon={<FaBinoculars />}
              aria-label="Watchlists"
              colorScheme="blue"
              variant="outline"
              isActive={pathname === '/watchlists'}
              onClick={() => push('/watchlists')}
            />
            <IconButton
              icon={<FaBriefcase />}
              aria-label="Portfolios"
              colorScheme="blue"
              variant="outline"
              isActive={pathname === '/portfolios'}
              onClick={() => push('/portfolios')}
              mt={4}
            />
          </Box>
          <Box align="center">
            <IconButton
              icon={<FaUser />}
              aria-label="Profile"
              colorScheme="blue"
              variant="outline"
              onClick={() => push('/profile')}
            />
            <IconButton
              icon={<FiLogOut />}
              aria-label="Log out"
              colorScheme="blue"
              variant="outline"
              isActive={pathname === '/profile'}
              mt={4}
              as="a"
              href="/api/logout"
            />
          </Box>
        </Flex>
        <Flex as="main" flex={1} direction="column">
          <Flex as="header" p={4} pb={2} direction="column">
            <Heading as="h1" size="lg">
              {title}
            </Heading>
          </Flex>
          <Divider borderColor="gray.600" />
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
