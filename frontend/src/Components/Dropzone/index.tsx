import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface Props {
  onFileUpload: (file: File) => void;
}

const DropZone: React.FC<Props> = ({onFileUpload}) => {  
  
  const [selectedFileUrl, setSelectetFileUrl] = useState('');
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file)
    setSelectetFileUrl(fileUrl);
    onFileUpload(file);
    
  },[onFileUpload]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div {...getRootProps()} className='dropzone'>
      <input {...getInputProps()} accept='image/*'/>

          {
            selectedFileUrl? 
            (<img src={selectedFileUrl} alt='Point Thumbnail'/>) : 
            ( <p><FiUpload />Arraste ou selecione o arquivo de imagem aqui...</p>)
          }

        
    </div>    
  )
}
export default DropZone;