import React from 'react'

import Dante from 'dante3/package/esm'

function AddPoems() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='w-11/12 h-80 pl-5   bg-red-100  '>
        <Dante
          bodyPlaceholder={'Title'}
          editorProps={{
            attributes: {
              class:
                'prose prose-sm sm:prose lg:prose-2xl xl:prose-3xl text-2xl mx-auto focus:outline-none'
            }
          }}
        />
        <Dante
          readOnly={false}
          editorProps={{
            handleKeyDown(view, event) {
              if (event.key === 'Enter') {
                console.log('YES!!')
                return false
              }
              console.log(view, event)
            },
            attributes: {
              class:
                'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
            },
            transformPastedText(text) {
              return text.toUpperCase()
            },
            handleDrop: function (view, event, slice, moved) {
              if (
                !moved &&
                event.dataTransfer &&
                event.dataTransfer.files &&
                event.dataTransfer.files[0]
              ) {
                const file = event.dataTransfer.files[0]
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const filesize = (file.size / 1024 / 1024).toFixed(4)

                const { schema } = view.state
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY
                })

                const _URL = window.URL || window.webkitURL

                if (file.type.startsWith('image/')) {
                  const image = new Image()
                  image.src = _URL.createObjectURL(file)
                  image.onload = function () {
                    const node = schema.nodes.ImageBlock.create({
                      src: image.src
                    })
                    const transaction = view.state.tr.insert(
                      coordinates.pos,
                      node
                    )
                    view.dispatch(transaction)
                  }
                } else if (file.type.startsWith('video/')) {
                  const node = schema.nodes.VideoRecorderBlock.create({
                    url: _URL.createObjectURL(file)
                  })
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node
                  )
                  view.dispatch(transaction)
                } else if (file.type.startsWith('audio/')) {
                  const node = schema.nodes.AudioRecorderBlock.create({
                    url: _URL.createObjectURL(file)
                  })
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node
                  )
                  view.dispatch(transaction)
                } else {
                  const node = schema.nodes.FileBlock.create({
                    url: _URL.createObjectURL(file)
                  })
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node
                  )
                  view.dispatch(transaction)
                }
                return true
              }

              return false // not handled use default behaviour
            }
          }}
          content={null}
        />
      </div>
    </div>
  )
}

export default AddPoems
