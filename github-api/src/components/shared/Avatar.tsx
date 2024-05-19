const FALLBACK_AVATAR = `static/images/fallback-avatar.png`;
export const Avatar: React.FC<{ avatar_url?: string; alt: string }> = ({
  avatar_url = FALLBACK_AVATAR,
  alt,
}) => {
  return (
    <img src={avatar_url === "" ? FALLBACK_AVATAR : avatar_url} alt={alt} />
  );
};
