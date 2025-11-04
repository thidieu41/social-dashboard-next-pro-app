import z from "zod";

export const ProfileSchema = z.object({
    name: z.string().min(1, 'Name is required')
})

export const PersonalSchema = z.object({

})

export const AddressSchema = z.object({
    
})