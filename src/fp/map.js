import {curry} from 'katsu-curry'
export const map = curry((fn, functor) => functor.map(fn))
