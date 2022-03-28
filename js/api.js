const getData = async (URL, onSuccess, onFailure) => {
  let response;
  try {
    response = await fetch(URL);
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    onFailure('Данные не были загружены. Попробуйте еще раз.');
    return;
  }

  const data = await response.json();
  onSuccess(data);
};

export {getData};
