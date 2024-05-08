import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import prisma from '@/db/db'

async function getSalesData() {
  const salesData = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  })

  return {
    amount: (salesData._sum.pricePaidInCents || 0) / 100,
    numSales: salesData._count,
  }
}

export default async function AdminDashboard() {
  const salesData = await getSalesData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashBoardCard
        title="Sales"
        subtitle={salesData.numSales.toString() + ' orders'}
        body={salesData.amount.toString()}
      />
      {/* <DashBoardCard title="Sales" subtitle="Test" body="body" /> */}
      {/* <DashBoardCard title="Sales" subtitle="Test" body="body" /> */}
      {/* <DashBoardCard title="Sales" subtitle="Test" body="body" /> */}
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
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
