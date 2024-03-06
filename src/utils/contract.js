import eventABI from './Event.json';
export const contractAddress = '0x51797bbd06F59D58a36ebE81950d6D82E5BFc29A';
export const abi = eventABI.abi;

export const uinxTime = (date) => {
  return Math.floor(new Date(date).getTime() / 1000);
};
