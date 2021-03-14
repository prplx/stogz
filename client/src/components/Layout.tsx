import React, { ReactNode, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
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
  IconButton,
  Link,
  List,
  ListItem,
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

const menuLinks = [
  { title: 'Watchlists', href: '/watchlists' },
  { title: 'Portfolios', href: '/portfolios' },
];

const Layout = ({
  children,
  title = 'This is the default title',
  user,
}: Props) => {
  const { pathname, push } = useRouter();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const renderProfileMenu = useCallback(
    () => (
      <Menu>
        <MenuButton>
          <Avatar
            w={{ sm: '4rem', md: '2.5rem' }}
            h={{ sm: '4rem', md: '2.5rem' }}
            name={user?.name}
            src={user?.picture}
          />
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
    ),
    []
  );
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
          <Box mt={3}>
            <NextLink href="/" passHref>
              <Link>
                <Icon as={SiScribd} w={6} h={6} />
              </Link>
            </NextLink>
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
          <Box align="center">{renderProfileMenu()}</Box>
        </Flex>
        <Flex as="main" flex={1} direction="column">
          <Flex
            as="header"
            p={{ sm: 3, md: 6 }}
            pb={{ sm: 3, md: 3 }}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              '[aria-label="menu-open"]': { background: 'rgba(0, 0, 0, 0.12)' },
            }}
          >
            <Box display={{ sm: 'block', md: 'none' }}>
              <NextLink href="/" passHref>
                <Link>
                  <Icon as={SiScribd} w={6} h={6} />
                </Link>
              </NextLink>
            </Box>
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            <Flex display={{ sm: 'flex', md: 'none' }}>
              <IconButton
                aria-label={mobileMenuIsOpen ? 'menu-open' : 'menu'}
                colorScheme="white"
                variant="ghost"
                icon={<CgMenuGridO size={30} />}
                onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
              />
            </Flex>
          </Flex>
          <Divider borderColor="gray.600" />
          <Flex flex={1} position="relative" direction="column">
            {mobileMenuIsOpen && (
              <Flex
                direction="column"
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                background="gray.800"
                zIndex={2}
                display={{ sm: 'flex', md: 'none' }}
              >
                <List
                  w="100%"
                  sx={{
                    '[aria-label="active-menu-item"]': {
                      background: '#bee3f8',
                      color: '#2c5282',
                    },
                  }}
                >
                  {menuLinks.map(l => (
                    <ListItem key={l.title}>
                      <NextLink passHref href={l.href}>
                        <Link
                          w="100%"
                          d="block"
                          p={6}
                          borderBottom="1px solid #4A5568"
                          textAlign="center"
                          fontWeight={600}
                          aria-label={
                            pathname === l.href
                              ? 'active-menu-item'
                              : 'menu-item'
                          }
                          sx={{
                            _hover: {
                              background: '#bee3f8',
                              color: '#2c5282',
                            },
                          }}
                        >
                          {l.title}
                        </Link>
                      </NextLink>
                    </ListItem>
                  ))}
                </List>
                <Box align="center" mt="auto" mb={8}>
                  {renderProfileMenu()}
                </Box>
              </Flex>
            )}
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Layout;
