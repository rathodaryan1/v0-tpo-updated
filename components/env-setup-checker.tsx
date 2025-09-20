"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'

export function EnvSetupChecker() {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkConfiguration()
  }, [])

  const checkConfiguration = async () => {
    try {
      // Try to create a Supabase client to test if env vars are set
      const { createClient } = await import('@/lib/supabase/client')
      createClient()
      setIsConfigured(true)
      setError(null)
    } catch (err) {
      setIsConfigured(false)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  if (isConfigured === null) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Checking Configuration...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Verifying your setup...</p>
        </CardContent>
      </Card>
    )
  }

  if (!isConfigured) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            Configuration Required
          </CardTitle>
          <CardDescription className="text-red-600">
            Supabase environment variables are not configured
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-red-700">
            <p className="font-medium">To fix this issue:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Create a <code className="bg-red-100 px-1 rounded">.env.local</code> file in your project root</li>
              <li>Add your Supabase credentials to the file</li>
              <li>Restart the development server</li>
            </ol>
          </div>
          
          <div className="bg-red-100 p-3 rounded-lg">
            <p className="text-sm font-medium text-red-800 mb-2">Required environment variables:</p>
            <div className="text-xs font-mono text-red-700 space-y-1">
              <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
              <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</div>
              <div>SUPABASE_SERVICE_ROLE_KEY=your_service_role_key</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open('https://supabase.com', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Create Supabase Project
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkConfiguration}
            >
              Check Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <CheckCircle className="h-5 w-5" />
          Configuration Complete
        </CardTitle>
        <CardDescription className="text-green-600">
          Supabase environment variables are properly configured
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-green-700">
          Your TPO Portal is ready to use! You can now register users and start using the system.
        </p>
      </CardContent>
    </Card>
  )
}
