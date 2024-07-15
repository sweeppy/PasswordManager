import axios from "axios";

export const GetCellsAsync = async () => {
  try {
    const response = await axios.get("http://localhost:5067/Cells/getAll");
    if (response.status == 200) {
      return response;
    } else {
      console.error(response.data);
    }
  } catch (error: any) {
    console.error(error.response.data);
  }
};
