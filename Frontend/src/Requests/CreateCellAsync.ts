import axios from "axios";

interface CreateRequest {
  name: string;
  password: string;
}

export const CreateCellAsync = async ({ name, password }: CreateRequest) => {
  try {
    const response = await axios.post("http://localhost:5067/Cells/create", {
      name: name,
      password: password,
    });
    if (response.status !== 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error(error.response.data);
    return error.response.data;
  }
};
