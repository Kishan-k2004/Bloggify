import Color from '@tiptap/extension-color'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './Tiptap.css'
import React, { useEffect,useRef } from 'react'
import { useFormContext } from 'react-hook-form'

function TextEditor({name,Initialcontent}) {

  const { setValue } = useFormContext()
  const hasSetInitial = useRef(false);


  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Superscript,
      Subscript,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      })

    ],
    
    content:'',
    onUpdate({ editor }) {
      const planeText = editor.getText().replace(/\n/g,'').trim()

      if(planeText === ''){
        setValue(name,'')

      }else{
        setValue(name,editor.getHTML(),{ shouldValidate: true })

      }
    }
   
  })



  useEffect(() => {
    if (editor && Initialcontent && !hasSetInitial.current) {
      editor.commands.setContent(Initialcontent);
      hasSetInitial.current = true;
    }
  }, [editor, Initialcontent]);


  if(!editor) return null

  const btnClass = 'btn border-1 border-base-100 dark:border-white '
  return (
    <div className='flex flex-col w-full gap-10'>

      <div className='grid grid-cols-5 md:grid-cols-10 gap-2'>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btnClass} ${editor.isActive('bold') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className='fill-current w-5 h-5'
          viewBox="0 -960 960 960" 
          >
            <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btnClass} ${editor.isActive('italic') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960" 
          className='fill-current w-5 h-5'
          >
            <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${btnClass} ${editor.isActive('heading', { level: 1 }) ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960" 
          className='fill-current w-5 h-5'
          >
            <path d="M200-280v-400h80v160h160v-160h80v400h-80v-160H280v160h-80Zm480 0v-320h-80v-80h160v400h-80Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnClass} ${editor.isActive('heading', { level: 2 }) ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M120-280v-400h80v160h160v-160h80v400h-80v-160H200v160h-80Zm400 0v-160q0-33 23.5-56.5T600-520h160v-80H520v-80h240q33 0 56.5 23.5T840-600v80q0 33-23.5 56.5T760-440H600v80h240v80H520Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btnClass} ${editor.isActive('bulletList') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btnClass} ${editor.isActive('orderedList') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z"/>  
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={`${btnClass} bg-white dark:bg-base-100 text-black dark:text-white`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
           <path d="M160-440v-80h640v80H160Z"/>  
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={`${btnClass} ${editor.isActive('subscript') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M760-160v-80q0-17 11.5-28.5T800-280h80v-40H760v-40h120q17 0 28.5 11.5T920-320v40q0 17-11.5 28.5T880-240h-80v40h120v40H760Zm-525-80 185-291-172-269h106l124 200h4l123-200h107L539-531l186 291H618L482-457h-4L342-240H235Z"/>  
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          className={`${btnClass} ${editor.isActive('superscript') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M760-600v-80q0-17 11.5-28.5T800-720h80v-40H760v-40h120q17 0 28.5 11.5T920-760v40q0 17-11.5 28.5T880-680h-80v40h120v40H760ZM235-160l185-291-172-269h106l124 200h4l123-200h107L539-451l186 291H618L482-377h-4L342-160H235Z"/>  
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btnClass} ${editor.isActive('underline') ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M200-120v-80h560v80H200Zm280-160q-101 0-157-63t-56-167v-330h103v336q0 56 28 91t82 35q54 0 82-35t28-91v-336h103v330q0 104-56 167t-157 63Z"/> 
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${btnClass} ${editor.isActive({ textAlign: 'left' }) ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${btnClass} ${editor.isActive({ textAlign: 'center' }) ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${btnClass} ${editor.isActive({ textAlign: 'right' }) ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z"/>
          </svg>
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`${btnClass} ${editor.isActive({ textAlign: 'justify' }) ? 'bg-base-100 text-white dark:text-black dark:bg-white' : 'text-black dark:text-white dark:bg-base-100 bg-white'}`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"/>
          </svg>
        </button>

        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className={`${btnClass} bg-white dark:bg-base-100 p-1 `}
          title="Text Color"
        />

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className={`${btnClass} bg-white dark:bg-base-100 text-black dark:text-white`}
          type='button'
        >
          <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 -960 960 960"
          className='fill-current w-5 h-5'
          >
            <path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z"/>
          </svg>
        </button>

      </div>

      <div className="border-none flex justify-center mb-10">
        <EditorContent editor={editor} />
      </div>

    </div>
  )
}

export default TextEditor