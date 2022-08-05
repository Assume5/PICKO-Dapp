export const generateRandomString = async () => {
    return [...Array(26)]
        .map((i) => (~~(Math.random() * 36)).toString(36))
        .join("");
};

export const getTimeNow = () => {
    const date = new Date();
    return `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};
