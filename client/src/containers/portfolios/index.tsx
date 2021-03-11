import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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

export default function PortfoliosContainer() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = async (index: number) => {
    setTabIndex(index);
  };
  const {
    isOpen: isCreatePortfolioModalOpen,
    onOpen: onCreatePortfolioModalOpen,
    onClose: onCreatePortfolioClose,
  } = useDisclosure();
  const {
    loading: loadingPorfolios,
    error: errorPortolios,
    data: { portfolios } = {},
    refetch: refetchPortfolios,
  } = useQuery<FetchPortfolios>(fetchPortfoliosQuery);
  return (
    <>
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
        </Tabs>
      </Flex>
    </>
  );
}
