export const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null

  return (
    <div
      style={{
        color: 'red',
        padding: '5px',
        textAlign: 'center',
        backgroundColor: 'gray',
      }}
    >
      {errorMessage}
    </div>
  )
}
