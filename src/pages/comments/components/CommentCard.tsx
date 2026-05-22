import { IconEmailStamp } from "@tabler/icons-react";
import type { Comment } from "../hooks/useComments";

interface Props {
  comment: Comment;
}

const isLocal = (id: number) => id > 500;

export const CommentCard = ({ comment }: Props) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-gray-300/90 hover:-translate-y-0.5 p-5 pl-[18px] flex flex-col gap-3 transition-all duration-300 before:absolute before:left-0 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-indigo-400/50 before:transition-all before:duration-300 group-hover:before:bg-indigo-500">
      {/* Cabecera: nombre + badges */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug capitalize line-clamp-2 transition-colors group-hover:text-gray-800">
          {comment.name}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {isLocal(comment.id) && (
            <span className="text-[11px] bg-emerald-50 text-emerald-700 font-medium px-2.5 py-0.5 rounded-full border border-emerald-200/70 shadow-sm">
              Local
            </span>
          )}
          <span className="text-[11px] text-gray-400 font-mono tabular-nums tracking-tight">
            #{comment.id}
          </span>
        </div>
      </div>

      {/* Email con icono */}
      <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50/80 px-2 py-1 rounded-lg w-fit">
        <IconEmailStamp
          size={15}
          className="shrink-0 text-gray-400 group-hover:text-indigo-500 transition-colors"
        />
        <p className="text-xs font-medium truncate text-gray-600">{comment.email}</p>
      </div>

      {/* Cuerpo del comentario */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">{comment.body}</p>
    </div>
  );
};
