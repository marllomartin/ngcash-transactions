import md5 from 'md5';

const translateMd5 = async (message: string) => md5(message);

export default translateMd5;
