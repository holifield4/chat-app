import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import type { ModalProps } from "./CreateRoom";
import useUser from "../../store/useUser";
import useRoom from "../../store/useRoom";
import { UserAdd } from "../../assets/icons/UserAdd";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import type { InviteMembers } from "../../types/rooms.types";

function InviteMembersModal({ isOpen, onClose }: ModalProps) {
  const userCurrentRoom = useUser((state) => state.userCurrentRoom);
  const { availableMembers, inviteMembers } = useRoom(
    useShallow((state) => ({
      availableMembers: state.availableMembers,
      inviteMembers: state.inviteMembers,
    }))
  );
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleSelect = (member: string) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(member)) {
        //remove if seleceted
        return prevSelected.filter((m) => m !== member);
      } else {
        //add if not selected
        return [...prevSelected, member];
      }
    });
  };

  const handleInvite = () => {
    if (selectedMembers.length > 0) {
      const payload: InviteMembers = {
        toRoom: userCurrentRoom!,
        members: selectedMembers,
      };
      inviteMembers(payload);

      //clear selections
      setSelectedMembers([]);
      onClose();
    }
  };

  return (
    <Modal size="md" show={isOpen} onClose={onClose}>
      <ModalHeader>Invite Members to {userCurrentRoom}</ModalHeader>
      <ModalBody className="max-h-[250px]">
        <div className="space-y-6 flex flex-col">
          {availableMembers.length > 0 ? (
            availableMembers.map((m) => (
              <div key={m} className="flex items-center gap-2">
                <Checkbox
                  id={`invite-${m}`}
                  onChange={() => handleSelect(m)}
                  checked={selectedMembers.includes(m)}
                />
                <Label htmlFor={`invite-${m}`}>{m}</Label>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-red-700">
              <p>No available members found.</p>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className="w-full"
          type="button"
          disabled={selectedMembers.length === 0}
          onClick={handleInvite}
        >
          <UserAdd className="size-6 mr-1" />
          Invite
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default InviteMembersModal;
