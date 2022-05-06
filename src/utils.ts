const getLimitDescription = (value: string, valueLimit = 139) => {
  if (value.length < valueLimit) {
    return value;
  } else {
    return value.substring(0, valueLimit).trim() + '...';
  }
};

export default getLimitDescription
