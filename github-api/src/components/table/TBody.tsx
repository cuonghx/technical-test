import { IUser } from "@/models/users/IUser";
import { Avatar } from "../shared/Avatar";

export const Body: React.FC<{ items: IUser[]; testid?: string }> = ({
  items,
  testid = "not-set",
}) => {
  return (
    <tbody data-testid={testid} className="bg-white dark:bg-slate-800  ">
      {items.map((item: IUser) => (
        <tr key={item.id}>
          <td className="border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400 text-base">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="rounded-full w-12 h-12 border border-gray-300">
                  <Avatar avatar_url={item.avatar_url} alt={item.login} />
                </div>
              </div>
              <div>
                <div className="font-bold"> {item.login}</div>
              </div>
            </div>
          </td>

          <td>
            <span className="badge badge-ghost">{item.type}</span>
          </td>
          <td>
            <div className="text-base">{item.score.toFixed(2)}</div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
