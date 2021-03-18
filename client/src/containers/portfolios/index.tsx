import { useState } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
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
import { CreatePortfolio } from 'mutations/types/CreatePortfolio';
import createPorfolioMutation from 'mutations/createPortfolio';
import { FetchPortfolios } from 'queries/types/FetchPortfolios';
import fetchPortfoliosQuery from 'queries/fetchPortfolios';
import { GetPortfolio } from 'queries/types/GetPortfolio';
import getPortfolioQuery from 'queries/getPortfolio';
import AddListModal from 'components/AddListModal';
import AddDealModal from './components/AddDealModal';

export default function PortfoliosContainer() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = async (index: number) => {
    setTabIndex(index);
  };
  const [newPortfolioInputValue, setNewPortfolioInputValue] = useState('');
  const {
    isOpen: isCreatePortfolioModalOpen,
    onOpen: onCreatePortfolioModalOpen,
    onClose: onCreatePortfolioClose,
  } = useDisclosure();
  const {
    isOpen: isAddDealModalOpen,
    onOpen: onAddDealModalOpen,
    onClose: onAddDealClose,
  } = useDisclosure();
  const {
    loading: loadingPorfolios,
    error: errorPortolios,
    data: { portfolios } = {},
    refetch: refetchPortfolios,
  } = useQuery<FetchPortfolios>(fetchPortfoliosQuery);
  const [
    createPortfolio,
    { loading: loadingCreatePortfolio, error: errorCreatePortfolio },
  ] = useMutation<CreatePortfolio>(createPorfolioMutation, {
    async onCompleted() {
      onCreatePortfolioClose();
      setNewPortfolioInputValue('');
      await refetchPortfolios();
      setTabIndex(portfolios.length);
    },
  });
  const [
    getPortfolio,
    {
      loading: loadingPortfolio,
      error: errorPortfolio,
      data: portfolioData,
      refetch: refetchPortfolio,
    },
  ] = useLazyQuery<GetPortfolio>(getPortfolioQuery, {
    variables: { id: portfolios && portfolios[tabIndex]?.id },
    pollInterval: 15 * 60 * 1000,
  });
  return (
    <>
      {errorPortolios && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>An error occured while getting data.</AlertTitle>
          <AlertDescription>Try reload the page</AlertDescription>
        </Alert>
      )}
      <Flex
        p={[4, 4, 6]}
        wrap="wrap"
        align={portfolios?.length ? 'flex-start' : 'center'}
      >
        {loadingPorfolios && <Spinner color="white" />}
        {portfolios && portfolios.length === 0 && (
          <Heading size="md" color="gray.500">
            There are no any portfolios yet. Create the first one!
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
            {portfolios && portfolios.map(p => <Tab key={p.id}>{p.name}</Tab>)}
            <Button
              colorScheme="blue"
              disabled={loadingPorfolios}
              onClick={onCreatePortfolioModalOpen}
              mt={[4, 4, 0]}
              variant="ghost"
              ml="4"
            >
              + Create portfolio
            </Button>
          </TabList>
          {Boolean(portfolios?.length) && (
            <TabPanels mt="8">
              {portfolios.map(p => (
                <TabPanel key={p.id} p={0}>
                  <Flex justify="space-between">
                    <Box>
                      <Heading size="md">{portfolios[tabIndex].name}</Heading>
                      <Text color="gray.500" mt={2}>
                        {/* Items: {portfolioData?.portfolio.length} */}
                      </Text>
                    </Box>

                    <Button
                      colorScheme="blue"
                      disabled={loadingPorfolios}
                      onClick={onAddDealModalOpen}
                      variant="outline"
                      ml="4"
                    >
                      + Add deal
                    </Button>
                  </Flex>
                </TabPanel>
              ))}
            </TabPanels>
          )}
        </Tabs>
        <AddListModal
          newListInputValue={newPortfolioInputValue}
          setNewListInputValue={setNewPortfolioInputValue}
          isOpen={isCreatePortfolioModalOpen}
          isLoading={loadingCreatePortfolio}
          onClose={onCreatePortfolioClose}
          onCreate={(name: string) => createPortfolio({ variables: { name } })}
          title="New portfolio"
        />
        <AddDealModal
          isOpen={isAddDealModalOpen}
          onClose={onAddDealClose}
          isLoading={false}
          onAdd={data => console.log(data)}
        />
      </Flex>
    </>
  );
}
