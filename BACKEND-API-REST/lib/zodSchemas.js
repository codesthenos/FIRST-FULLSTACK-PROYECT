import z from 'zod'

export const userZodSchema = z.object({
  username: z.string({
    required_error: 'Provide a username'
  }).email({
    required_error: 'Invalid email'
  }),
  password: z.string({
    required_error: 'Provide a password'
  }).min(6, {
    message: 'Password must have at least 6 characters'
  })
})

export const addZodSchema = z.object({
  name: z.string({
    required_error: 'Provide a name'
  }),
  price: z.string({
    required_error: 'Provide a price'
  }).refine(
    value => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: 'Price must be a positive number'
    }),
  description: z.string({
    required_error: 'Provide a description'
  }).max(200, {
    message: 'Description must be 200 characters or less'
  }),
  for: z.enum(['offer', 'demand'], {
    required_error: 'For must be offer or demand'
  }),
  tags: z.string({
    required_error: 'Provide at least one tag'
  }).or(
    z.array(z.string()).nonempty({
      message: 'Provide at least one tag'
    })
  )
})
