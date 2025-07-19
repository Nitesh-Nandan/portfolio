import { useState } from 'react';
import { useAdminActions, usePersonalInfo } from '@/hooks/use-data-queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { PersonalInfo } from '@shared/schema';

export default function AdminPage() {
  const { data: personalInfo } = usePersonalInfo();
  const { loading, message, syncToDatabase, backupToJson, updatePersonalInfo, clearMessage } = useAdminActions();
  
  const [formData, setFormData] = useState<Partial<PersonalInfo>>({});
  const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);

  const handleUpdatePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(formData);
    setFormData({});
    setShowPersonalInfoForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Portfolio Admin</h1>
        <p className="text-muted-foreground mt-2">
          Manage your portfolio data and synchronization
        </p>
      </div>

      {message && (
        <Alert className="mb-6">
          <AlertDescription className="flex justify-between items-center">
            {message}
            <Button variant="ghost" size="sm" onClick={clearMessage}>
              ×
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Data Sync Section */}
        <Card>
          <CardHeader>
            <CardTitle>Data Synchronization</CardTitle>
            <CardDescription>
              Sync data between JSON files and database. JSON files are the primary source of truth.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={syncToDatabase} 
                disabled={loading}
                variant="default"
              >
                {loading ? 'Syncing...' : 'Sync JSON → Database'}
              </Button>
              <Button 
                onClick={backupToJson} 
                disabled={loading}
                variant="outline"
              >
                {loading ? 'Backing up...' : 'Backup Database → JSON'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              • <strong>Sync to Database:</strong> Uploads your local JSON files to the database
              <br />
              • <strong>Backup to JSON:</strong> Downloads database data to local JSON files
            </p>
          </CardContent>
        </Card>

        {/* Quick Personal Info Update */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Quick update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!showPersonalInfoForm ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Name:</strong> {personalInfo.firstName} {personalInfo.lastName}
                  </div>
                  <div>
                    <strong>Title:</strong> {personalInfo.title}
                  </div>
                  <div>
                    <strong>Email:</strong> {personalInfo.email}
                  </div>
                  <div>
                    <strong>Location:</strong> {personalInfo.location}
                  </div>
                </div>
                <Button onClick={() => setShowPersonalInfoForm(true)}>
                  Edit Personal Info
                </Button>
              </div>
            ) : (
              <form onSubmit={handleUpdatePersonalInfo} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName || personalInfo.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName || personalInfo.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title || personalInfo.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={formData.bio || personalInfo.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || personalInfo.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location || personalInfo.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowPersonalInfoForm(false);
                      setFormData({});
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* File Management Info */}
        <Card>
          <CardHeader>
            <CardTitle>File Management</CardTitle>
            <CardDescription>
              Information about managing your data files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Data Location:</strong> <code>server/data/</code>
              </p>
              <p>
                <strong>Available Files:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><code>personal-info.json</code> - Your personal information</li>
                <li><code>work-experience.json</code> - Work experience entries</li>
                <li><code>projects.json</code> - Project portfolio</li>
                <li><code>skills.json</code> - Technical skills</li>
                <li><code>books.json</code> - Reading list and completed books</li>
              </ul>
              <p className="text-muted-foreground">
                Edit these JSON files directly for bulk changes, then use "Sync to Database" to update.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 