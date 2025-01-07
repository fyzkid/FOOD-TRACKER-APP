import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='h-screen flex flex-col flex-1 items-center justify-center'>
      <p className='text-4xl font-medium'>Page 404 - Page does not exist!</p>
      <Link to='/' className='mt-4'>
        Go back home
      </Link>
    </div>
  );
};

export default Page404;
