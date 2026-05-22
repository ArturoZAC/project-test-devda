import type { Comment } from "../hooks/useComments";

interface Props {
  comment: Comment;
}

const isLocal = (id: number) => id > 500;

export const CommentCard = ({ comment }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-gray-800 capitalize text-sm leading-tight">
          {comment.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {isLocal(comment.id) && (
            <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full">
              local
            </span>
          )}
          <span className="text-xs text-gray-400">#{comment.id}</span>
        </div>
      </div>
      <p className="text-xs text-red-400 font-medium">{comment.email}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{comment.body}</p>
    </div>
  );
};
