import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, Link, Tag } from '@chakra-ui/react';
import { format } from 'date-fns';
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
          <Th pl={0}>Latest</Th>
          <Th pl={0}>Open</Th>
          <Th pl={0}>High</Th>
          <Th pl={0}>Low</Th>
          <Th pl={0}>Change</Th>
          <Th pl={0}>% Change</Th>
          <Th pl={0}>Volume</Th>
          <Th pl={0}>Updated</Th>
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
            <Td pl={0}>{s.latestPrice.toFixed(2)}</Td>
            <Td pl={0}>{s.open}</Td>
            <Td pl={0}>{s.high}</Td>
            <Td pl={0}>{s.low}</Td>
            <Td pl={0}>
              <Tag
                size="md"
                colorScheme={s.change < 0 ? 'red' : 'green'}
                fontSize="1rem"
              >
                {s.change > 0 && '+'}
                {s.change}
              </Tag>
            </Td>
            <Td pl={0}>
              <Tag
                size="md"
                colorScheme={s.changePercent < 0 ? 'red' : 'green'}
                fontSize="1rem"
              >
                {s.changePercent > 0 && '+'}
                {s.changePercent.toFixed(2)}
              </Tag>
            </Td>

            <Td pl={0}>{s.latestVolume}</Td>
            <Td pl={0}>{format(s.latestUpdate, 'H:mm:ss')}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
