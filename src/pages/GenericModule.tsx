import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

export function GenericModule({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates in your {title.toLowerCase()} module.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                No recent activity logged yet.
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  + Add New Entry
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  View Reports
                </button>
                <button className="w-full text-left px-4 py-2 text-sm font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  Module Settings
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
