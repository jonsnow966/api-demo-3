import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../api/fetchAPI";

import Button from "../../components/Button/Button"
import { useTheme } from "../../hooks/useTheme/useTheme";
import { deleteAPI } from "../../api/deleteAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

interface UserData{
  id: number,
  name: string,
  age: number,
}
  
function ListUser() {

  const {dark} = useTheme();

  const navigate = useNavigate()
;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAPI,

    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['users']})
    }
  })

  const handleClick = (user : UserData) =>{
    navigate('/update', {state : user})
  }

  const handleDelete = async(userId : number) =>{

    if(!userId) return;

    try{
      mutation.mutate(userId)
    }
    catch(err){
      console.log(err);
    }
  }
  
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
                    button_name='Delete' 
                    button_width="" 
                    button_type="button" 
                    button_disabled= {false}
                    onClick = {() => handleDelete(e.id)}
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
