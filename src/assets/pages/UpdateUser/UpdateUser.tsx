import { useForm } from 'react-hook-form'
import { useTheme } from '../../hooks/useTheme/useTheme';
import Button from '../../components/Button/Button';
import strChecker from '../../validators/strChecker';
import numChecker from '../../validators/numChecker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateAPI } from '../../api/updateAPI';

interface FormData{
  id: number,
  name:string;
  age:string;
}

const delay = (ms: number) => new Promise(resolve =>setTimeout(resolve, ms));

function UpdateUser() {

  const { state } = useLocation();
  const user = state as FormData;

  const {dark} = useTheme();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateAPI,
    
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['users']});
      navigate('/list');
    }
    });
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues:{
      id: user.id,
      name: user.name,
      age: String(user.age),
    }
  });

  const onSubmit = async(data: FormData) => {
  const numAge = Number(data.age);

    try{
      mutation.mutate({
        id: data.id,
        name: data.name,
        age: numAge,
      });
      await delay (1000);
    }
    catch(err){
      console.log(err);
      setError("root", {message: "Failed to register user"});
    }
  }

  return (
    <div className="w-full h-full
    relative
    flex justify-center items-start pt-10">
      <form className='w-[90%] h-fit md:w-120
      flex flex-col justify-center items-center gap-10
      p-5 pb-10 text-2xl rounded-[10px]'
      
      style={{
        background: dark 
        ? 'var(--color-card-dark)'
        : 'var(--color-card-light)',
        color: dark 
        ? 'var(--color-text-primary-dark)'
        : 'var(--color-text-primary-light)'
      }}
      
      onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold">Update Here</h1>
        <input type="hidden" {...register("id")} />
        <label className="w-[90%] flex flex-col">
            <input className="p-2 rounded-[5px] outline-0"
            placeholder="Enter Your Name"
            {...register("name",{
              required: "Name is required",
              validate: (v) => strChecker(v) || "Enter Alphabets Only",
            })}
            style={{
                background: dark 
                ? 'var(--color-input-dark)'
                : 'var(--color-input-light)',

                color: dark 
                ? 'var(--color-text-primary-dark)'
                : 'var(--color-text-primary-light)',

                '--placeholder-color': dark 
                ? 'var(--color-placeholder-dark)'
                : 'var(--color-placeholder-light)'
            }as React.CSSProperties}/>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </label>

        <label className="w-[90%] flex flex-col">
            <input className="p-2 rounded-[5px] outline-0"
            type="text"
            placeholder='Enter Your Age'
            {...register("age",{
              required: "Age is required",
              validate: (v) => numChecker(v) || "Enter numbers only",
            })}
            style={{
                background: dark 
                ? 'var(--color-input-dark)'
                : 'var(--color-input-light)',

                color: dark 
                ? 'var(--color-text-primary-dark)'
                : 'var(--color-text-primary-light)',

                '--placeholder-color': dark 
                ? 'var(--color-placeholder-dark)'
                : 'var(--color-placeholder-light)'
            }as React.CSSProperties}/>
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
        </label>
        {errors.root && <p className="text-red-400 text-sm border-2 p-2">{errors.root.message}</p>}
        <div className="mt-5">
            <Button 
              button_name={isSubmitting ? "Updating...":"Update"} 
              button_width="50" 
              button_type="submit"
              button_disabled={isSubmitting}
              onClick={()=>{}}
            />
        </div>
      </form>
      
    </div>
  )
}

export default UpdateUser
