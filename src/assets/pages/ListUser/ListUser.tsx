import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../api/fetchAPI";
import Button from "../../components/Button/Button"
import { useTheme } from "../../hooks/useTheme/useTheme";
import { deleteAPI } from "../../api/deleteAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useRef } from "react";

interface UserData{
  id: number,
  name: string,
  age: number,
}
  
function ListUser() {
  //imported dark state for theme setting
  const {dark} = useTheme();

  //to navigate to update page
  const navigate = useNavigate();

  //queryClient created to use it for CRUD ops
  const queryClient = useQueryClient();

  const pendingDeleteId = useRef<number | null>(null);

  //mutation for delete
  const mutation = useMutation({
    mutationFn: deleteAPI,
    onSuccess: () => {
      // Use the stored ID
      const id = pendingDeleteId.current;
      if (id !== null) {
        queryClient.setQueryData(['users'], (old: UserData[] | undefined) =>
          old?.filter(u => u.id !== id) || []
        );
      }
      pendingDeleteId.current = null; // Reset
    },
  });
   

  //handles delete button click
  const handleDelete = (userId: number) => {
    if (mutation.isPending) return;

    pendingDeleteId.current = userId; // ← Store ID
    mutation.mutate(userId);
  };

  //handles update button click
  const handleClick = (user : UserData) =>{
    navigate('/update', {state : user})
  }
  
  //loads data cards from DB
  const  {data, isPending ,isError} = useQuery({
    queryKey: ['users'],
    queryFn: fetchAPI,
  });

  return (
    <div className="w-full h-fit
    flex flex-wrap justify-center sm:justify-start items-start gap-4 pl-10 p-4">
      {isPending 
      ? <Loader loader_name="Loading"/>
      : (data ? data.map(
        (e:UserData) =>
          <div className="w-80 h-60
          flex flex-col justify-between items-start gap-2
          rounded-[5px]
          pl-4 py-5 mt-5"
          key={e.id}
          style={{
            background: dark 
            ? 'var(--color-card-dark)'
            : 'var(--color-card-light)',
            color: dark 
            ? 'var(--color-text-primary-dark)'
            : 'var(--color-text-primary-light)'
          }}>
              <div className="flex flex-col gap-4">
                <p className="text-2xl"><span className="font-bold ">Name:</span> {e.name} </p>
                <p className="text-2xl"><span className="font-bold">Age:</span> {e.age}</p>
              </div>

              <div className="w-full
              flex justify-start gap-2
              mt-2">
                  <Button 
                    button_name='Update' 
                    button_width="1/2" 
                    button_type="button" 
                    button_disabled= {false}
                    onClick={() => handleClick(e)}
                  />

                  <Button
                    button_name={mutation.isPending && pendingDeleteId.current === e.id ? 'Deleting...' : 'Delete'}
                    button_width="1/2"
                    button_type="button"
                    button_disabled={mutation.isPending && pendingDeleteId.current === e.id}
                    onClick={() => handleDelete(e.id)}
                  />
              </div>
          </div>
        )
        :<p>{isError}</p>)
      }
    </div>
  )
}

export default ListUser
