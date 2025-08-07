const TruncateText = ({ text }: { text: string }) => {
  const MAX_LENGTH = 20;

  return (
    <span>
      {text.length > MAX_LENGTH ? text.slice(0, MAX_LENGTH) + "..." : text}
    </span>
  );
};

export default TruncateText;
