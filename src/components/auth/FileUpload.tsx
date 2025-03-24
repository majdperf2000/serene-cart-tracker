
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Check, X } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
}

export const FileUpload = ({
  accept = ".jpg,.jpeg,.png,.pdf",
  maxSize = 5, // 5MB default
  multiple = false,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const selectedFiles = Array.from(e.target.files);
    validateAndSetFiles(selectedFiles);
  };

  const validateAndSetFiles = (selectedFiles: File[]) => {
    setError(null);
    
    const invalidFiles = selectedFiles.filter(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File ${file.name} exceeds the maximum size of ${maxSize}MB`);
        return true;
      }
      
      // Check file type (if accept is provided)
      if (accept) {
        const fileType = file.type;
        const acceptTypes = accept.split(',').map(type => 
          type.startsWith('.') 
            ? type.substring(1) 
            : type
        );
        
        if (!acceptTypes.some(type => 
          fileType.includes(type) || 
          file.name.endsWith(type)
        )) {
          setError(`File ${file.name} is not an accepted file type`);
          return true;
        }
      }
      
      return false;
    });
    
    if (invalidFiles.length === 0) {
      if (multiple) {
        setFiles(prev => [...prev, ...selectedFiles]);
      } else {
        setFiles(selectedFiles.slice(0, 1));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files?.length) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      validateAndSetFiles(droppedFiles);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-md p-4 transition-colors ${
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-1">Drag & drop files here</p>
          <p className="text-xs text-muted-foreground mb-3">
            or click to browse (max {maxSize}MB)
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            Select File{multiple ? 's' : ''}
          </Button>
          <input
            id="fileInput"
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      {error && (
        <div className="mt-2 text-destructive text-sm">
          {error}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Uploaded files:</p>
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-2 bg-accent/30 rounded-md"
            >
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm truncate max-w-[200px]">
                  {file.name}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
