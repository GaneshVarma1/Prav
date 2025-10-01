import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Upload, Trash2 } from 'lucide-react';
import { useRecordsStore } from '@/store/recordsStore';
import { RecordFormData } from '@/types';
import { toast } from 'sonner';

export default function EditRecord() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { records, updateRecord, loading } = useRecordsStore();
  
  const [formData, setFormData] = useState<RecordFormData>({
    name: '',
    description: '',
    status: 'active',
    metadata: {}
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const record = records.find(r => r.id === id);
      if (record) {
        setFormData({
          name: record.name,
          description: record.description || '',
          status: record.status,
          metadata: record.metadata || {}
        });
        setIsLoading(false);
      } else {
        // Record not found, redirect to data management
        toast.error('Record not found');
        navigate('/data');
      }
    }
  }, [id, records, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      await updateRecord(id, formData);
      toast.success('Record updated successfully');
      navigate('/data');
    } catch (error) {
      toast.error('Failed to update record');
      console.error('Error updating record:', error);
    }
  };

  const handleInputChange = (field: keyof RecordFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just store the file name in metadata
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type
        }
      }));
      toast.success(`File "${file.name}" selected`);
    }
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        fileName: undefined,
        fileSize: undefined,
        fileType: undefined
      }
    }));
    toast.success('File removed');
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/data')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data
          </Button>
        </div>
        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                  <div className="h-10 w-full bg-muted animate-pulse rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => navigate('/data')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Data
        </Button>
      </div>

      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Edit Record</h2>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Record Details</CardTitle>
            <CardDescription>
              Update the information below to modify the record
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter record name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter record description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={errors.description ? 'border-destructive' : ''}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* Status Field */}
              <div className="space-y-2">
                <Label htmlFor="status">Status *</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-destructive">{errors.status}</p>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="file">Attachment (Optional)</Label>
                <div className="space-y-2">
                  {formData.metadata?.fileName ? (
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{formData.metadata.fileName}</span>
                        {formData.metadata.fileSize && (
                          <span className="text-xs text-muted-foreground">
                            ({Math.round(formData.metadata.fileSize / 1024)} KB)
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : null}
                  <div className="flex items-center space-x-2">
                    <Input
                      id="file"
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('file')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {formData.metadata?.fileName ? 'Replace File' : 'Choose File'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Additional Metadata */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Optional)</Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="Enter tags separated by commas"
                  defaultValue={formData.metadata?.tags?.join(', ') || ''}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                    setFormData(prev => ({
                      ...prev,
                      metadata: {
                        ...prev.metadata,
                        tags
                      }
                    }));
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  Separate multiple tags with commas
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex items-center space-x-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Record
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/data')}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}