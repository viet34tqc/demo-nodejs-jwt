import { forwardRef } from 'react'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Editor = (props: ReactQuillProps, ref: any) => {
  return <ReactQuill theme='snow' {...props} ref={ref} />
}

Editor.display = 'Editor'

export default forwardRef(Editor)
