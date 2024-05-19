export const Header: React.FC<{ headers: string[] }> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((title, idx) => (
          <th className="bg-base-200 py-2 text-base" key={idx}>
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};
