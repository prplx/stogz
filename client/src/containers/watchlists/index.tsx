import { useState, useEffect } from 'react';
import {
  Spinner,
  Heading,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
  Text,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import Layout from '../../components/Layout';
import fetchWatchlistsQuery from '../../queries/fetchWatchlists';
import getWatchlistQuery from '../../queries/getWatchlist';
import { FetchWatchlists } from '../../queries/types/FetchWatchlists';
import { GetWatchList } from '../../queries/types/GetWatchList';
import createWatchlistMutation from '../../mutations/createWatchlist';
import { CreateWatchlist } from '../../mutations/types/CreateWatchlist';
import addShareToWatchlistMutation from '../../mutations/addShareToWatchlist';
import { AddShareToWatchlist } from '../../mutations/types/AddShareToWatchlist';
import AddWatchlistModal from './components/AddWatchlistModal';
import AddShareModal from './components/AddShareModal';
import SharesTable from './components/SharesTable';

export default function WatchlistsContainer() {
  const [newWatchlistInputValue, setNewWatchlistInputValue] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const {
    isOpen: isWatchlistModalOpen,
    onOpen: onWatchlistModalOpen,
    onClose: onWatchlistModalClose,
  } = useDisclosure();
  const {
    isOpen: isShareModalOpen,
    onOpen: onShareModalOpen,
    onClose: onShareModalClose,
  } = useDisclosure();
  const {
    loading: loadingWatchlists,
    error: errorWatchlists,
    data: { watchlists } = {},
    refetch: refetchWatchlists,
  } = useQuery<FetchWatchlists>(fetchWatchlistsQuery);
  const [
    getWatchlist,
    {
      loading: loadingWatchlist,
      error: errorWatchlist,
      data: watchlistData,
      refetch: refetchWatchlist,
    },
  ] = useLazyQuery<GetWatchList>(getWatchlistQuery, {
    variables: { id: watchlists && watchlists[tabIndex]?.id },
  });
  const [
    createWatchlist,
    { loading: loadingCreateWatchlist, error: errorCreateWatchlist },
  ] = useMutation<CreateWatchlist>(createWatchlistMutation, {
    async update() {
      onWatchlistModalClose();
      setNewWatchlistInputValue('');
      await refetchWatchlists();
      setTabIndex(watchlists.length);
    },
  });
  const [
    addShareToWatchlist,
    { loading: loadingAddShareToWatchlist, error: errorAddShareToWatchlist },
  ] = useMutation<AddShareToWatchlist>(addShareToWatchlistMutation, {
    async update() {
      await refetchWatchlist();
      onShareModalClose();
    },
  });

  const handleTabsChange = async (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (!watchlists?.length) return;
    (async () => {
      getWatchlist();
    })();
  }, [watchlists?.length]);

  return (
    <Layout title="Watchlists">
      {(errorWatchlist || errorWatchlists || errorCreateWatchlist) && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>An error occured while getting data.</AlertTitle>
          <AlertDescription>Try reload the page</AlertDescription>
        </Alert>
      )}
      <Flex
        p={[4, 4, 6]}
        wrap="wrap"
        align={watchlists?.length ? 'flex-start' : 'center'}
      >
        {loadingWatchlists && <Spinner color="white" />}
        {watchlists && watchlists.length === 0 && (
          <Heading size="md" color="gray.500">
            There are no any watchlists yet. Create one!
          </Heading>
        )}
        <Tabs
          variant="soft-rounded"
          colorScheme="blue"
          flex="1"
          isLazy
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList>
            {watchlists && watchlists.map(w => <Tab key={w.id}>{w.name}</Tab>)}
            <Button
              colorScheme="blue"
              disabled={loadingWatchlists}
              onClick={onWatchlistModalOpen}
              mt={[4, 4, 0]}
              variant="ghost"
              ml="4"
            >
              + Create new watchlist
            </Button>
          </TabList>
          {Boolean(watchlists?.length) && (
            <TabPanels mt="8">
              {watchlists.map(w => (
                <TabPanel key={w.id} p={0}>
                  <Flex justify="space-between">
                    <Box>
                      <Heading size="md">
                        {watchlistData?.watchlist.name}
                      </Heading>
                      <Text color="gray.500" mt={2}>
                        Items: {watchlistData?.watchlist.shares.length}
                      </Text>
                    </Box>

                    <Button
                      colorScheme="blue"
                      disabled={loadingWatchlists}
                      onClick={onShareModalOpen}
                      variant="outline"
                      ml="4"
                    >
                      + Add symbols
                    </Button>
                  </Flex>
                  {watchlistData?.watchlist.shares.length === 0 && (
                    <Heading size="md" color="gray.500" mt={8} align="center">
                      There are no any shares in the watchlist yet.
                    </Heading>
                  )}
                  {Boolean(watchlistData?.watchlist.shares.length) && (
                    <Box mt={8}>
                      <SharesTable shares={watchlistData.watchlist.shares} />
                    </Box>
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          )}
        </Tabs>
      </Flex>
      <AddWatchlistModal
        newWatchlistInputValue={newWatchlistInputValue}
        setNewWatchlistInputValue={setNewWatchlistInputValue}
        isOpen={isWatchlistModalOpen}
        isLoading={loadingCreateWatchlist}
        onClose={onWatchlistModalClose}
        onCreate={createWatchlist}
      />
      <AddShareModal
        isLoading={loadingAddShareToWatchlist}
        isOpen={isShareModalOpen}
        onClose={onShareModalClose}
        onAdd={data =>
          addShareToWatchlist({
            variables: { ...data, watchlistId: watchlistData.watchlist.id },
          })
        }
      />
    </Layout>
  );
}
