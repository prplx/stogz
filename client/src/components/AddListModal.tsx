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
  onCreate: (value: string) => void;
  newListInputValue: string;
  setNewListInputValue: (value: string) => void;
  title: string;
};

export default function AddListModal({
  isOpen,
  onClose,
  isLoading,
  newListInputValue,
  setNewListInputValue,
  onCreate,
  title,
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
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={newListInputValue}
            onChange={e => setNewListInputValue(e.target.value)}
            placeholder="Title"
            disabled={isLoading}
            autoFocus
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => onCreate(newListInputValue)}
            disabled={!newListInputValue}
            isLoading={isLoading}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
