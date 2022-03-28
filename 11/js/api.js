const getData = async (url, onSuccess, onFailure) => {
  let response;
  try {
    response = await fetch(url);
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

const sendData = async (url, body, onSuccess, onFailure) => {
  let response;
  try {
    response = await fetch(url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      },
      body
    );
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    onFailure('Не удалось отправить форму. Попробуйте ещё раз');
    return;
  }

  const data = await response.json();
  onSuccess(data);
};

export {getData, sendData};
