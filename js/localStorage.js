const saveData = (name, data) => localStorage.setItem(name, JSON.stringify(data));
const getData = (name) => JSON.parse(localStorage.getItem(name));

export { saveData, getData };
