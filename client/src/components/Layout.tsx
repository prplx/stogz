import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Flex,
  Heading,
  Divider,
  Box,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Tooltip,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { FaBriefcase, FaUser, FaBinoculars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { SiScribd } from 'react-icons/si';
import { CgMenuGridO } from 'react-icons/cg';
import User from 'types/user';

type Props = {
  children?: ReactNode;
  title?: string;
  user?: User;
};

const Layout = ({
  children,
  title = 'This is the default title',
  user,
}: Props) => {
  const { pathname, push } = useRouter();

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
          py="1.2rem"
          display={{ sm: 'none', md: 'flex' }}
        >
          <Box>
            <Icon as={SiScribd} w={6} h={6} mt={3} />
          </Box>
          <Box align="center" mb="auto" mt={10}>
            <Tooltip label="Watchlists" aria-label="Watchlists tooltip">
              <IconButton
                icon={<FaBinoculars size={20} />}
                aria-label="Watchlists"
                colorScheme="blue"
                variant="ghost"
                isActive={pathname === '/watchlists'}
                onClick={() => push('/watchlists')}
              />
            </Tooltip>
            <Tooltip label="Portfolios" aria-label="Portfolios label">
              <IconButton
                icon={<FaBriefcase size={20} />}
                aria-label="Portfolios"
                colorScheme="blue"
                variant="ghost"
                isActive={pathname === '/portfolios'}
                onClick={() => push('/portfolios')}
                mt={4}
              />
            </Tooltip>
          </Box>
          <Box align="center">
            <Menu>
              <MenuButton>
                <Avatar w={10} h={10} name={user?.name} src={user?.picture} />
              </MenuButton>
              <MenuList>
                <MenuItem icon={<FaUser />} onClick={() => push('/profile')}>
                  Profile
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut />}
                  onClick={() => push('/api/auth/logout')}
                >
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <Flex as="main" flex={1} direction="column">
          <Flex
            as="header"
            p={6}
            pb={3}
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            <Flex display={{ sm: 'flex', md: 'none' }}>
              <IconButton
                aria-label="Menu"
                colorScheme="white"
                variant="ghost"
                icon={<CgMenuGridO size={30} />}
              />
            </Flex>
          </Flex>
          <Divider borderColor="gray.600" />
          {children}
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
