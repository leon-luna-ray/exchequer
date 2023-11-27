export const formatTimestamp = (timestamp) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(timestamp).toLocaleDateString(undefined, options);
    return formattedDate;
};
