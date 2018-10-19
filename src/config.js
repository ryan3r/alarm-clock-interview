// HACK to use the react-scripts server and the express backend
const BASE_URL = window.location.host === "localhost:3000" ? "//localhost:3001" : "";
export default BASE_URL;