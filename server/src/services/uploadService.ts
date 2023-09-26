import { User } from "../Models/User";

import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

const accountName = "mishastorage158";
const accountKey = "0M6bfBZn95JA3PQt0PdvAQGsxsFFCEEHKwqvZtp1IU316otqZaet7Dzbm3ivg12j9UpOmBJV7ehe+ASt8U7hzw==";
const containerName = "misha-folder";

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
const containerClient = blobServiceClient.getContainerClient(containerName);

const baseAzureStorageURL = "https://mishastorage158.blob.core.windows.net/misha-folder";

class UploadService {
  upload = async ({ fileName, userId, req }: { fileName?: string; userId?: number; req: any }) => {
    try {
      const timestamp = Date.now();
      const date = new Date(timestamp);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      const { file } = req;
      const blobName = `${formattedDate}-${fileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Загрузка файла в Azure Blob Storage
      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });

      await User.update(
        { avatar_url: `${baseAzureStorageURL}/${blobName}` },
        {
          where: {
            id: userId,
          },
        }
      );

      return `${baseAzureStorageURL}/${blobName}`;
    } catch (err) {
      throw err;
    }
  };
}

export default new UploadService();
