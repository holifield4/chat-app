import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import useRoom from "../../store/useRoom";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateNewRoom({ isOpen, onClose }: ModalProps) {
  const [newRoom, setNewRoom] = useState<string>("");
  const createRoom = useRoom((state) => state.createRoom);

  const onCreateRoom = () => {
    createRoom(newRoom);
    onClose();
    setNewRoom("");
  }

  return (
    <Modal size="md" show={isOpen} onClose={onClose}>
      <ModalHeader>Create Chat Group</ModalHeader>
      <ModalBody>
        <form onSubmit={onCreateRoom} className="space-y-6">
          <Label htmlFor="newRoomName">Group Name</Label>
          <TextInput
            id="newRoomName"
            value={newRoom}
            required
            placeholder="New room name..."
            onChange={(e) => setNewRoom(e.target.value)}
          />
          <Button className="w-full" size="sm" type="submit">
            Create
          </Button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default CreateNewRoom;
