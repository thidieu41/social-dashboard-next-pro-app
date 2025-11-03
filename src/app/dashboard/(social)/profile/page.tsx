"use client";

import Avatar from "@/components-system/Avatar/Avatar";
import { Button } from "@/components-system/Button/Button";
import Card from "@/components-system/Card/Card";
import { CardHeader } from "@/components-system/Card/CardHeader";
import Stack from "@/components-system/Stack/Stack";
import Modal from "@/components/Modal/Modal";
import { Pen } from "lucide-react";
import { useState } from "react";

const information = [
  {
    labelName: "First Name",
    content: "Trubel",
  },
  {
    labelName: "Last Name",
    content: "Theresa",
  },
  {
    labelName: "Email Adrress",
    content: "trubeltheresa@gmail.dev",
  },
  {
    labelName: "Phone Number",
    content: "0367762327",
  },
  {
    labelName: "Bio",
    content: "Junior Font-End Developer",
  },
];

const address = [
  {
    labelName: "Country",
    content: "Trubel",
  },
  {
    labelName: "City/State",
    content: "Theresa",
  },
  {
    labelName: "Postal Code",
    content: "trubeltheresa@gmail.dev",
  },
  {
    labelName: "TAX ID",
    content: "0367762327",
  },
];

const ProfilePage = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleSetOpen = () => {
    setOpenModal(!openModal);
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
              <Button className="secondary-button" onClick={handleSetOpen}>
                <Pen />
                Edit
              </Button>
            </Stack>
          </Card>

          <Card className="mt-1">
            <CardHeader title="Personal Information" className="px-2">
              <Button className="secondary-button">
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
              <Button className="secondary-button">
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
      
      <Modal title="" isOpen={openModal} onChange={handleSetOpen} />
    </div>
  );
};

export default ProfilePage;
