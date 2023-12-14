export const onKeyDown = ({ event, handleKeyDown }) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.preventDefault();
    handleKeyDown();
  }
};
