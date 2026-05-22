import { PostForm } from "./PostForm";
import type { Post } from "../hooks/usePosts";
import type { PostFormValues } from "../schema/post.schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";

interface PostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post?: Post;
  onSubmit: (values: PostFormValues) => void;
  isLoading?: boolean;
}

export const PostModal = ({ open, onOpenChange, post, onSubmit, isLoading }: PostModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{post ? "Editar post" : "Nuevo post"}</DialogTitle>
        </DialogHeader>
        <PostForm
          defaultValues={post}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
