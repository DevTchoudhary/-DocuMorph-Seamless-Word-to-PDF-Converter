import React from 'react';

function Navbar() {
  return (
    <div className='w-full px-6 py-3 md:px-40 fixed shadow-lg h-16 bg-white'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl cursor-pointer font-bold'>
          Word
          <span className='text-3xl text-green-500'>To</span>PDF
        </h1>
        <h1 className='text-2xl cursor-pointer font-bold hover:scale-125 duration-300 hover:text-green-600'>
          Home
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
