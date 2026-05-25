import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, type CommentFormData } from "../../comments/schema/comment.schema";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";

interface Props {
  onSubmit: (data: CommentFormData) => void;
  isSubmitting?: boolean;
}

export const AddCommentForm = ({ onSubmit, isSubmitting }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const handleValid = (data: CommentFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleValid)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Tu nombre" {...register("name")} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="tu@email.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="body">Comentario</Label>
        <Textarea id="body" placeholder="Escribe tu comentario..." rows={3} {...register("body")} />
        {errors.body && <p className="text-xs text-red-500">{errors.body.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Publicando..." : "Publicar comentario"}
      </Button>
    </form>
  );
};
