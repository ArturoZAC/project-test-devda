import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, type PostFormValues } from "../schema/post.schema";
import type { Post } from "../hooks/usePosts";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";

interface PostFormProps {
  defaultValues?: Post;
  onSubmit: (values: PostFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PostForm = ({ defaultValues, onSubmit, onCancel, isLoading }: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      body: defaultValues?.body ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titulo</Label>
        <Input id="title" placeholder="Titulo del post" {...register("title")} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">Contenido</Label>
        <Textarea id="body" placeholder="Escribe el contenido..." rows={4} {...register("body")} />
        {errors.body && <p className="text-sm text-destructive">{errors.body.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {defaultValues ? "Guardar cambios" : "Crear post"}
        </Button>
      </div>
    </form>
  );
};
