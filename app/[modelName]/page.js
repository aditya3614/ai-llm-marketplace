"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Space,
  Typography,
  Form,
  Input,
  Button,
  Tag,
  Divider,
} from "antd";
const { Title } = Typography;

export const getModelsDetail = () => {
  const url = "https://af280542c34745cf98ad3badc832d675.api.mockbin.io/";
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

const ModelDetail = ({ params }) => {
  const [modelDetail, setModelDetail] = useState([]);
  const [hasModel, setHasModel] = useState(false);

  useEffect(() => {
    getModelsDetail().then((res) => {
      if (res && res.length > 0) {
        const foundModel = res.find(
          (item) =>
            item.title.split(" ").join("").toLowerCase() ===
            params.modelName.toLowerCase()
        );

        if (foundModel) {
          setHasModel(true);
          setModelDetail(foundModel);
          console.log(JSON.stringify(foundModel));
        } else {
          setHasModel(false);
          console.log("Model not found");
        }
      }
    });
  }, [params]);

  return (
    <div>
      {hasModel && modelDetail ? (
        <div className="flex flex-col items-center mt-5">
          <Title>
            <div className="text-white">{modelDetail.title}</div>
          </Title>
          {modelDetail.details.map((item) => (
            <div className="px-10 py-4" key={item.heading}>
              <div
                key={item.heading}
                className={item.paragraph.length <= 50 ? "ml-2" : "ml-6"}
              >
                <Tag
                  color=""
                  className="mb-4 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-0"
                >
                  <h1 className="text-white text-2xl">{item.heading}</h1>
                </Tag>
                <p className="mb-2 text-left">{item.paragraph}</p>
                <img src={item.image} />
                <Divider className="border-white" />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ModelDetail;
