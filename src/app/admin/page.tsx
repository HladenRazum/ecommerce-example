import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import prisma from '@/db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'

async function getSalesData() {
  const salesData = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  })

  await wait(5000)

  return {
    amount: (salesData._sum.pricePaidInCents || 0) / 100,
    numSales: salesData._count,
  }
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

async function getCustomersData() {
  const [usersCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ])

  return {
    usersCount,
    averageValuePerUser:
      usersCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / usersCount,
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({ where: { isAvailableForPurchase: true } }),
    prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ])

  return {
    activeCount,
    inactiveCount,
  }
}

export default async function AdminDashboard() {
  const salesData = await getSalesData()
  const customersData = await getCustomersData()
  const productData = await getProductData()

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashBoardCard
        title='Sales'
        subtitle={formatNumber(salesData.numSales) + ' Orders'}
        body={formatCurrency(salesData.amount)}
      />
      <DashBoardCard
        title='Customers'
        subtitle={
          formatCurrency(customersData.averageValuePerUser) + ' Average Value'
        }
        body={formatNumber(customersData.usersCount) + ' users'}
      />
      <DashBoardCard
        title='Active Products'
        subtitle={formatNumber(productData.inactiveCount) + ' Inactive'}
        body={formatNumber(productData.activeCount)}
      />
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
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  )
}
