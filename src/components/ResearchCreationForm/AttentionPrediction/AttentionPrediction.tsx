import { useResearchStore } from '../../../store/useResearchStore';
import FileUpload from '../../../core-ui/FileUpload';

export default function AttentionsPrediction({ title }: { title: string }) {
    const { uploadedFiles, addUploadedFiles, removeUploadedFile } = useResearchStore();

    return (
        <FileUpload
            title={title}
            accept={{
                'image/jpeg': ['.jpg', '.jpeg'],
                'image/png': ['.png'],
                'image/gif': ['.gif'],
                'video/mp4': ['.mp4'],
            }}
            maxSize={30 * 1024 * 1024} // 30 MB
            onUpload={addUploadedFiles}
            uploadedFiles={uploadedFiles}
            removeFile={(file) => removeUploadedFile(file.name)}
        />
    );
}
