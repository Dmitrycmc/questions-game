const ask = text => {
  let name;
  do {
    name = prompt(text);
  } while (!name);
  return name;
};

export default ask;
