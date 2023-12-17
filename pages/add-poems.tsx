import React, { useState } from 'react'

import Editor from '@/components/DanteEditor'

function AddPoems() {
  const [title, setTitle] = useState<Record<string, string>>(null)
  const [content, setContent] = useState<Record<string, string>>(null)
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-[#FFEED9] p-10'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col  w-full  rounded-sm     '>
          <div className=' bg-[#87C4FF]'>
            <Editor setContent={setTitle} placeHolder={'Title'} />
          </div>
          <hr className='my-2' />
          <div className=' bg-[#E0F4FF]  h-80'>
            <Editor setContent={setContent} placeHolder='Write Something' />
          </div>
        </div>
        <div className=' flex w-full justify-end'>
          <button
            onClick={() => {
              console.log({ title, content })
            }}
            className='p-2 bg-slate-400 mt-5'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddPoems
