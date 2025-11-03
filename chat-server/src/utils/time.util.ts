export const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-MY', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
