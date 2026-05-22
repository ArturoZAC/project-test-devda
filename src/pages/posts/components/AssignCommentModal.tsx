import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";

interface Comment {
  id: number;
  name: string;
  body: string;
}

interface AssignCommentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (commentId: number) => void;
  currentCommentId?: number | null;
}

const CommentSelector = ({
  comments,
  currentCommentId,
  onSelect,
}: {
  comments: Comment[];
  currentCommentId?: number | null;
  onSelect: (id: string) => void;
}) => {
  const [value, setValue] = useState<string>(currentCommentId ? String(currentCommentId) : "");

  const handleChange = (newValue: string | null) => {
    const finalValue = newValue ?? "";
    setValue(finalValue);
    onSelect(finalValue);
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona un comentario" />
      </SelectTrigger>
      <SelectContent>
        {comments.map((c) => (
          <SelectItem key={c.id} value={String(c.id)}>
            {c.name} (ID: {c.id})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const AssignCommentModal = ({
  open,
  onOpenChange,
  onAssign,
  currentCommentId,
}: AssignCommentModalProps) => {
  const [selectedId, setSelectedId] = useState<string>("");

  const comments: Comment[] = (() => {
    if (!open) return [];
    const stored = localStorage.getItem("local_comments");
    return stored ? JSON.parse(stored) : [];
  })();

  const handleAssign = () => {
    if (selectedId) {
      onAssign(Number(selectedId));
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asignar comentario</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No hay comentarios en localStorage. Agrega algunos en la seccion Comments.
            </p>
          ) : (
            <CommentSelector
              comments={comments}
              currentCommentId={currentCommentId}
              onSelect={setSelectedId}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAssign} disabled={!selectedId}>
            Asignar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
