const handleChange = ({ fileList }) => {
  setFileList(fileList.slice(-1)); // Keep only the last file

  // If a file is selected, upload it to the server
  if (fileList.length > 0) {
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);

    // Use the API route to upload the image
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the correct image URL in the fileList
        const newFileList = [{ ...fileList[0], url: data.imageUrl }];
        setFileList(newFileList);

        // Set the local image URL in the formData
        setFormData({ ...formData, image: data.imageUrl });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }
};
