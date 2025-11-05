import z from "zod";

export const information = [
  {
    labelName: "First Name",
    content: "Trubel",
    keyContent: "firstName",
  },
  {
    labelName: "Last Name",
    content: "Theresa",
    keyContent: "lastName",
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

export const address = [
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

export const profile = [
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
export const ProfileSchema = z.object(
  Object.fromEntries(
    profile.map((item) => [
      item.keyContent,
      z.string().min(1, `${item.labelName} is required`),
    ])
  )
);

export const basePersonSchema = z.object(
  Object.fromEntries(
    information.map((item) => [
      item.keyContent,
      z.string().min(1, `${item.labelName} is required`),
    ])
  )
);

export const PersonalSchema = basePersonSchema.extend({
    email:z.string().email("Invalid email")
})

export const AddressSchema = z.object(
  Object.fromEntries(
    address.map((item) => [
      item.keyContent,
      z.string().min(1, `${item.labelName} is required`),
    ])
  )
);

export type ProfileType = z.infer<typeof ProfileSchema>;

export type PersonalType = z.infer<typeof PersonalSchema>;

export type AddressType = z.infer<typeof AddressSchema>;

export const AllSchema = z.union([ProfileSchema, PersonalSchema, AddressSchema]);
