import { supabase } from "@/supabase/initSupabase";
import { useQuery, useMutation } from "react-query";
export const usePostList = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("alertes").select("*");
      if (error) {
        throw new Error();
      }
      const alertList = data.filter((f) => f.target === null);
      return alertList;
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
