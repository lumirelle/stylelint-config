import { createDefu } from '@lumirelle/defu'

export const configDefu: ReturnType<typeof createDefu> = createDefu(undefined, { acceptNullish: true, reverseArrayOrder: true })
