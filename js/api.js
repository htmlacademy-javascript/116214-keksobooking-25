const getData = async () => {
  const response = await fetch('https://25.javascript.pages.academy/keksobooking/data');
  const data = await response.json();
  return data;
};

export {getData};
