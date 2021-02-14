import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, Link, Badge } from '@chakra-ui/react';
import { GetWatchList_watchlist } from 'queries/types/GetWatchList';

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
          <Th pl={0}>Price</Th>
          <Th pl={0}>Change</Th>
          <Th pl={0}>Change %</Th>
          <Th pl={0}>Volume</Th>
        </Tr>
      </Thead>
      <Tbody>
        {shares.map(s => (
          <Tr key={s.symbol}>
            <Td pl={0}>
              <NextLink href={`/shares/${s.symbol}`} passHref>
                <Link color="blue.400">{s.symbol}</Link>
              </NextLink>
            </Td>
            <Td pl={0}>
              {' '}
              <NextLink href={`/shares/${s.symbol}`} passHref>
                <Link color="blue.400">{s.companyName}</Link>
              </NextLink>
            </Td>
            <Td pl={0}>{s.latestPrice}</Td>
            <Td pl={0}>
              <Badge colorScheme={s.change < 0 ? 'red' : 'green'}>
                {s.change}
              </Badge>
            </Td>
            <Td pl={0}>
              <Badge colorScheme={s.change < 0 ? 'red' : 'green'}>
                {s.changePercent * 100}
              </Badge>
            </Td>

            <Td pl={0}>{s.volume}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
