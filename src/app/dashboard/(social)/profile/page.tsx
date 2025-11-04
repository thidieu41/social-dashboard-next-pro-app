"use client";

import Avatar from "@/components-system/Avatar/Avatar";
import { Button } from "@/components-system/Button/Button";
import Card from "@/components-system/Card/Card";
import { CardHeader } from "@/components-system/Card/CardHeader";
import Stack from "@/components-system/Stack/Stack";
import { Pen } from "lucide-react";
import { useState } from "react";
import ModalEditProfile from "./ModalEditProfile";

const information = [
  {
    labelName: "First Name",
    content: "Trubel",
    keyContent: "first-name",
  },
  {
    labelName: "Last Name",
    content: "Theresa",
    keyContent: "last-name",
  },
  {
    labelName: "Email Adrress",
    content: "trubeltheresa@gmail.dev",
    keyContent: "email",
  },
  {
    labelName: "Phone Number",
    content: "0367762327",
    keyContent: "phone",
  },
  {
    labelName: "Bio",
    content: "Junior Font-End Developer",
    keyContent: "bio",
  },
];

const address = [
  {
    labelName: "Country",
    content: "Trubel",
    keyContent: "country",
  },
  {
    labelName: "City/State",
    content: "Theresa",
    keyContent: "city",
  },
  {
    labelName: "Postal Code",
    content: "trubeltheresa@gmail.dev",
    keyContent: "code",
  },
  {
    labelName: "TAX ID",
    content: "0367762327",
    keyContent: "tax",
  },
];

const profile = [
  {
    labelName: "Name",
    content: "Trubel Theresa",
    keyContent: "name",
  },
  {
    labelName: "Position",
    content: "Team Software Developer",
    keyContent: "postion",
  },
  {
    labelName: "Head quarters",
    content: "Lead, US",
    keyContent: "headquarters",
  },
];

const ProfilePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [keyModal, setKeyModal] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any>[]>([]);

  const handleSetData = (modalKey: string) => {
    switch (modalKey) {
      case "modal-1":
        setData(profile);
        break;
      case "modal-2":
        setData(information);
        break;
      case "modal-3":
        setData(address);
        break;
      default:
        setData([]);
        break;
    }
  };
  const handleSetOpen = (open: boolean, modalKey?: string) => {
    setOpenModal(open);
    setKeyModal(modalKey || "");
    handleSetData(modalKey || "");
  };

  return (
    <div className="section-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-2">
        <Stack direction="col" spacing={3}>
          <Card>
            <Stack className="justify-between items-center" spacing={3}>
              <Stack spacing={3} className="items-center">
                <Avatar width={80} height={80} />
                <Stack direction="col">
                  <p className="text-lg main-text-title">Trubel Theresa</p>
                  <p className="secondary-text text-base">
                    Team Software Developer
                  </p>
                  <p className="secondary-text text-base">Lead, US</p>
                </Stack>
              </Stack>
              <Button
                className="secondary-button"
                onClick={() => handleSetOpen(true, "modal-1")}
              >
                <Pen />
                Edit
              </Button>
            </Stack>
          </Card>

          <Card className="mt-1">
            <CardHeader title="Personal Information" className="px-2">
              <Button
                className="secondary-button"
                onClick={() => handleSetOpen(true, "modal-2")}
              >
                <Pen />
                Edit
              </Button>
            </CardHeader>
            <Stack className="px-3 mt-2" direction="col" spacing={2}>
              {information.map((item, index) => (
                <Stack className="justify-between items-center" key={index}>
                  <label className="secondary-text"> {item.labelName}</label>
                  <p>{item.content}</p>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Stack>

        <Stack>
          <Card className="mt-1">
            <CardHeader title="Address" className="px-3">
              <Button
                className="secondary-button"
                onClick={() => handleSetOpen(true, "modal-3")}
              >
                <Pen />
                Edit
              </Button>
            </CardHeader>
            <Stack className="px-3 mt-2" direction="col" spacing={2}>
              {address.map((item, index) => (
                <Stack className="justify-between items-center" key={index}>
                  <label className="secondary-text"> {item.labelName}</label>
                  <p>{item.content}</p>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Stack>
      </div>

      <ModalEditProfile
        modalKey={keyModal}
        isOpen={openModal}
        toogleModal={handleSetOpen}
        data={data}
      />
    </div>
  );
};

export default ProfilePage;
