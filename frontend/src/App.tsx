import { FC, useEffect, useState } from "react";
import apiFood from "@/services/apiFood";

const App: FC = () => {
  const [response, setResponse] = useState<any>();
  const fetchData = async () => {
    let result;
    try {
      result = await apiFood.get(`/hello-world`);
    } catch (e) {
      console.log(e);
    }

    return result?.data;
  };

  useEffect(() => {
    fetchData().then((data) => setResponse(data));
  }, []);

  return <h1>Server said: {response?.message}</h1>;
};

export default App;
