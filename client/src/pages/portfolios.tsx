import { Flex, Button } from '@chakra-ui/react';
import Layout from '../components/Layout';

const PortfoliosPage = () => {
  return (
    <Layout title="Portfolios">
      <Flex p={4}>
        <Button colorScheme="blue">+ Create new portfolio</Button>
      </Flex>
    </Layout>
  );
};

export default PortfoliosPage;
