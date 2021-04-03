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
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import fetchWatchlistsQuery from 'queries/fetchWatchlists';
import getWatchlistQuery from 'queries/getWatchlist';
import { FetchWatchlists } from 'queries/types/FetchWatchlists';
import { GetWatchList } from 'queries/types/GetWatchList';
import createWatchlistMutation from 'mutations/createWatchlist';
import { CreateWatchlist } from 'mutations/types/CreateWatchlist';
import removeShareFromWatchlistMutation from 'mutations/removeShareFromWatchlist';
import { RemoveShareFromWatchlist } from 'mutations/types/RemoveShareFromWatchlist';
import addShareToWatchlistMutation from 'mutations/addShareToWatchlist';
import { AddShareToWatchlist } from 'mutations/types/AddShareToWatchlist';
import { UpdateWatchlistHiddenColumns } from 'mutations/types/UpdateWatchlistHiddenColumns';
import updateHiddenWatchlistColumnsMutation from 'mutations/updateWatchlistHiddenColumns';
import AddListModal from 'components/AddListModal';
import AddSymbolModal from './components/AddSymbolModal';
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
    isOpen: isAddSymbolModalOpen,
    onOpen: onAddSymbolModalOpen,
    onClose: onAddSymbolModalClose,
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
    pollInterval: 15 * 60 * 1000,
  });
  const [
    createWatchlist,
    { loading: loadingCreateWatchlist, error: errorCreateWatchlist },
  ] = useMutation<CreateWatchlist>(createWatchlistMutation, {
    async onCompleted() {
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
    async onCompleted() {
      onAddSymbolModalClose();
      await refetchWatchlist();
    },
  });
  const [
    removeShareFromWatchlist,
    { loading: loadingRemoveShare, error: errorRemoveShare },
  ] = useMutation<RemoveShareFromWatchlist>(removeShareFromWatchlistMutation, {
    async onCompleted() {
      await refetchWatchlist();
    },
  });
  const [
    updateWatchlistHiddenColumns,
  ] = useMutation<UpdateWatchlistHiddenColumns>(
    updateHiddenWatchlistColumnsMutation,
    {}
  );

  const handleTabsChange = async (index: number) => {
    setTabIndex(index);
  };

  useEffect(() => {
    if (!watchlists?.length) return;
    getWatchlist();
  }, [watchlists?.length]);

  return (
    <>
      {(errorWatchlist ||
        errorWatchlists ||
        errorCreateWatchlist ||
        errorAddShareToWatchlist ||
        errorRemoveShare) && (
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
            There are no any watchlists yet. Create the first one!
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
              + Create watchlist
            </Button>
          </TabList>
          {Boolean(watchlists?.length) && (
            <TabPanels mt="8">
              {watchlists.map(w => (
                <TabPanel key={w.id} p={0}>
                  <Flex justify="space-between">
                    <Box>
                      <Heading size="md">{watchlists[tabIndex].name}</Heading>
                      <Text color="gray.500" mt={2}>
                        Items: {watchlistData?.watchlist.shares.length}
                      </Text>
                    </Box>

                    <Button
                      colorScheme="blue"
                      disabled={loadingWatchlists}
                      onClick={onAddSymbolModalOpen}
                      variant="outline"
                      ml="4"
                    >
                      + Add symbol
                    </Button>
                  </Flex>
                  {watchlistData?.watchlist.shares.length === 0 && (
                    <Heading size="md" color="gray.500" mt={8} align="center">
                      There are no any shares in the watchlist yet.
                    </Heading>
                  )}
                  {loadingWatchlist && (
                    <Stack mt={8}>
                      {[1, 2, 3, 4, 5].map(i => (
                        <Skeleton
                          h="10"
                          key={i}
                          endColor="gray.700"
                          startColor="gray.600"
                        />
                      ))}
                    </Stack>
                  )}
                  {Boolean(watchlistData?.watchlist.shares.length) && (
                    <Box mt={8}>
                      <SharesTable
                        shares={watchlistData.watchlist.shares}
                        hiddenColumns={watchlistData.watchlist.hiddenColumns}
                        onRemove={(shareId: number) =>
                          removeShareFromWatchlist({
                            variables: {
                              shareId,
                              watchlistId: w.id,
                            },
                          })
                        }
                        isRemoving={loadingRemoveShare}
                        updateHiddenColumns={columns =>
                          updateWatchlistHiddenColumns({
                            variables: { watchlistId: w.id, columns },
                          })
                        }
                      />
                    </Box>
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          )}
        </Tabs>
      </Flex>
      <AddListModal
        newListInputValue={newWatchlistInputValue}
        setNewListInputValue={setNewWatchlistInputValue}
        isOpen={isWatchlistModalOpen}
        isLoading={loadingCreateWatchlist}
        onClose={onWatchlistModalClose}
        onCreate={(name: string) => createWatchlist({ variables: { name } })}
        title="New watchlist"
      />
      <AddSymbolModal
        isLoading={loadingAddShareToWatchlist}
        isOpen={isAddSymbolModalOpen}
        onClose={onAddSymbolModalClose}
        onAdd={data =>
          addShareToWatchlist({
            variables: { ...data, watchlistId: watchlistData.watchlist.id },
          })
        }
      />
    </>
  );
}
