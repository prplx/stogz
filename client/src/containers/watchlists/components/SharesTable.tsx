import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { GetWatchList_watchlist } from '../../../queries/types/GetWatchList';

type Props = {
  shares: GetWatchList_watchlist['shares'];
};

export default function SharesTable({ shares }: Props) {
  return (
    <Table variant="simple" colorScheme="blue">
      <Thead>
        <Tr>
          <Th pl={0}>Symbol</Th>
          <Th pl={0}>Name</Th>
          <Th pl={0}>Currency</Th>
          <Th pl={0}>Region</Th>
        </Tr>
      </Thead>
      <Tbody>
        {shares.map(s => (
          <Tr key={s.id}>
            <Td pl={0}>{s.symbol}</Td>
            <Td pl={0}>{s.name}</Td>
            <Td pl={0}>{s.currency}</Td>
            <Td pl={0}>{s.region}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
