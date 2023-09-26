import { Avatar, Button } from "antd";
import { useHeader } from "./useHeader";

export const Header = () => {
  const { avatarUrl, logout } = useHeader();
  const avatarSrc = avatarUrl ? `${avatarUrl}` : "";

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
      <Avatar size={100} src={avatarSrc} />
      <Button type="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
