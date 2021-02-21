import { useMemo, useCallback, useRef } from 'react';
import NextLink from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Tag,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Stack,
  Checkbox,
  chakra,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { TiDelete } from 'react-icons/ti';
import { MdSettings } from 'react-icons/md';
import { format } from 'date-fns';
import { useTable, useSortBy } from 'react-table';
import { GetWatchList_watchlist } from 'queries/types/GetWatchList';

type Props = {
  shares: GetWatchList_watchlist['shares'];
};

const numberFormat = Intl.NumberFormat('en', { notation: 'compact' });
const columnsWithSort = new Set([
  'symbol',
  'companyName',
  'change',
  'changePercent',
  'changeSinceAdded',
  'changePercentSinceAdded',
  'latestVolume',
  'latestUpdate',
]);

export default function SharesTable({ shares }: Props) {
  const sortType = useCallback(
    (field: string) => (a: any, b: any) => {
      if (a.original[field] > b.original[field]) return 1;
      if (b.original[field] > a.original[field]) return -1;
      return 0;
    },
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: 'Symbol',
        accessor: 'symbol',
        Cell: ({ row: { values } }) => (
          <NextLink href={`/shares/${values.symbol}`} passHref>
            <Link color="blue.400">{values.symbol}</Link>
          </NextLink>
        ),
      },
      {
        Header: 'Name',
        accessor: 'companyName',
        Cell: ({ row: { values } }) => (
          <NextLink href={`/shares/${values.symbol}`} passHref>
            <Link color="blue.400">{values.companyName}</Link>
          </NextLink>
        ),
      },
      {
        Header: 'Latest',
        accessor: 'latestPrice',
        Cell: ({ row: { values } }) => values.latestPrice.toFixed(2),
        disableSortBy: true,
      },
      {
        Header: 'Open',
        accessor: 'open',
        Cell: ({ row: { values } }) => values.open.toFixed(2),
        disableSortBy: true,
      },
      {
        Header: 'High',
        accessor: 'high',
        Cell: ({ row: { values } }) => values.high.toFixed(2),
        disableSortBy: true,
      },
      {
        Header: 'Low',
        accessor: 'low',
        Cell: ({ row: { values } }) => values.low.toFixed(2),
        disableSortBy: true,
      },
      {
        Header: 'Change',
        accessor: 'change',
        Cell: ({ row: { values } }) => (
          <Tag
            size="md"
            colorScheme={values.change < 0 ? 'red' : 'green'}
            fontSize="1rem"
          >
            {values.change > 0 && '+'}
            {values.change.toFixed(2)}
          </Tag>
        ),
        sortType: sortType('change'),
      },
      {
        Header: '% Change',
        accessor: 'changePercent',
        Cell: ({ row: { values } }) => (
          <Tag
            size="md"
            colorScheme={values.changePercent < 0 ? 'red' : 'green'}
            fontSize="1rem"
          >
            {values.changePercent > 0 && '+'}
            {values.changePercent.toFixed(2)}%
          </Tag>
        ),
        sortType: sortType('changePercent'),
      },
      {
        Header: 'Total change',
        accessor: 'changeSinceAdded',
        Cell: ({ row: { values } }) => (
          <Tag
            size="md"
            colorScheme={values.changeSinceAdded < 0 ? 'red' : 'green'}
            fontSize="1rem"
          >
            {values.changeSinceAdded > 0 && '+'}
            {values.changeSinceAdded.toFixed(2)}
          </Tag>
        ),
        sortType: sortType('changeSinceAdded'),
      },
      {
        Header: '% Total change',
        accessor: 'changePercentSinceAdded',
        Cell: ({ row: { values } }) => (
          <Tag
            size="md"
            colorScheme={values.changePercentSinceAdded < 0 ? 'red' : 'green'}
            fontSize="1rem"
          >
            {values.changePercentSinceAdded > 0 && '+'}
            {values.changePercentSinceAdded.toFixed(2)}%
          </Tag>
        ),
        sortType: sortType('changePercentSinceAdded'),
      },
      {
        Header: 'Volume',
        accessor: 'latestVolume',
        Cell: ({ row: { values } }) => numberFormat.format(values.latestVolume),
      },
      {
        Header: 'Updated',
        accessor: 'latestUpdate',
        Cell: ({ row: { values } }) => format(values.latestUpdate, 'H:mm:ss'),
      },
      {
        Header: 'Added at',
        accessor: 'addedAt',
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable(
    {
      columns,
      data: shares,
      initialState: {
        sortBy: [{ id: 'addedAt' }],
        hiddenColumns: [
          'changeSinceAdded',
          'changePercentSinceAdded',
          'addedAt',
          'latestUpdate',
        ],
      },
    },
    useSortBy
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Table variant="simple" colorScheme="blue" {...getTableProps}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()} whiteSpace="nowrap">
              {headerGroup.headers.map(column => {
                return (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pl={0}
                  >
                    {column.render('Header')}
                    {columnsWithSort.has(column.id) && (
                      <chakra.span
                        display="inline-flex"
                        flexDirection="column"
                        fontSize={8}
                        lineHeight={1}
                        verticalAlign="super"
                        ml={1}
                      >
                        <chakra.span
                          color={column.isSortedDesc ? 'blue.500' : ''}
                        >
                          ▲
                        </chakra.span>
                        <chakra.span
                          color={
                            column.isSorted && !column.isSortedDesc
                              ? 'blue.500'
                              : ''
                          }
                        >
                          ▼
                        </chakra.span>
                      </chakra.span>
                    )}
                  </Th>
                );
              })}
              <Th px={0} textAlign="right">
                <Popover placement="bottom-end">
                  <PopoverTrigger>
                    <IconButton
                      aria-label="Settings"
                      background="none"
                      height="unset"
                      minW="unset"
                      opacity="0.3"
                      mr="2px"
                      color="white"
                      icon={<MdSettings size="1.4em" />}
                      _hover={{
                        background: 'none',
                        opacity: 0.6,
                      }}
                      _active={{
                        background: 'none',
                        opacity: 0.9,
                      }}
                      _focus={{
                        border: 'none',
                      }}
                    />
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader fontWeight="bold">
                        Adjust table
                      </PopoverHeader>
                      <PopoverBody>
                        <Stack p={2} spacing={1}>
                          {allColumns
                            .filter(
                              column =>
                                column.id !== 'symbol' &&
                                column.id !== 'addedAt'
                            )
                            .map(column => (
                              <Checkbox
                                key={column.id}
                                {...column.getToggleHiddenProps()}
                                isChecked={
                                  column.getToggleHiddenProps().checked
                                }
                              >
                                {column.Header}
                              </Checkbox>
                            ))}
                        </Stack>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <StyledTr {...row.getRowProps()}>
                {row.cells.map((cell, i) => (
                  <Td {...cell.getCellProps()} pl={0}>
                    {cell.render('Cell')}
                  </Td>
                ))}
                <Td px={0} textAlign="right">
                  <IconButton
                    aria-label="Remove"
                    background="none"
                    icon={<TiDelete size="1.6em" />}
                    opacity="0.3"
                    height="unset"
                    minW="unset"
                    transition="none"
                    visibility="hidden"
                    onClick={onOpen}
                    _hover={{
                      background: 'none',
                      opacity: 0.6,
                    }}
                    _active={{
                      background: 'none',
                      opacity: 0.9,
                    }}
                    _focus={{
                      border: 'none',
                    }}
                  />
                </Td>
              </StyledTr>
            );
          })}
        </Tbody>
      </Table>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Symbol</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete Symbol from the watchlist?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const StyledTr = styled(Tr)`
  &:hover {
    button {
      visibility: visible;
    }
  }
`;
