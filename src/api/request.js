const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (nodeId) => {
  try {
    const response = await fetch(`${API_END_POINT}/${nodeId ?? ""}`);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (e) {
    throw new Error();
  }
};

export default request;
