const getData = async (onSuccess, onFailure) => {
  let response;
  try {
    response = await fetch('https://25.javascript.pages.academy/keksobooking/data');
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

const sendData = async (body, onSuccess, onFailure) => {
  let response;
  try {
    response = await fetch(
      'https://25.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body,
      }
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
