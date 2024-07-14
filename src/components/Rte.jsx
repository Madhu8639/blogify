import React, {useRef} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form' 
const Rte = ({name,control,label,labelclass,defaultValue="",className}) => {
  return (
    <div >
      {label && <label className=" sm:text-red-700 md:text-black font-[36px] text-[20px] flex mb-[10px] mx-2">{label} </label>}
      <Controller 
        name={name || "content"}
        control={control}
        render = {({field:{onChange}})=>(
          <Editor 
          apiKey='3r2mvun1qgdmjk98lssnl1uk3zh3xhkrny3wt1ud6qt04rbo'
        initialValue={defaultValue}
        init={
            {  
              initialValue:defaultValue,   
            height:500,
            menubar:true,
            plugins:[
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
                ],
            toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify| \
            bullist numlist outdent indent | removeformat | help',
            content_style:"body{font-family:Helvetica,Arial,sans-serif; font-size14px}"
            }}
        onEditorChange={onChange}
    />
        )}
      />
    </div>
    
  )
}

export default Rte