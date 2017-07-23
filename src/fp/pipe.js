export const pipe = (args) => (x) => args.reduce((current, next) => next(current), x)
