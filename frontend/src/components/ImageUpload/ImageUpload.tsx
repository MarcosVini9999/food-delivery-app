import React, { useState, ChangeEvent } from "react";
import { AxiosRequestConfig } from "axios";
import apiFood from "@/services/apiFood";

interface ImageUploadProps {}

export const ImageUpload: React.FC<ImageUploadProps> = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Selecione uma imagem antes de fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        }
      },
    };

    try {
      const response = await apiFood.post("/upload", formData, config);

      console.log("Upload successful:", response.data);
      // Limpar o estado após o upload bem-sucedido
      setSelectedImage(null);
      setUploadProgress(0);
    } catch (error) {
      console.error("Erro durante o upload:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Fazer Upload</button>

      {uploadProgress > 0 && (
        <div>
          <p>Progresso: {uploadProgress.toFixed(2)}%</p>
          <progress value={uploadProgress} max={100} />
        </div>
      )}

      {selectedImage && (
        <div>
          <p>Imagem selecionada:</p>
          <img src={URL.createObjectURL(selectedImage)} alt="Imagem selecionada" />
        </div>
      )}
    </div>
  );
};
