"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Space, Typography, Form, Input, Button, Tag } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;
import { Modal, Upload } from "antd";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const getModelsData = () => {
  const url = "https://7c6fe8aacabc4459b721d3e9ddd8fc30.api.mockbin.io/";
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [modelData, setModelData] = useState([]);
  const [showNewModel, setShowNewModel] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    launchedYear: "",
    description: "",
    image: null,
  });
  const newModelCard = {
    title: "Add new AI Model",
    launchedYear: "",
    description: "Click to add a new AI Model",
    image: null,
  };
  useEffect(() => {
    getModelsData().then((res) => {
      setModelData(res);
    });
  }, []);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
    setFormData({ ...formData, image: fileList.slice(-1)[0] });
  };
  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = (values) => {
    console.log("before " + JSON.stringify(formData));
    setFormData({
      title: values.title,
      launchedYear: values.launchedYear,
      description: values.description,
      image: formData.image,
    });
    console.log("after " + JSON.stringify(formData));
    setModelData([...modelData, formData]);
    setShowNewModel(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div>
        <div className="flex  flex-col items-center justify-between  p-10">
          <div>
            <Title color="white">
              <div className="text-white">AISpire</div>
            </Title>
          </div>
          <div className="font-thin text-2xl">AI and LLM Marketplace</div>
        </div>
        <div className="flex">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-8">
            {[...modelData, ...(showNewModel ? [newModelCard] : [])].map(
              (model, index) => (
                <div
                  key={index}
                  className="rounded flex justify-center flex-col items-center"
                >
                  {model.title === "Add new AI Model" ? (
                    <Space direction="vertical" size={16}>
                      <Card title={model.title} style={{ height: 500 }}>
                        <div>
                          <Form onFinish={onFinish} className=" ">
                            <Form.Item className="w-full">
                              <div className=" flex justify-between ">
                                <Upload
                                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                  listType="picture-card"
                                  fileList={fileList}
                                  onPreview={handlePreview}
                                  onChange={handleChange}
                                >
                                  {fileList.length >= 1 ? null : uploadButton}
                                </Upload>
                                <div className="flex mr-20 mt-5 w-full">
                                  Uploading image is optional
                                </div>
                                <Modal
                                  open={previewOpen}
                                  title={previewTitle}
                                  footer={null}
                                  onCancel={handleCancel}
                                >
                                  <img
                                    alt="example"
                                    style={{ width: "100%" }}
                                    src={previewImage}
                                  />
                                </Modal>
                              </div>
                            </Form.Item>
                            <Form.Item className="w-full" name="title">
                              <Input
                                placeholder="Enter your AI-Model Title"
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    title: e.target.value,
                                  })
                                }
                              />
                            </Form.Item>
                            <Form.Item className="w-full" name="launchedYear">
                              <Input
                                placeholder="Enter the year your AI-Model was Launched"
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    launchedYear: e.target.value,
                                  })
                                }
                              />
                            </Form.Item>
                            <Form.Item className="w-full" name="description">
                              <Input.TextArea
                                placeholder="Enter brief description"
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </Form.Item>
                            <Form.Item>
                              <Button htmlType="submit">Create</Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </Card>
                    </Space>
                  ) : (
                    <>
                      <img
                        src={model.image}
                        alt={model.title}
                        className="rounded w-full"
                        style={{ height: "250px" }}
                      />

                      <h3 className="text-2xl font-semibold pt-5 text-white ">
                        {model.title}
                      </h3>

                      <h4 className="text-sm font-light">
                        Launched in {model.launchedYear}
                      </h4>
                      <p className="text-left p-5 max-h-32 overflow-hidden break-all">
                        {model.description}
                      </p>
                      <a href={`/${model.title.split(" ").join("")}`}>
                        <button className="border rounded p-2 my-4">
                          explore more
                        </button>
                      </a>
                    </>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
