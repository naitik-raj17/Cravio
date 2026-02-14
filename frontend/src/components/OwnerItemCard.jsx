import React from 'react'

function OwnerItemCard({ data }) {
  if (!data) return null
  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
      <div className='w-36 h-full flex-shrink-0 bg-gray-50'>
        <img src={data.image} alt={data.name || ''} className='w-full h-full object-cover'/>
      </div>

      <div className='flex flex-col justify-between p-3 flex-1'>
        <div>
          <h2 className='text-base font-semibold text-[#ff4d2d]'>{data.name}</h2>
          <p className='font-medium text-gray-700'>Category: {data.category}</p>
          <p className='font-medium text-gray-700'>Food Type: {data.foodType}</p>
        </div>
      </div>
    </div>
  )
}

export default OwnerItemCard
