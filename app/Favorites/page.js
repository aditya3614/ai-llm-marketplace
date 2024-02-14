"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "antd/es/typography/Title";
export const getFaoriteModels = () => {
  const url = "https://589fe003c27b4f44b4845c3bf4f050c8.api.mockbin.io/";
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

const page = () => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    getFaoriteModels().then((res) => {
      setFavorites(res);
    });
    console.log(favorites);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-10">
      <div>
        <Title className="text-center">
          <div className="text-white  ">
            Favorites <span className="text-red-500">♥️</span>
          </div>
          <div className="text-white text-sm font-thin">
            These are the most loved AI models by developers and common user
          </div>
        </Title>
      </div>
      <div className=" flex-wrap grid grid-cols-3 justify-center p-8 gap-8">
        {favorites.map((model, index) => (
          <div
            key={index}
            className="rounded flex flex-col items-center flex-grow"
          >
            <img
              src={model.image}
              alt={model.title}
              className="rounded w-full"
              style={{ height: "250px" }}
            />

            <h3 className="text-2xl font-semibold pt-5 text-white">
              {model.title}
            </h3>

            <h4 className="text-sm font-light">
              Launched in {model.launchedYear}
            </h4>
            <p className="text-left p-5 overflow-hidden break-all">
              {model.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
