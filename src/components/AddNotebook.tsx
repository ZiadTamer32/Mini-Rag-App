import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import useCreateProject from "@/hooks/useCreateProject";
import { useState } from "react";
import Spinner from "./Spinner";
import { useChat } from "@/context/ChatContext";

export default function AddNotebook() {
  const { t } = useTranslation();
  const { createProject, isPending } = useCreateProject();
  const { setProjectName } = useChat();
  const [open, setOpen] = useState<boolean>(false);

  const formSchema = z.object({
    project_name: z.string().min(5).max(20),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project_name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createProject(values.project_name, {
      onSuccess: () => {
        setProjectName(values.project_name);
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="flex items-center gap-3">
          <Plus /> {t("new notebook")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add a Notebook</DialogTitle>
              <DialogDescription>
                Give your project a name. Click add when you&apos;re ready.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="project_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. My Project Ideas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : "Add a Notebook"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
