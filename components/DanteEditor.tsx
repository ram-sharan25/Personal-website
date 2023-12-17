import React, { useState } from 'react'

import Dante from 'dante3/package/esm'

interface Editor {
  placeHolder: string | undefined
  setContent: (val: Record<string, string>) => void
}

function Editor(props: Editor) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState(null)
  // console.log()
  return (
    <Dante
      readOnly={false}
      bodyPlaceholder={props?.placeHolder}
      onUpdate={(editor) => {
        props?.setContent(editor.getJSON())
      }}
      editorProps={{
        handleKeyDown(view, event) {
          if (event.key === 'Enter') {
            // console.log('YES!!')
            return false
          }
        },
        attributes: {
          class: 'prose prose-2xl pl-10   mx-auto focus:outline-none'
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
                const transaction = view.state.tr.insert(coordinates.pos, node)
                view.dispatch(transaction)
              }
            } else if (file.type.startsWith('video/')) {
              const node = schema.nodes.VideoRecorderBlock.create({
                url: _URL.createObjectURL(file)
              })
              const transaction = view.state.tr.insert(coordinates.pos, node)
              view.dispatch(transaction)
            } else if (file.type.startsWith('audio/')) {
              const node = schema.nodes.AudioRecorderBlock.create({
                url: _URL.createObjectURL(file)
              })
              const transaction = view.state.tr.insert(coordinates.pos, node)
              view.dispatch(transaction)
            } else {
              const node = schema.nodes.FileBlock.create({
                url: _URL.createObjectURL(file)
              })
              const transaction = view.state.tr.insert(coordinates.pos, node)
              view.dispatch(transaction)
            }
            return true
          }

          return false // not handled use default behaviour
        }
      }}
      content={null}
    />
  )
}

export default Editor
