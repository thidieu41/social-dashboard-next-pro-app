import Modal, { ModalActions } from "@/components/Modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { AddressSchema, PersonalSchema, ProfileSchema } from "./schema";
import Input from "@/components-system/Input/Input";
import { Button } from "@/components-system/Button/Button";
import Avatar from "@/components-system/Avatar/Avatar";
import { UploadAvatar } from "./UploadAvatar";

type IEditProps = {
  isOpen: boolean;
  modalKey: "modal-1" | "modal-2" | "modal-3" | string;
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
  const { isOpen: open, toogleModal, modalKey, data = [] } = props;

  const methods = useForm({
    resolver: zodResolver(
      modalKey === "modal-1"
        ? ProfileSchema
        : modalKey === "modal-2"
        ? PersonalSchema
        : AddressSchema
    ),
  });

  const contentModal = keyModal.find((modal) => modal.modalKey === modalKey);
  const handleToogleModal = (isOpen: boolean, modalKeyNew: string) => {
    toogleModal(isOpen, modalKeyNew);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSumit = (data: Record<string, any>) => {
    console.log(data);
  };

  const handleSubmit = () => {
    methods.handleSubmit(onSumit)();
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
              {modalKey === "modal-1" && <UploadAvatar />}
              {data.map((sub) => (
                <div key={sub.keyContent}>
                  <Input
                    name={sub.keyContent}
                    label={sub.labelName}
                    defaultValue={sub.content}
                  />
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
          <Button className="secondary-button" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
};

export default ModalEditProfile;
