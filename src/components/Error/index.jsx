import PropTypes from 'prop-types'

export default function Error({ content = 'Something went wrong' }) {
  return (
    <div>
      <h1>{content}</h1>
    </div>
  )
}

Error.propTypes = {
  content: PropTypes.string
}
