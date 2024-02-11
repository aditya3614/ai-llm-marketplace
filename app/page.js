"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export const getModelsData = () => {
  const url = "https://3d572aca60834715b884b82cfa778d1b.api.mockbin.io/";
  return axios(url, {
    method: "get",
  })
    .then((res) => {
      return res.data.models;
    })
    .catch((err) => {
      return err;
    });
};

export default function Home() {
  const [modelData, setModelData] = useState([]);
  const orig = "http://localhost:3000";
  useEffect(() => {
    getModelsData().then((res) => {
      setModelData(res);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div>
        <div className="flex  flex-col items-center justify-between border p-10">
          <div className="font-bold text-3xl">AISpire</div>
          <div className="font-semibold text-2xl">AI and LLM Marketplace</div>
        </div>
        <div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
            {modelData.map((model, index) => (
              <div
                key={index}
                className="border rounded flex justify-center flex-col items-center"
              >
                <img
                  src={model.image}
                  alt={model.title}
                  className="rounded  w-full "
                  style={{ height: "250px" }}
                />
                <h3 className="text-2xl font-semibold pt-5">{model.title}</h3>
                <h4 className="text-sm font-light">
                  Launched in {model.launchedYear}
                </h4>
                <p className="text-left p-5 max-h-32 overflow-hidden break-all">
                  {model.description}
                </p>
                <button className="border rounded p-2 my-4">
                  explore more
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
