export const notFound = (req, res, next) => {
  res.status(404)
  res.json({
    status: 404,
    error: 'not found'
  })
}
