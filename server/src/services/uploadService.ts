import { User } from "../Models/User";

class UploadService {
  upload = async ({ fileName, userId }: { fileName?: string; userId?: number }) => {
    try {
      await User.update(
        { avatar_url: fileName },
        {
          where: {
            id: userId,
          },
        }
      );

      return fileName;
    } catch (err) {
      throw err;
    }
  };
}

export default new UploadService();
