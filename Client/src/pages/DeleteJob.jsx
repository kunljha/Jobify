import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { redirect } from 'react-router';

export const action = async ( {params} ) => {
  try{
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success('Job deleted successfully')
  }
  catch(error){
    toast.error(error?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs')
}


// IMP here there is no need of this component

// const DeleteJob = () => {
//   return (
//     <h3>DeleteJob Page</h3>
//   )
// }

// export default DeleteJob
