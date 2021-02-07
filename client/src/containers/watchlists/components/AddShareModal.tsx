import { useState } from 'react';
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
import Select from 'react-select';
import { useDebouncedCallback } from 'use-debounce';
import { useLazyQuery } from '@apollo/client';
import searchSymbolQuery from '../../../queries/searchSymbol';
import {
  SearchSymbol,
  SearchSymbol_symbolSearch,
} from '../../../queries/types/SearchSymbol';

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
  const [symbol, setSymbol] = useState('');
  const [
    selectedSymbol,
    setSelectedSymbol,
  ] = useState<SearchSymbol_symbolSearch>();
  const [
    searchSymbol,
    { loading: loadingSearchSymbol, error: loadingSearchSymbolError, data },
  ] = useLazyQuery<SearchSymbol>(searchSymbolQuery, { variables: { symbol } });
  const debouncedSearchSymbol = useDebouncedCallback(searchSymbol, 500);
  const handleOnInputChange = (value: string) => {
    if (!value) return;
    setSymbol(value);
    debouncedSearchSymbol.callback();
  };

  return (
    <Modal
      colorScheme="blue"
      isOpen={isOpen}
      onClose={onClose}
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
            options={data?.symbolSearch.map(s => ({
              ...s,
              id: s.symbol,
              label: `${s.symbol}: ${s.name}`,
            }))}
            onInputChange={handleOnInputChange}
            isLoading={loadingSearchSymbol}
            error={loadingSearchSymbolError}
            onChange={setSelectedSymbol}
            autoFocus
            isDisabled={isLoading}
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
