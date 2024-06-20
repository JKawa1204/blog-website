import z from 'zod'

export const SignupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
})

export type SignupInput = z.infer<typeof SignupInput>



export const SigninInput = z.object({
    username : z.string().email(),
    password: z.string().min(6)
})

export type SigninInput = z.infer<typeof SigninInput>



export const CreateBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export type CreateBlogInput = z.infer<typeof CreateBlogInput>



export const UpdateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type UpdateBlogInput = z.infer<typeof UpdateBlogInput>