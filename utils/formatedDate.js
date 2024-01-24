const formatedDate = (date) => {
  const dateObject = new Date(date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return dateObject.toLocaleDateString("en-US", options);
};

export default formatedDate;
