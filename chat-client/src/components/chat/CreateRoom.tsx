import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";

type CreateNewRoomProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomName: string) => void;
};

function CreateNewRoom({ isOpen, onClose, onSubmit }: CreateNewRoomProps) {
  const [newRoom, setNewRoom] = useState<string>("");

    function onCreateRoom(){
        onSubmit(newRoom);
        onClose();
        setNewRoom('');
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
