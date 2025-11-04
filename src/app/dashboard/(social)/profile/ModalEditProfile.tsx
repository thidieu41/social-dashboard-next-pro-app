import Modal, { ModalActions } from "@/components/Modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ProfileSchema } from "./schema";
import Input from "@/components-system/Input/Input";
import { Button } from "@/components-system/Button/Button";

type IEditProps = {
  isOpen: boolean;
  modalKey: string;
  toogleModal: (open: boolean, title?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
};

const keyModal = [
  {
    modalKey: "modal-1",
    title: "Change your profile",
  },
  {
    modalKey: "modal-2",
    title: "Personal Information",
  },
  {
    modalKey: "modal-3",
    title: "Address",
  },
];

const ModalEditProfile = (props: IEditProps) => {
  const methods = useForm({
    resolver: zodResolver(ProfileSchema),
  });
  console.log(props);
  const { isOpen: open, toogleModal, modalKey, data = [] } = props;
  const contentModal = keyModal.find((modal) => modal.modalKey === modalKey);
  const handleToogleModal = (isOpen: boolean, modalKeyNew: string) => {
    toogleModal(isOpen, modalKeyNew);
  };

  return (
    <div>
      <Modal
        isOpen={open}
        title={contentModal?.title}
        onChangeModal={handleToogleModal}
      >
        <FormProvider {...methods}>
          <form>
            <div className="flex flex-col gap-2">
              {data.map((sub) => (
                <div key={sub.keyContent}>
                  <Input
                    name={sub.keyContent}
                    label={sub.labelName}
                    value={sub.content}
                  ></Input>
                </div>
              ))}
            </div>
          </form>
        </FormProvider>
        <ModalActions>
          <Button
            className="error-button"
            onClick={() => handleToogleModal(false, "")}
          >
            Cancel
          </Button>
          <Button className="secondary-button">Submit</Button>
        </ModalActions>
      </Modal>
    </div>
  );
};

export default ModalEditProfile;
