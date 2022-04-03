let isOk = true;
/* promise que espera un tiempo antes de realizar la tarea */
export default function customFetch(time, task){
    return new Promise((resolve, reject)=>{

        setTimeout(()=>{
            if (isOk){
                resolve(task)
            } else{
                 reject("Error");    
            }
        }, time)
    })
}


