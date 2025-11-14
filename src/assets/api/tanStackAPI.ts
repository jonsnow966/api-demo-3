import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = 'https://fake-data-server-2-production.up.railway.app/users'



//Register a user

export function CreateUser(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newUser) =>
            fetch(BASE, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(newUser),
            }).then(res => res.json()),
        
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        },
    })
}

//Update User Data

export function UpdateUser(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: {id:number}) =>
            fetch(`${BASE}/${user.id}`,{
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user.id),
            }).then(res => res.json()),

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({queryKey: ['users']});
            queryClient.invalidateQueries({queryKey: ['users', variables.id]})
        },
    })
}