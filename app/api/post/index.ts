import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/supabase/initSupabase";
import { Json } from "@/supabase/supabase";
import { useQuery, useMutation } from "react-query";
export const usePostList = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alertes")
        .select("*")
        .order("create_at", { ascending: false });
      if (error) {
        throw new Error();
      }
      const alertList = data.filter((f) => f.target === null);
      return alertList;
    },
  });
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["user-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};

export const useUserNotification = () => {
  return useQuery({
    queryKey: ["notification-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alertes").select("*");
      if (error) {
        throw new Error();
      }
      let result = data.filter((d) => {
        if (d.target == null) {
          return;
        }
        return d.target;
      });
      return result;
    },
  });
};

export const useUserClassInfo = () => {
  const { classeId } = useAuth();
  return useQuery({
    queryKey: ["class-info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classes")
        .select("*")
        .eq("id", classeId!)
        .single();
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};

export const usePostListById = (id: number) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alertes")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error();
      }
      return data;
    },
  });
};

const useCreateTodoMutation = () => {
  const mutation = useMutation(async (todo) => {
    const { data, error } = await supabase.from("todos").insert([todo]);

    if (error) {
      throw error;
    }

    return data;
  }, {});

  return mutation;
};
/**const CreateTodoButton = () => {
  const mutation = useCreateTodoMutation();

  const handleCreateTodo = () => {
    const todo = {
      title: "New Todo",
      completed: false,
    };

    mutation.mutate(todo);
  };

  return (
    <button onClick={handleCreateTodo}>Create Todo</button>
  );
}; */
