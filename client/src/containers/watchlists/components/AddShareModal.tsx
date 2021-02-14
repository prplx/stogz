import { useState, useCallback } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import Select from 'components/Select';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import searchSymbolQuery from 'queries/searchSymbol';
import {
  SearchSymbol,
  SearchSymbol_symbolSearch,
} from 'queries/types/SearchSymbol';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onAdd: (symbol: SearchSymbol_symbolSearch) => void;
};

export default function AddWatchlistModal({
  isOpen,
  onClose,
  isLoading,
  onAdd,
}: Props) {
  const client = useApolloClient();
  const [symbol, setSymbol] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [
    selectedSymbol,
    setSelectedSymbol,
  ] = useState<SearchSymbol_symbolSearch>();
  const [
    searchSymbol,
    { loading: loadingSearchSymbol, error: loadingSearchSymbolError, data },
  ] = useLazyQuery<SearchSymbol>(searchSymbolQuery, { variables: { symbol } });
  const debouncedSearchSymbol = useCallback(
    debounce((value: string) => {
      if (!value) return;
      setSymbol(value);
      searchSymbol();
    }, 200),
    []
  );
  const handleInputChange = (value: string) => {
    setInputValue(value);
    debouncedSearchSymbol(value);
  };

  return (
    <Modal
      colorScheme="blue"
      isOpen={isOpen}
      onClose={() => {
        setSelectedSymbol(null);
        client.writeQuery({
          query: searchSymbolQuery,
          variables: { symbol },
          data: { symbolSearch: null },
        });
        onClose();
      }}
      blockScrollOnMount
      motionPreset="slideInBottom"
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Start typing a symbol</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            options={data?.symbolSearch?.map(s => ({
              ...s,
              value: s.symbol,
              label: `${s.symbol}: ${s.name}`,
            }))}
            onInputChange={handleInputChange}
            isLoading={loadingSearchSymbol}
            error={loadingSearchSymbolError}
            onChange={({ value }) =>
              setSelectedSymbol(
                data?.symbolSearch?.find(({ symbol }) => symbol === value)
              )
            }
            autoFocus
            isDisabled={isLoading}
            inputValue={inputValue}
          ></Select>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => onAdd(selectedSymbol)}
            disabled={!selectedSymbol}
            isLoading={isLoading}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
