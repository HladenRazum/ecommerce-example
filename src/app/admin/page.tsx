import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard title='Sales' subtitle='Test' body='body' />
      <DashBoardCard title='Sales' subtitle='Test' body='body' />
      <DashBoardCard title='Sales' subtitle='Test' body='body' />
      <DashBoardCard title='Sales' subtitle='Test' body='body' />
    </div>
  )
}

type DashboardCardProps = {
  title: string
  body: string
  subtitle: string
}

function DashBoardCard({ title, body, subtitle }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardDescription>{subtitle}</CardDescription>
      <CardContent>
        <p>{subtitle}</p>
      </CardContent>
    </Card>
  )
}
