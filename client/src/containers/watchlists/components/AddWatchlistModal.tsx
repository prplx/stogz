import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onCreate: (data: { [key: string]: any }) => void;
  newWatchlistInputValue: string;
  setNewWatchlistInputValue: (value: string) => void;
};

export default function AddWatchlistModal({
  isOpen,
  onClose,
  isLoading,
  newWatchlistInputValue,
  setNewWatchlistInputValue,
  onCreate,
}: Props) {
  return (
    <Modal
      colorScheme="blue"
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount
      motionPreset="slideInBottom"
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New watchlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={newWatchlistInputValue}
            onChange={e => setNewWatchlistInputValue(e.target.value)}
            placeholder="Title"
            disabled={isLoading}
            autoFocus
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() =>
              onCreate({ variables: { name: newWatchlistInputValue } })
            }
            disabled={!newWatchlistInputValue}
            isLoading={isLoading}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
